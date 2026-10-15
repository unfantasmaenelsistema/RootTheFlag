// RootTheFlag: guías, buscador de temas, caja de herramientas y erratas de enlaces.
const $ = (id) => document.getElementById(id);
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
};
let LANG = store.get('rtf_lang') || ((navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en');
const T = () => I18N[LANG];
const tr = (o) => (o && typeof o === 'object') ? (o[LANG] || o.es) : o;
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const guide = (id) => GUIDES.find(g => g.id === id);
const pageUrl = (g, p) => `${g.file}#page=${p}`;
const SIZES = { cr: 1.4, st: 0.9, sy: 1.8 };

// ---------- operaciones de la caja de herramientas ----------
const C = CTFTools;
const OPS = [
  ['b64d', s => C.b64decode(s), ['cr', 10]],
  ['b64e', s => C.b64encode(s), ['cr', 10]],
  ['b32', s => C.b32decode(s), ['cr', 11]],
  ['hex', s => C.hexdecode(s), null],
  ['hexe', s => C.hexencode(s), null],
  ['bin', s => C.bindecode(s), null],
  ['rot13', s => C.rot13(s), ['cr', 14]],
  ['rot47', s => C.rot47(s), ['cr', 16]],
  ['caesar', s => C.caesarAll(s), ['cr', 44]],
  ['atbash', s => C.atbash(s), ['cr', 47]],
  ['vigd', (s, k) => C.vigenere(s, k, true), ['cr', 18], true],
  ['vige', (s, k) => C.vigenere(s, k, false), ['cr', 18], true],
  ['xor', s => C.xorBrute(s), ['cr', 35]],
  ['morse-d', s => C.morseDecode(s), ['cr', 28]],
  ['morse-e', s => C.morseEncode(s), ['cr', 28]],
  ['rail', s => C.railAll(s), ['cr', 56]],
  ['a1z26', s => C.a1z26(s), null],
  ['url', s => C.urlDecode(s), null],
  ['rev', s => C.reverse(s), null]
].map(([id, fn, ref, key]) => ({ id, fn, ref, key: !!key }));
let currentOp = null;

// ---------- tema e idioma ----------
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  $('themeBtn').textContent = t === 'light' ? T().themeDark : T().themeLight;
}
function applyTexts() {
  document.documentElement.lang = LANG;
  document.title = T().title;
  document.querySelectorAll('[data-t]').forEach(el => { el.textContent = T()[el.dataset.t]; });
  document.querySelectorAll('[data-tp]').forEach(el => { el.placeholder = T()[el.dataset.tp]; });
  $('langBtn').textContent = T().lang;
  $('licLink').href = T().licUrl;
  applyTheme(document.documentElement.getAttribute('data-theme'));
}

// ---------- render ----------
function renderStats() {
  const topics = GUIDES.reduce((n, g) => n + g.topics.length, 0);
  const pages = GUIDES.reduce((n, g) => n + g.pages, 0);
  $('stats').innerHTML = [
    [GUIDES.length, T().statGuides], [pages, T().statPages], [topics, T().statTopics], [OPS.length, T().statOps]
  ].map(([n, l]) => `<div class="stat"><b>${n}</b> ${l}</div>`).join('');
}

function renderGuides() {
  $('guides').innerHTML = GUIDES.map(g => `
    <article class="guide" style="--g:${g.color}">
      <a href="${g.file}" target="_blank" rel="noopener"><img class="cover" src="${g.cover}" alt="${esc(tr(g.title))}" loading="lazy" width="372" height="526"></a>
      <div class="body">
        <h3>${esc(tr(g.title))}</h3>
        <div class="meta">${T().pages(g.pages, SIZES[g.id])} · PDF ES · <a href="${T().licUrl}" target="_blank" rel="noopener license">CC BY-NC-SA 4.0</a></div>
        <p>${esc(tr(g.desc))}</p>
        <div class="topics">${g.topics.map(([t, p]) => `<a class="tag" href="${pageUrl(g, p)}" target="_blank" rel="noopener" title="${T().page(p)}">${esc(t)}</a>`).join('')}</div>
        <div class="actions">
          <a class="btn" href="${g.file}" target="_blank" rel="noopener">${T().open}</a>
          <a class="btn alt" href="${g.file}" download>${T().download}</a>
        </div>
      </div>
    </article>`).join('');
}

function renderSearch() {
  const q = norm($('search').value.trim());
  const box = $('results');
  if (!q) { box.innerHTML = ''; $('noResults').hidden = true; return; }
  const terms = q.split(/\s+/);
  const hits = [];
  GUIDES.forEach(g => g.topics.forEach(([t, p, k]) => {
    const hay = norm(`${t} ${k || ''} ${tr(g.title)}`);
    if (terms.every(x => hay.includes(x))) hits.push({ g, t, p });
  }));
  box.innerHTML = hits.map(({ g, t, p }) => `
    <a class="result" style="--g:${g.color}" href="${pageUrl(g, p)}" target="_blank" rel="noopener">
      <span>${esc(t)}</span><small>${esc(tr(g.title).split(' ')[0])} · ${T().page(p)}</small>
    </a>`).join('');
  $('noResults').hidden = hits.length > 0;
}

function renderOps() {
  const sugg = C.detect($('input').value);
  $('ops').innerHTML = OPS.map(o => `<button type="button" class="op${o.id === currentOp ? ' on' : ''}${sugg.includes(o.id) ? ' hint' : ''}" data-op="${o.id}">${esc(T().ops[o.id])}</button>`).join('');
  $('ops').querySelectorAll('.op').forEach(b => b.addEventListener('click', () => { currentOp = b.dataset.op; run(); }));
  $('suggest').innerHTML = `<span>${T().suggest}</span>` + (sugg.length
    ? sugg.map(id => `<button type="button" class="chip" data-op="${id}">${esc(T().ops[id])}</button>`).join('')
    : `<span>${T().none}</span>`);
  $('suggest').querySelectorAll('button').forEach(b => b.addEventListener('click', () => { currentOp = b.dataset.op; run(); }));
}

function run() {
  renderOps();
  const out = $('output');
  const op = OPS.find(o => o.id === currentOp);
  $('paramRow').hidden = !(op && op.key);
  if (!op) { out.textContent = T().pick; out.classList.remove('err'); $('ref').innerHTML = ''; return; }
  $('ref').innerHTML = op.ref
    ? `<a href="${pageUrl(guide(op.ref[0]), op.ref[1])}" target="_blank" rel="noopener">${esc(T().guideRef(tr(guide(op.ref[0]).title), op.ref[1]))}</a>`
    : '';
  const input = $('input').value;
  if (!input) { out.textContent = ''; return; }
  if (op.key && !$('key').value.trim()) { out.textContent = T().needKey; out.classList.add('err'); return; }
  try {
    out.textContent = op.fn(input, $('key').value);
    out.classList.remove('err');
  } catch (e) {
    out.textContent = T().error;
    out.classList.add('err');
  }
}

function renderErrata() {
  $('errataSummary').textContent = T().errataSummary(ERRATA.length);
  $('errataTable').innerHTML = `<thead><tr><th>${T().thGuide}</th><th>${T().thPage}</th><th>${T().thLink}</th><th>${T().thWhy}</th><th>${T().thOld}</th><th>${T().thNew}</th></tr></thead><tbody>` +
    ERRATA.map(r => {
      const g = guide(r.g);
      return `<tr><td>${esc(tr(g.title).split(' ')[0])}</td><td><a href="${pageUrl(g, r.p)}" target="_blank" rel="noopener">${r.p}</a></td>
        <td>${r.visible ? '⚠ ' : ''}${esc(r.label)}</td><td>${esc(tr(r.why))}</td>
        <td class="url old">${esc(r.old)}</td><td class="url"><a href="${esc(r.new)}" target="_blank" rel="noopener">${esc(r.new)}</a></td></tr>`;
    }).join('') + '</tbody>';
}

function renderAll() {
  applyTexts();
  renderStats();
  renderGuides();
  renderSearch();
  run();
  renderErrata();
}

// ---------- eventos ----------
$('langBtn').addEventListener('click', () => { LANG = LANG === 'es' ? 'en' : 'es'; store.set('rtf_lang', LANG); renderAll(); });
$('themeBtn').addEventListener('click', () => {
  const t = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  store.set('rtf_theme', t); applyTheme(t);
});
$('search').addEventListener('input', renderSearch);
$('input').addEventListener('input', run);
$('key').addEventListener('input', run);
$('copyBtn').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText($('output').textContent); $('copyBtn').textContent = T().copied; }
  catch (e) {}
  setTimeout(() => { $('copyBtn').textContent = T().copy; }, 1200);
});
$('chainBtn').addEventListener('click', () => {
  if ($('output').classList.contains('err')) return;
  $('input').value = $('output').textContent; currentOp = null; run();
});

renderAll();
