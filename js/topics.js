// Guías y temas principales. "p" es la página real del PDF (coincide con el índice impreso).
// "k" son palabras clave extra para el buscador (sinónimos, nombres en inglés).
const GUIDES = [
  {
    id: 'cr', file: 'pdf/criptografia.pdf', cover: 'img/criptografia.jpg', pages: 82, color: '#00d4ff',
    title: { es: 'Criptografía en retos CTF', en: 'Cryptography in CTF challenges' },
    desc: {
      es: 'Codificaciones, cifrados clásicos, XOR, Enigma, lenguajes esotéricos y ataques a RSA, con ejemplos y scripts en Python. Cierra con un directorio de herramientas por categoría.',
      en: 'Encodings, classic ciphers, XOR, Enigma, esoteric languages and RSA attacks, with examples and Python scripts. Ends with a tool directory by category.'
    },
    topics: [
      ['Base64, Base32 y Base85', 10, 'base encoding ascii85'], ['ROT13, ROT-n y ROT47', 14, 'rot rotation'],
      ['Vigenère', 18, 'vigenere polialfabetico'], ['Cifrado por sustitución', 21, 'substitution frecuencias frequency quipqiup'],
      ['Transposición columnar', 24, 'transposition columnar'], ['Morse y Tap Code', 28, 'morse tap golpes'],
      ['Codificación ADN', 32, 'dna biological'], ['XOR', 35, 'xor'], ['Cifrado afín', 38, 'affine'],
      ['Enigma', 41, 'enigma maquina'], ['César', 44, 'caesar cesar'], ['Atbash', 47, 'atbash'],
      ['Keyboard Shift', 50, 'teclado keyboard qwerty'], ['Cuadrado de Polibio', 53, 'polybius polibio'],
      ['Rail Fence', 56, 'rail fence zigzag'], ['Brainfuck', 59, 'esoteric esoterico'], ['JSFuck', 61, 'javascript esoteric'],
      ['Malbolge', 63, 'esoteric'], ['Whitespace', 65, 'espacios esoteric'], ['PikaLang', 67, 'pokemon esoteric'],
      ['Ataques a RSA (raíz cúbica, Wiener, módulo común, CRT)', 69, 'rsa wiener cube root crt common modulus twin prime'],
      ['Herramientas: exploiting y forense', 74, 'tools pwn forensics'], ['Herramientas: misc y reversing', 76, 'tools reversing'],
      ['Herramientas: esteganografía y web', 78, 'tools stego web'], ['Herramientas: OSINT y escalada', 81, 'tools osint privesc'],
      ['Herramientas: cracking de hashes y red', 82, 'tools hash cracking hashcat john network']
    ]
  },
  {
    id: 'st', file: 'pdf/esteganografia.pdf', cover: 'img/esteganografia.jpg', pages: 63, color: '#39ff14',
    title: { es: 'Esteganografía en retos CTF', en: 'Steganography in CTF challenges' },
    desc: {
      es: 'Información oculta en imágenes, audio, vídeo, texto, binarios, ZIP y PDF: LSB, DCT, espectrogramas, DTMF y metadatos, con las herramientas para sacarla.',
      en: 'Data hidden in images, audio, video, text, binaries, ZIP and PDF: LSB, DCT, spectrograms, DTMF and metadata, plus the tools to extract it.'
    },
    topics: [
      ['Introducción a la esteganografía en CTF', 7, 'intro'], ['Metadatos EXIF', 11, 'exif exiftool metadata'],
      ['Dominio espacial (LSB)', 14, 'lsb spatial zsteg stegsolve'], ['Dominio de la frecuencia (DCT/JPEG)', 17, 'dct jpeg steghide outguess'],
      ['Canales RGBA, paleta y estructura del archivo', 20, 'rgba palette png chunks'], ['Acrósticos visuales', 23, 'acrostic'],
      ['Códigos QR', 26, 'qr'], ['LSB en audio', 29, 'audio wav lsb'], ['Espectrograma', 32, 'spectrogram audio'],
      ['Fase de audio', 35, 'phase audio'], ['Vídeo', 38, 'video frames ffmpeg'],
      ['Texto: Unicode oculto y acrósticos', 41, 'text unicode zero width whitespace'], ['Archivos binarios', 44, 'binwalk binary foremost'],
      ['ZIP, RAR y comprimidos', 47, 'zip rar archive'], ['PDF', 50, 'pdf'], ['Sonic Visualiser', 53, 'audio spectrum'],
      ['Tonos DTMF', 56, 'dtmf phone tones'], ['Phone Keypad Cipher', 59, 'keypad multitap t9 telefono']
    ]
  },
  {
    id: 'sy', file: 'pdf/symbol-ciphers.pdf', cover: 'img/symbol-ciphers.jpg', pages: 92, color: '#ffd700',
    title: { es: 'Symbol Ciphers en retos CTF', en: 'Symbol ciphers in CTF challenges' },
    desc: {
      es: 'Alfabetos de símbolos: Pigpen, Zodiac, Wingdings, emojis, banderas, semáforo, Dancing Men, Gravity Falls, Minecraft, Pokémon, Futurama, Zelda… Cómo reconocerlos y descifrarlos.',
      en: 'Symbol alphabets: Pigpen, Zodiac, Wingdings, emojis, flags, semaphore, Dancing Men, Gravity Falls, Minecraft, Pokémon, Futurama, Zelda… How to recognise and decode them.'
    },
    topics: [
      ['Introducción', 10, 'intro'], ['Historia de los symbol ciphers', 12, 'history'], ['Pigpen', 15, 'pigpen masonic francmason'],
      ['Zodiac', 19, 'zodiac killer'], ['Wingdings / Webdings', 22, 'wingdings webdings font'], ['Emoji Cipher', 25, 'emoji'],
      ['Dingbats', 29, 'dingbat'], ['Ogham', 33, 'ogham irlandes'], ['Banderas náuticas', 37, 'maritime signal flags nautical'],
      ['Semáforo de banderas', 43, 'semaphore'], ['Morse visual', 47, 'morse visual'], ['Dancing Men', 52, 'sherlock holmes'],
      ['Bill Cipher (Gravity Falls)', 56, 'gravity falls'], ['Dagger Alphabet', 60, 'daggers puñales'],
      ['Standard Galactic Alphabet (Minecraft)', 64, 'sga minecraft enchanting'], ['Birds on a Wire', 68, 'pajaros birds'],
      ['Hexahue', 73, 'colores colors'], ['Enderwalk', 77, 'minecraft ender'], ['Tic-Tac-Toe', 80, 'pigpen tres en raya'],
      ['Unown (Pokémon)', 83, 'pokemon unown'], ['Futurama', 86, 'alien futurama'], ['Hylian (Zelda)', 89, 'zelda hylian'],
      ['Herramientas para symbol ciphers', 91, 'tools dcode quipqiup']
    ]
  }
];
