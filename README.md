# LuLuLeh
lomba digifest 2026 Ai web inovation


## Description
lululeh adalah Website pemilah sampah yang dikombinasikan dengan AI sebagai inti atau otak yang memproses data yang diberikan user dalam bentuk foto dan akan dipindai lalu dikategorikan sesuai dengan jenis sampah yang di potret oleh pengguna.
Inovasi sistem ini bersumber dari kenyataan di masyarakat yang sering kali kesulitan atau enggan memilah sampah karena rendahnya literasi pengelolaan limbah serta hambatan teknis untuk menginstal aplikasi khusus di gawai mereka yang kapasitas penyimpanannya terbatas. Melalui pendekatan berbasis browser web, sistem ini menghadirkan solusi yang praktis dan menjembatani kesenjangan tersebut, di mana warga dapat langsung memindai sampah rumah tangga dan menerima edukasi instan tanpa perlu repot mengunduh aplikasi tambahan.

## Problem & Target User
Problem: Masyarakat sering kali kesulitan atau enggan memilah sampah akibat rendahnya literasi pengelolaan limbah. Selain itu, terdapat hambatan teknis berupa gawai dengan kapasitas penyimpanan terbatas yang membuat warga malas mengunduh aplikasi baru.

Target User: Warga/masyarakat umum dan pengguna rumah tangga yang ingin memilah sampah secara praktis tanpa beban menginstal aplikasi tambahan.

## Key Features
Web-Based Zero-Install Access: Platform berbasis browser yang dapat langsung diakses tanpa perlu mengunduh atau menginstal aplikasi di gawai.

AI Waste Photo Scanning: Fitur pemindaian foto berbasis AI untuk mengenali dan mengategorikan jenis sampah secara otomatis.

Instant Literacy & Education: Panduan edukasi instan yang langsung muncul setelah pemindaian untuk memberi tahu cara penanganan sampah yang tepat.

## Tech Stack
Frontend: HTML, Tailwind CSS, JavaScript, Three.js, Vite

Backend: Node.js, Express.js, Multer, CORS

AI Engine & API: Gemini Model (3.5 Flash Lite) via AIVENE API

Hosting: boc.co.id

## AI Implementation
Peran AI: Bertindak sebagai inti (otak) sistem untuk melakukan klasifikasi citra (Image Classification / Computer Vision).

Pemrosesan Data: Memproses data visual (foto) yang diunggah pengguna, mendeteksi objek sampah, lalu menentukan kategori jenis sampahnya secara otomatis.

## AI asisten
ChatGPT, Gemini , Claude , Github Copilot

## Architecture / Data Flow
Input: Pengguna mengambil foto sampah rumah tangga melalui antarmuka browser web lululeh.

Processing: Data foto dikirimkan ke server backend untuk dipindai dan diklasifikasikan objeknya.

Output: Sistem mengembalikan hasil kategorisasi sampah beserta informasi edukasi pemilahannya ke layar pengguna secara real-time.

## Installation / Run Instructions

### 1. Prerequisites

Pastikan perangkat sudah memiliki:

- [Node.js](https://nodejs.org/) (versi 18 atau lebih baru)
- npm (Node Package Manager)
- [Git](https://git-scm.com/)

Periksa instalasi melalui terminal:

```bash
node -v
npm -v
git --version
```

### 2. Clone Repository

```bash
git clone https://github.com/RahEka-Rah/LuLuLeh.git
cd LuLuLeh
```

### 3. Install Dependencies

Instal dependencies :

```bash
npm install
```



### 4. Environment Configuration

Buat dua file environment.

**A. Root Directory (`.env`)**

Buat file `.env` di direktori utama proyek.

```env
OPENAI_API_KEY=your_openai_api_key

BASE_URL_AIVENE=

PORT_BACKEND=
PORT_FRONTEND=

URL_BACKEND=
URL_FRONTEND=
```

Keterangan:

- `OPENAI_API_KEY`: API key untuk layanan AI.
- `BASE_URL_AIVENE`: Base URL layanan AI.
- `PORT_BACKEND`: Port backend.
- `PORT_FRONTEND`: Port frontend.
- `URL_BACKEND`: URL backend.
- `URL_FRONTEND`: URL frontend.

**B. Frontend Directory (`frontend/.env`)**

Buat file `.env` di dalam direktori frontend.

```env
VITE_API_BACKEND=
```

Keterangan:

- `VITE_API_BACKEND`: URL backend yang digunakan frontend untuk mengirim HTTP request.

Isi seluruh konfigurasi sesuai lingkungan pengembangan.

### 5. Run Application

Jalankan backend dan frontend menggunakan dua terminal terpisah.

**Terminal 1 — Backend**

```bash
npm run server:dev
```

**Terminal 2 — Frontend**

```bash
npm run dev
```

### 6. Access Application

Setelah kedua server berhasil dijalankan, buka browser dan akses URL frontend sesuai konfigurasi.

Pastikan backend berjalan agar frontend dapat berkomunikasi dengan layanan backend.

## Deployment URL
klik ini [LuLuLeh web](https://lululeh.oneska-apps.my.id)

## Known Limitations
Membutuhkan koneksi internet stabil untuk mengirimkan foto dan menerima hasil pemrosesan AI.

Akurasi pemindaian AI sangat bergantung pada kejelasan foto, pencahayaan, dan sudut pengambilan gambar oleh pengguna.

## Third-party Resources / Credits

### Frontend & Presentation:

Vite: Build tool dan dev server utama untuk lingkungan pengembangan frontend.

Tailwind CSS: Framework CSS berbasi utility untuk antarmuka yang responsif.

Three.js: Library JavaScript 3D untuk penyajian elemen visual interaktif di browser.

### Backend & Server:

Node.js: Runtime environment JavaScript di sisi server.

Express.js: Framework web backend untuk menangani routing dan logika server.

Multer: Middleware pengunggah berkas untuk memproses foto dari pengguna.

CORS: Middleware pengatur izin akses antardomain (Cross-Origin Resource Sharing).

### AI & API Provider:

AIVENE API: Layanan API antarmuka untuk menghubungkan backend dengan model kecerdasan buatan.

Gemini Model (3.5 Flash Lite): Model AI untuk analisis dan klasifikasi objek citra foto sampah.

## Team Members
Ida Bagus Gde Dharma siwi Bhagaskara sebagai pembuat proposal dan dokumentasi
I Gusti Ngurah Putu Eka Jumantana sebagai pembuat website dan semua fitur"nya
I Kadek Sanjaya sebagai pengurus API AI 
