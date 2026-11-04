import { el, escapeHtml as esc, safeUrl } from './dom.js';

const section = (title, body) => `
  <section>
    <h3>${title}</h3>
    ${body}
  </section>`;

const infoLine = (icon, label, text) => `
  <p><span aria-hidden="true">${icon}</span> <strong>${label}:</strong> ${esc(text)}</p>`;

function renderSuccess(item) {
    const { identifikasi = {}, edukasi = {}, pemilahan = {}, rekomendasi = {} } = item;

    const tips = (edukasi.pemanfaatan ?? [])
        .map((tip) => `
          <li>
            <span aria-hidden="true">⚡</span>
            <span>${esc(tip)}</span>
          </li>`)
        .join('');

    const videos = (rekomendasi.youtube ?? [])
        .map((video) => `
          <a href="${safeUrl(video.url)}" target="_blank" rel="noopener noreferrer">
            📺 Tonton Panduan Video
          </a>`)
        .join('');

    return `
      <article>
        <header>
          <div>
            <h2>${esc(identifikasi.nama_benda)}</h2>
            <span>${esc(identifikasi.kategori)}</span>
          </div>
          <p>
            Jenis: <span>${esc(identifikasi.jenis_sampah)}</span>
            (Akurasi: ${esc(identifikasi.tingkat_keyakinan)})
          </p>
        </header>

        ${section('Tentang Sampah Ini', `<p>${esc(edukasi.deskripsi)}</p>`)}
        ${tips ? section('Ide Pemanfaatan', `<ul>${tips}</ul>`) : ''}
        ${section(
            'Pemilahan',
            `${infoLine('📌', 'Tempat Pembuangan', pemilahan.tempat_pembuangan)}
             ${infoLine('💡', 'Saran Pengolahan', pemilahan.saran)}`
        )}
        ${videos ? `<footer>${videos}</footer>` : ''}
      </article>`;
}

export function renderError(message) {
    el.result.innerHTML = `
      <section role="alert">
        <p>Gagal!</p>
        <p>${esc(message || 'Gagal memproses data')}</p>
      </section>`;
}

export function renderResult(hasil) {
    if (hasil?.success) {
        el.result.innerHTML = renderSuccess(hasil.data);
    } else {
        renderError(hasil?.message);
    }
}

export function clearResult() {
    el.result.innerHTML = '';
}