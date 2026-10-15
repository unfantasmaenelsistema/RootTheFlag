// Enlaces de los PDF que estaban rotos (404 o dominio caído) y se han corregido el 15/10/2026.
// 'visible': el texto impreso en el PDF muestra la URL antigua; el enlace ya apunta a la nueva.
const ERRATA = [
 {
  "g": "cr",
  "p": 42,
  "label": "Py-enigma",
  "old": "https://github.com/ianix/py-enigma",
  "new": "https://pypi.org/project/py-enigma/",
  "visible": false,
  "why": {
   "es": "404",
   "en": "404"
  }
 },
 {
  "g": "cr",
  "p": 60,
  "label": "Brainfuck Visualizer",
  "old": "https://fatiherikli.github.io/brainfuck-visualizer/",
  "new": "https://copy.sh/brainfuck/",
  "visible": true,
  "why": {
   "es": "404",
   "en": "404"
  }
 },
 {
  "g": "cr",
  "p": 66,
  "label": "Whitespace online (vii5ard)",
  "old": "https://vii5ard.github.io/whitespace-online/",
  "new": "https://naokikp.github.io/wsi/whitespace.html",
  "visible": false,
  "why": {
   "es": "404",
   "en": "404"
  }
 },
 {
  "g": "cr",
  "p": 66,
  "label": "Whitespace (copy.sh)",
  "old": "https://copy.sh/whitespace/",
  "new": "https://esolangs.org/wiki/Whitespace",
  "visible": true,
  "why": {
   "es": "404",
   "en": "404"
  }
 },
 {
  "g": "cr",
  "p": 75,
  "label": "Forensic Toolkit (FTK)",
  "old": "https://www.exterro.com/forensic-toolkit",
  "new": "https://www.exterro.com/digital-forensics-software/ftk-forensic-toolkit",
  "visible": false,
  "why": {
   "es": "404",
   "en": "404"
  }
 },
 {
  "g": "cr",
  "p": 76,
  "label": "Veles",
  "old": "https://codisec.com/veles/",
  "new": "https://github.com/codilime/veles",
  "visible": false,
  "why": {
   "es": "dominio caído",
   "en": "dead domain"
  }
 },
 {
  "g": "cr",
  "p": 77,
  "label": "Online Disassembler",
  "old": "https://onlinedisassembler.com/static/home/index.html",
  "new": "https://defuse.ca/online-x86-assembler.htm",
  "visible": false,
  "why": {
   "es": "servicio caído (502)",
   "en": "service down (502)"
  }
 },
 {
  "g": "cr",
  "p": 78,
  "label": "Detector de tonos DTMF (dialabc)",
  "old": "http://dialabc.com/sound/detect/index.html",
  "new": "https://github.com/EliasOenal/multimon-ng",
  "visible": false,
  "why": {
   "es": "dominio caído",
   "en": "dead domain"
  }
 },
 {
  "g": "cr",
  "p": 79,
  "label": "ImageMagick",
  "old": "http://www.imagemagick.org/script/index.php",
  "new": "https://imagemagick.org/",
  "visible": false,
  "why": {
   "es": "404",
   "en": "404"
  }
 },
 {
  "g": "cr",
  "p": 80,
  "label": "Stegsolve",
  "old": "https://github.com/zardus/ctf-tools/tree/master/stegsolve",
  "new": "https://github.com/Giotino/stegsolve",
  "visible": false,
  "why": {
   "es": "404",
   "en": "404"
  }
 },
 {
  "g": "cr",
  "p": 80,
  "label": "Hookbin",
  "old": "https://hookbin.com/",
  "new": "https://webhook.site/",
  "visible": false,
  "why": {
   "es": "servicio cerrado",
   "en": "service shut down"
  }
 },
 {
  "g": "cr",
  "p": 80,
  "label": "OWASP ZAP",
  "old": "https://owasp.org/www-project-zap/",
  "new": "https://www.zaproxy.org/",
  "visible": false,
  "why": {
   "es": "404",
   "en": "404"
  }
 },
 {
  "g": "cr",
  "p": 81,
  "label": "BinaryEdge",
  "old": "https://www.binaryedge.io/",
  "new": "https://www.shodan.io/",
  "visible": false,
  "why": {
   "es": "servicio cerrado",
   "en": "service shut down"
  }
 },
 {
  "g": "cr",
  "p": 82,
  "label": "hashID",
  "old": "https://github.com/blackploit/hashid",
  "new": "https://github.com/psypanda/hashID",
  "visible": false,
  "why": {
   "es": "404 (repo borrado)",
   "en": "404 (repo deleted)"
  }
 },
 {
  "g": "cr",
  "p": 82,
  "label": "HashPump",
  "old": "https://github.com/bwall/HashPump",
  "new": "https://github.com/stephenbradshaw/hlextend",
  "visible": false,
  "why": {
   "es": "404 (repo borrado)",
   "en": "404 (repo deleted)"
  }
 },
 {
  "g": "sy",
  "p": 32,
  "label": "dCode Dingbats",
  "old": "https://www.dcode.fr/dingbats-characters",
  "new": "https://www.dcode.fr/symbols-ciphers",
  "visible": false,
  "why": {
   "es": "404",
   "en": "404"
  }
 },
 {
  "g": "sy",
  "p": 35,
  "label": "dCode Ogham",
  "old": "https://www.dcode.fr/ogham-writing",
  "new": "https://www.dcode.fr/ogham-alphabet",
  "visible": false,
  "why": {
   "es": "404",
   "en": "404"
  }
 },
 {
  "g": "sy",
  "p": 41,
  "label": "dCode Nautical Flags",
  "old": "https://www.dcode.fr/maritime-signal-flags",
  "new": "https://www.dcode.fr/maritime-signals-code",
  "visible": false,
  "why": {
   "es": "404",
   "en": "404"
  }
 },
 {
  "g": "sy",
  "p": 41,
  "label": "MaritimeSignalFlags.com",
  "old": "https://www.maritimesignalsflags.com/",
  "new": "https://www.dcode.fr/maritime-signals-code",
  "visible": false,
  "why": {
   "es": "dominio caído",
   "en": "dead domain"
  }
 },
 {
  "g": "sy",
  "p": 42,
  "label": "dCode Maritime Signal Flags",
  "old": "https://www.dcode.fr/maritime-signal-flags",
  "new": "https://www.dcode.fr/maritime-signals-code",
  "visible": false,
  "why": {
   "es": "404",
   "en": "404"
  }
 },
 {
  "g": "sy",
  "p": 63,
  "label": "dCode Fantasy Ciphers",
  "old": "https://www.dcode.fr/fantasy-alphabets",
  "new": "https://www.dcode.fr/symbols-ciphers",
  "visible": false,
  "why": {
   "es": "404",
   "en": "404"
  }
 },
 {
  "g": "sy",
  "p": 66,
  "label": "minecraftenchantingtable.com",
  "old": "https://www.minecraftenchantingtable.com/",
  "new": "https://www.dcode.fr/standard-galactic-alphabet",
  "visible": true,
  "why": {
   "es": "dominio caído",
   "en": "dead domain"
  }
 },
 {
  "g": "sy",
  "p": 67,
  "label": "SGA Translator",
  "old": "https://www.minecraftenchantingtable.com/",
  "new": "https://www.dcode.fr/standard-galactic-alphabet",
  "visible": false,
  "why": {
   "es": "dominio caído",
   "en": "dead domain"
  }
 },
 {
  "g": "sy",
  "p": 67,
  "label": "dCode Alien Alphabet Tools",
  "old": "https://www.dcode.fr/fantasy-alphabets",
  "new": "https://www.dcode.fr/standard-galactic-alphabet",
  "visible": false,
  "why": {
   "es": "404",
   "en": "404"
  }
 },
 {
  "g": "sy",
  "p": 76,
  "label": "Hexahue (dCode)",
  "old": "https://www.dcode.fr/fantasy-alphabets",
  "new": "https://www.dcode.fr/symbols-ciphers",
  "visible": false,
  "why": {
   "es": "404",
   "en": "404"
  }
 }
];
