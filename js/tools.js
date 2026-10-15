// Caja de herramientas: decodificadores clásicos de CTF, sin dependencias.
// Funciones puras (texto → texto) para poder probarlas fuera del navegador.
(function (global) {
  const enc = new TextEncoder();
  const decUtf8 = (bytes) => {
    try { return new TextDecoder('utf-8', { fatal: true }).decode(bytes); }
    catch (e) { return String.fromCharCode(...bytes); }
  };
  const bytesToHex = (b) => [...b].map(x => x.toString(16).padStart(2, '0')).join('');

  function b64decode(s) {
    let t = s.replace(/\s+/g, '').replace(/-/g, '+').replace(/_/g, '/');
    while (t.length % 4) t += '=';
    const bin = atob(t);
    return decUtf8(Uint8Array.from(bin, c => c.charCodeAt(0)));
  }
  function b64encode(s) {
    let bin = '';
    enc.encode(s).forEach(b => { bin += String.fromCharCode(b); });
    return btoa(bin);
  }

  const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  function b32decode(s) {
    const t = s.toUpperCase().replace(/[\s=]+/g, '');
    let bits = 0, val = 0; const out = [];
    for (const c of t) {
      const i = B32.indexOf(c);
      if (i < 0) throw new Error('char');
      val = (val << 5) | i; bits += 5;
      if (bits >= 8) { out.push((val >>> (bits - 8)) & 255); bits -= 8; }
    }
    return decUtf8(Uint8Array.from(out));
  }

  function hexdecode(s) {
    const t = s.replace(/0x/gi, '').replace(/[\s:,\\x-]+/g, '');
    if (!/^[0-9a-f]*$/i.test(t) || t.length % 2) throw new Error('hex');
    return decUtf8(Uint8Array.from(t.match(/../g) || [], h => parseInt(h, 16)));
  }
  const hexencode = (s) => bytesToHex(enc.encode(s));

  function bindecode(s) {
    const t = s.replace(/[^01]/g, '');
    if (!t || t.length % 8) throw new Error('bin');
    return decUtf8(Uint8Array.from(t.match(/.{8}/g), b => parseInt(b, 2)));
  }

  const shift = (s, n) => s.replace(/[a-z]/gi, c => {
    const base = c <= 'Z' ? 65 : 97;
    return String.fromCharCode((c.charCodeAt(0) - base + n + 26 * 10) % 26 + base);
  });
  const rot13 = (s) => shift(s, 13);
  const rot47 = (s) => s.replace(/[!-~]/g, c => String.fromCharCode(33 + (c.charCodeAt(0) - 33 + 47) % 94));
  const caesarAll = (s) => Array.from({ length: 25 }, (_, i) => `ROT-${String(i + 1).padStart(2, ' ')}: ${shift(s, i + 1)}`).join('\n');
  const atbash = (s) => s.replace(/[a-z]/gi, c => {
    const base = c <= 'Z' ? 65 : 97;
    return String.fromCharCode(25 - (c.charCodeAt(0) - base) + base);
  });

  function vigenere(s, key, decrypt) {
    const k = (key || '').toUpperCase().replace(/[^A-Z]/g, '');
    if (!k) throw new Error('key');
    let j = 0;
    return s.replace(/[a-z]/gi, c => {
      const n = k.charCodeAt(j++ % k.length) - 65;
      return shift(c, decrypt ? -n : n);
    });
  }

  // XOR de un solo byte: prueba las 256 claves y ordena por "pinta de texto".
  function xorBrute(s) {
    const t = s.replace(/0x/gi, '').replace(/[\s:,\\x-]+/g, '');
    let data;
    if (/^[0-9a-f]+$/i.test(t) && t.length % 2 === 0) data = Uint8Array.from(t.match(/../g), h => parseInt(h, 16));
    else data = enc.encode(s);
    // Frecuencia aproximada de letras (inglés/español) + bonus por formato de bandera.
    const FREQ = 'etaoinsrhldcumfpgwybvkxjqz';
    const score = (b) => {
      let sc = 0;
      for (const x of b) {
        if (x === 32) sc += 3;
        else if (x >= 97 && x <= 122) sc += 1 + (26 - FREQ.indexOf(String.fromCharCode(x))) / 13;
        else if (x >= 65 && x <= 90) sc += 1;
        else if (x >= 48 && x <= 57) sc += 1;
        else if (x >= 33 && x <= 126) sc += 0.5;
        else if (x === 10 || x === 13) sc += 0;
        else sc -= 6;
      }
      sc /= b.length;
      const txt = String.fromCharCode(...b);
      if (/(flag|ctf|htb|thm|picoctf|ghost)\{/i.test(txt)) sc += 5;
      else if (/^[a-z0-9_]{2,}\{[^{}]*\}$/.test(txt)) sc += 1;
      return sc;
    };
    const res = [];
    for (let k = 0; k < 256; k++) {
      const b = data.map(x => x ^ k);
      res.push({ k, sc: score(b), txt: String.fromCharCode(...b) });
    }
    res.sort((a, b) => b.sc - a.sc);
    return res.slice(0, 8).map(r => `key 0x${r.k.toString(16).padStart(2, '0')} (${r.k}): ${r.txt.replace(/[^\x20-\x7e]/g, '·')}`).join('\n');
  }

  const MORSE = {
    A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....', I: '..', J: '.---',
    K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.', S: '...', T: '-',
    U: '..-', V: '...-', W: '.--', X: '-..-', Y: '-.--', Z: '--..',
    0: '-----', 1: '.----', 2: '..---', 3: '...--', 4: '....-', 5: '.....', 6: '-....', 7: '--...', 8: '---..', 9: '----.',
    '.': '.-.-.-', ',': '--..--', '?': '..--..', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
    '&': '.-...', ':': '---...', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.', '@': '.--.-.', '{': '-.--.', '}': '-.--.-'
  };
  const MORSE_REV = Object.fromEntries(Object.entries(MORSE).filter(([k]) => k !== '{' && k !== '}').map(([k, v]) => [v, k]));
  function morseDecode(s) {
    const t = s.replace(/[•·]/g, '.').replace(/[—–_]/g, '-');
    return t.trim().split(/\s*(?:\/|\|| {3,}|\n)\s*/).map(w =>
      w.split(/\s+/).filter(Boolean).map(c => MORSE_REV[c] || '?').join('')).join(' ');
  }
  const morseEncode = (s) => s.toUpperCase().split(/\s+/).map(w => [...w].map(c => MORSE[c] || '?').join(' ')).join(' / ');

  function railDecode(s, rails) {
    const n = s.length, pattern = [];
    let r = 0, dir = 1;
    for (let i = 0; i < n; i++) { pattern.push(r); if (rails > 1) { if (r === 0) dir = 1; else if (r === rails - 1) dir = -1; r += dir; } }
    const counts = Array(rails).fill(0); pattern.forEach(x => counts[x]++);
    const rows = []; let pos = 0;
    for (let k = 0; k < rails; k++) { rows.push(s.slice(pos, pos + counts[k]).split('')); pos += counts[k]; }
    return pattern.map(x => rows[x].shift()).join('');
  }
  const railAll = (s) => Array.from({ length: Math.min(9, Math.max(1, s.length - 1)) }, (_, i) => `${i + 2} raíles: ${railDecode(s, i + 2)}`).join('\n');

  const a1z26 = (s) => s.split(/[^0-9]+/).filter(Boolean).map(n => {
    const v = parseInt(n, 10); return v >= 1 && v <= 26 ? String.fromCharCode(64 + v) : '?';
  }).join('');
  const urlDecode = (s) => decodeURIComponent(s.replace(/\+/g, ' '));
  const reverse = (s) => [...s].reverse().join('');

  // Sugerencias automáticas: qué codificación "parece" la entrada.
  function detect(s) {
    const t = s.trim(); const out = [];
    if (!t) return out;
    if (/^[01\s]+$/.test(t) && t.replace(/\s/g, '').length % 8 === 0) out.push('bin');
    if (/^(0x)?[0-9a-f\s:]+$/i.test(t) && t.replace(/0x|[\s:]/gi, '').length % 2 === 0 && /[0-9]/.test(t)) out.push('hex');
    if (/^[.\-\s/|•·—_]+$/.test(t) && /[.\-•·]/.test(t)) out.push('morse-d');
    if (/^[A-Z2-7=\s]+$/.test(t) && t.replace(/\s/g, '').length % 8 === 0 && !/^[01\s]+$/.test(t)) out.push('b32');
    if (/^[A-Za-z0-9+/_-]+={0,2}$/.test(t.replace(/\s/g, '')) && t.replace(/\s/g, '').length % 4 === 0 && t.length >= 8) out.push('b64d');
    if (/^\d{1,2}([\s,.-]+\d{1,2})+$/.test(t)) out.push('a1z26');
    if (/%[0-9a-f]{2}/i.test(t)) out.push('url');
    if (/^[A-Za-z\s{}_.,!?']+$/.test(t)) out.push('caesar', 'atbash');
    return out;
  }

  global.CTFTools = {
    b64decode, b64encode, b32decode, hexdecode, hexencode, bindecode, rot13, rot47, caesarAll, atbash,
    vigenere, xorBrute, morseDecode, morseEncode, railDecode, railAll, a1z26, urlDecode, reverse, detect
  };
})(typeof window !== 'undefined' ? window : globalThis);
