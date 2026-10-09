//! The JSON image of the `file` tier's state (`§7.2` `M-12`, `DD-2`): a compact encoder and a matching
//! decoder, with no dependency (the crate builds and tests offline).
//!
//! Only `§1.4`'s admitted classes are ever encoded — a `file`-tier state is built from admitted values
//! only — and the decoder is the exact inverse of the encoder.

use crate::value::StoreValue;
use std::collections::BTreeMap;

/// Encodes an admitted value as compact JSON (objects in sorted key order, so the bytes are deterministic).
pub(crate) fn encode(value: &StoreValue) -> String {
    let mut out = String::new();
    write_value(value, &mut out);
    out
}

fn write_value(value: &StoreValue, out: &mut String) {
    match value {
        StoreValue::Str(s) => write_string(s, out),
        StoreValue::Bool(b) => out.push_str(if *b { "true" } else { "false" }),
        StoreValue::Num(n) => write_number(*n, out),
        StoreValue::Object(members) => {
            out.push('{');
            let mut first = true;
            for (k, v) in members {
                if !first {
                    out.push(',');
                }
                first = false;
                write_string(k, out);
                out.push(':');
                write_value(v, out);
            }
            out.push('}');
        }
        StoreValue::Array(items) => {
            out.push('[');
            let mut first = true;
            for v in items {
                if !first {
                    out.push(',');
                }
                first = false;
                write_value(v, out);
            }
            out.push(']');
        }
        // An outside class is never stored; `null` is its JSON image.
        _ => out.push_str("null"),
    }
}

fn write_number(n: f64, out: &mut String) {
    if n.is_finite() && n.fract() == 0.0 && n.abs() < 1.0e15 {
        out.push_str(&format!("{}", n as i64));
    } else {
        out.push_str(&format!("{n}"));
    }
}

fn write_string(s: &str, out: &mut String) {
    out.push('"');
    for c in s.chars() {
        match c {
            '"' => out.push_str("\\\""),
            '\\' => out.push_str("\\\\"),
            '\n' => out.push_str("\\n"),
            '\r' => out.push_str("\\r"),
            '\t' => out.push_str("\\t"),
            c if (c as u32) < 0x20 => out.push_str(&format!("\\u{:04x}", c as u32)),
            c => out.push(c),
        }
    }
    out.push('"');
}

/// Decodes the JSON this module encoded. Any malformed input is an error: the caller boots an empty store
/// from a file it cannot read (`§7.2` item 6 loads `cfg.filePath` *if the file exists*).
pub(crate) fn decode(text: &str) -> Result<StoreValue, ()> {
    let bytes: Vec<char> = text.chars().collect();
    let mut pos = 0usize;
    let value = parse_value(&bytes, &mut pos)?;
    skip_ws(&bytes, &mut pos);
    if pos != bytes.len() {
        return Err(());
    }
    Ok(value)
}

fn skip_ws(b: &[char], pos: &mut usize) {
    while *pos < b.len() && b[*pos].is_whitespace() {
        *pos += 1;
    }
}

fn parse_value(b: &[char], pos: &mut usize) -> Result<StoreValue, ()> {
    skip_ws(b, pos);
    match b.get(*pos) {
        Some('{') => parse_object(b, pos),
        Some('[') => parse_array(b, pos),
        Some('"') => Ok(StoreValue::Str(parse_string(b, pos)?)),
        Some('t') => expect(b, pos, "true").map(|_| StoreValue::Bool(true)),
        Some('f') => expect(b, pos, "false").map(|_| StoreValue::Bool(false)),
        Some('n') => expect(b, pos, "null").map(|_| StoreValue::Null),
        Some(_) => parse_number(b, pos),
        None => Err(()),
    }
}

fn expect(b: &[char], pos: &mut usize, word: &str) -> Result<(), ()> {
    for c in word.chars() {
        if b.get(*pos) != Some(&c) {
            return Err(());
        }
        *pos += 1;
    }
    Ok(())
}

fn parse_object(b: &[char], pos: &mut usize) -> Result<StoreValue, ()> {
    *pos += 1; // '{'
    let mut members = BTreeMap::new();
    skip_ws(b, pos);
    if b.get(*pos) == Some(&'}') {
        *pos += 1;
        return Ok(StoreValue::Object(members));
    }
    loop {
        skip_ws(b, pos);
        let key = parse_string(b, pos)?;
        skip_ws(b, pos);
        if b.get(*pos) != Some(&':') {
            return Err(());
        }
        *pos += 1;
        let value = parse_value(b, pos)?;
        members.insert(key, value);
        skip_ws(b, pos);
        match b.get(*pos) {
            Some(',') => *pos += 1,
            Some('}') => {
                *pos += 1;
                return Ok(StoreValue::Object(members));
            }
            _ => return Err(()),
        }
    }
}

fn parse_array(b: &[char], pos: &mut usize) -> Result<StoreValue, ()> {
    *pos += 1; // '['
    let mut items = Vec::new();
    skip_ws(b, pos);
    if b.get(*pos) == Some(&']') {
        *pos += 1;
        return Ok(StoreValue::Array(items));
    }
    loop {
        items.push(parse_value(b, pos)?);
        skip_ws(b, pos);
        match b.get(*pos) {
            Some(',') => *pos += 1,
            Some(']') => {
                *pos += 1;
                return Ok(StoreValue::Array(items));
            }
            _ => return Err(()),
        }
    }
}

fn parse_string(b: &[char], pos: &mut usize) -> Result<String, ()> {
    if b.get(*pos) != Some(&'"') {
        return Err(());
    }
    *pos += 1;
    let mut out = String::new();
    loop {
        match b.get(*pos) {
            None => return Err(()),
            Some('"') => {
                *pos += 1;
                return Ok(out);
            }
            Some('\\') => {
                *pos += 1;
                match b.get(*pos) {
                    Some('"') => out.push('"'),
                    Some('\\') => out.push('\\'),
                    Some('/') => out.push('/'),
                    Some('n') => out.push('\n'),
                    Some('r') => out.push('\r'),
                    Some('t') => out.push('\t'),
                    Some('b') => out.push('\u{8}'),
                    Some('f') => out.push('\u{c}'),
                    Some('u') => {
                        let mut code = 0u32;
                        for _ in 0..4 {
                            *pos += 1;
                            let digit = b.get(*pos).and_then(|c| c.to_digit(16)).ok_or(())?;
                            code = code * 16 + digit;
                        }
                        out.push(char::from_u32(code).ok_or(())?);
                    }
                    _ => return Err(()),
                }
                *pos += 1;
            }
            Some(c) => {
                out.push(*c);
                *pos += 1;
            }
        }
    }
}

fn parse_number(b: &[char], pos: &mut usize) -> Result<StoreValue, ()> {
    let start = *pos;
    if b.get(*pos) == Some(&'-') {
        *pos += 1;
    }
    while matches!(b.get(*pos), Some(c) if c.is_ascii_digit() || *c == '.' || *c == 'e' || *c == 'E' || *c == '+' || *c == '-')
    {
        *pos += 1;
    }
    let text: String = b[start..*pos].iter().collect();
    text.parse::<f64>().map(StoreValue::Num).map_err(|_| ())
}
