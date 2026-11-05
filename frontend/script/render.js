import { el, escapeHtml as esc, safeUrl } from './dom.js';

function renderResultChoice(item) {
  const { edukasi = {}, rekomendasi = {} } = item;
  const ideChoice = (Array.isArray(edukasi.pemanfaatan) ? edukasi.pemanfaatan : [])
    .map((tip) => `
        <li>
          <p>${esc(tip)}</p>
        </li>`
    )
    .join('');
  const videoRecommendations = (Array.isArray(rekomendasi.youtube) ? rekomendasi.youtube : [])
    .map((video) => `
        <li>
          <p>${esc(video.judul)}</p>
          <a href="${safeUrl(video.url)}" target="_blank" rel="noopener noreferrer">
            <button class="bg-gray-800 mt-2 p-2 rounded text-white">
              Tonton di YouTube
            </button>
          </a>
        </li>`
    )
    .join('');

  return `
    ${ideChoice ? `
      <div class="w-full border-1 p-2">
        <h4 class="font-semibold text-xl">Ide pemanfaatan:</h4>
        <ul>${ideChoice}</ul>
      </div>` : ''}
    ${videoRecommendations ? `
      <div class="w-full mt-4 border-1 p-2">
        <h4 class="font-semibold text-xl">Rekomendasi video:</h4>
        <ul>${videoRecommendations}</ul>
      </div>` : ''}`;
}

function renderSuccessResult(item) {
  const { identifikasi = {}, edukasi = {}, pemilahan = {} } = item;

  return `
      <article class="w-full">
        <div class="flex flex-col w-full items-center">
          <p>analisis</p>
          <h1 class="mt-2 text-3xl font-semibold">${esc(identifikasi.nama_benda)}</h1>

          <div class="flex flex-wrap w-full mt-2 gap-2">
            <p class="bg-gray-300 rounded-full  whitespace-nowrap  px-2">${esc(identifikasi.jenis_sampah)}</p>
            <p class="bg-gray-500 text-white rounded-full  whitespace-nowrap   px-2">${esc(identifikasi.kategori)}</p>
            <p class="bg-gray-700 text-white rounded-full  whitespace-nowrap   px-2">akurasi ${esc(identifikasi.tingkat_keyakinan)}</p>
          </div>
        </div>

        <div class="mt-7 w-full flex flex-col items-center" >
            <p class="indent-8 text-justify">${esc(edukasi.deskripsi)}</p>
                <br>
            <div>
                <div>
                    <h4>Saran pemilahan :</h4>
                    <p class="indent-8 text-justify">${esc(pemilahan.tempat_pembuangan)}
                            ${esc(pemilahan.saran)}</p>
                </div>
            </div>
        </div>
      </article>`;
}

export function renderError(message) {
  el.result.innerHTML = `
      <section role="alert">
        <p>Gagal!</p>
        <p>${esc(message || 'Gagal memproses data')}</p>
      </section>`;
  el.choice.innerHTML = '';
  el.result.classList.remove('hidden');
}

export function renderResult(hasil) {
  if (hasil?.success) {
    el.result.innerHTML = renderSuccessResult(hasil.data);
    el.choice.innerHTML = renderResultChoice(hasil.data);
    el.result.classList.remove('hidden');
    el.choice.classList.remove('hidden');
  } else {
    renderError(hasil?.error?.pesan || hasil?.message);
  }
}

export function clearResult() {
  el.result.innerHTML = '';
  el.choice.innerHTML = '';
  el.result.classList.add('hidden');
  el.choice.classList.add('hidden');
}
