# RootTheFlag

**Chuletas y herramientas para retos CTF** de [Un Fantasma en el Sistema](https://www.unfantasmaenelsistema.com).

▶ **Abrir:** https://unfantasmaenelsistema.github.io/RootTheFlag/

## Guías (PDF, en español)

| Guía | Páginas | Qué cubre |
|---|---|---|
| [Criptografía en retos CTF](pdf/criptografia.pdf) | 82 | Base64/32/85, ROT, César, Vigenère, sustitución, transposición, Morse, XOR, afín, Enigma, Atbash, Polibio, Rail Fence, lenguajes esotéricos (Brainfuck, JSFuck, Malbolge, Whitespace…), ataques a RSA y un directorio de herramientas por categoría |
| [Esteganografía en retos CTF](pdf/esteganografia.pdf) | 63 | EXIF, LSB, DCT/JPEG, canales y paleta, QR, audio (LSB, espectrograma, fase, DTMF), vídeo, texto y Unicode oculto, binarios, ZIP/RAR y PDF |
| [Symbol Ciphers en retos CTF](pdf/symbol-ciphers.pdf) | 92 | Pigpen, Zodiac, Wingdings, emojis, dingbats, Ogham, banderas náuticas, semáforo, Dancing Men, Gravity Falls, SGA (Minecraft), Hexahue, Unown, Futurama, Hylian… |

## La web

- **Buscador de temas:** encuentra un cifrado o una técnica en las tres guías y abre el PDF directamente en su página (`#page=N`).
- **Caja de herramientas:** 19 decodificadores en el navegador (Base64/32, hex, binario, ROT13, ROT47, César con las 25 rotaciones, Atbash, Vigenère, XOR de un byte por fuerza bruta, Morse, Rail Fence, A1Z26, URL, invertir), con detección automática del formato y un enlace a la página de la guía que explica cada técnica. Nada sale de tu equipo.
- **Enlaces revisados:** los PDF tenían 25 enlaces rotos (404 o servicios cerrados). Se han corregido dentro de los propios PDF; la web lista cada cambio.
- Español e inglés y tema claro/oscuro (se recuerdan entre visitas).

## Estructura

```
index.html        página
css/style.css     estilos
js/i18n.js        textos ES/EN
js/topics.js      guías y temas (página real de cada tema)
js/tools.js       decodificadores (funciones puras, sin dependencias)
js/errata.js      enlaces corregidos en los PDF
js/app.js         interfaz
pdf/              guías
img/              portadas
```

Para probar en local: `python -m http.server` y abrir `http://localhost:8000`.

## English

**RootTheFlag** gathers three Spanish-language CTF cheat sheets (cryptography, steganography, symbol ciphers) with a topic search that opens each PDF on the right page, and a 19-operation in-browser decoding toolbox (Base64/32, hex, binary, ROT13/47, Caesar, Atbash, Vigenère, single-byte XOR brute force, Morse, Rail Fence…). Bilingual UI (ES/EN), light/dark themes.

## Licencia / License

El código de la web tiene licencia [MIT](LICENSE). Las guías en PDF son obra de Un Fantasma en el Sistema.
