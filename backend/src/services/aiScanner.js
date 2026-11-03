const OpenAI = require('openai');
const { readFile } = require('fs/promises');


const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: 'https://api.aivene.com/v1'
});
const detectWaste = async (image) => {
    const imageBuffer = await readFile(image.path);
    const base64 = imageBuffer.toString('base64');

    const imageUrl = `data:${image.mimetype};base64,${base64}`;

const start = performance.now();

    const response = await client.chat.completions.create({
        model: 'gemini-3.5-flash-lite',
        messages: [
            {
                role: 'system',
                content: `Kamu adalah AI pendeteksi dan edukator sampah.

Analisis gambar yang diberikan dan kembalikan hasil dalam JSON valid saja.

Gunakan struktur berikut:

{
    "success": true,
    "nama_benda": "Nama benda",
    "jenis_sampah": "Nama jenis sampah",
    "kategori": "organik/anorganik/B3",
    "tingkat_keyakinan": "tinggi/sedang/rendah",
    "deskripsi": "Penjelasan benda dan karakteristiknya maxsimal 2 kalimat",

    "pemanfaatan": [
        "Ide pemanfaatan pertama",
        "Ide pemanfaatan kedua"
    ],
    "saran_pemilahan": "Cara membuang atau memilah sampah dengan benar"
}

Aturan:
- Gunakan bahasa Indonesia.
- Jangan mengarang identitas benda jika gambar tidak jelas.
- Jika bukan sampah atau objek tidak dapat dikenali, success bernilai false.
- Kategori harus organik, anorganik, B3, atau tidak_diketahui.
- Tingkat keyakinan harus berdasarkan kejelasan gambar.
- Jangan menambahkan Markdown atau teks di luar JSON.`
            },
            {
                role: 'user',
                content: [
                    {
                        type: 'text',
                        text: 'Identifikasi sampah pada gambar ini.'
                    },
                    {
                        type: 'image_url',
                        image_url: {
                            url: imageUrl
                        }
                    }
                ]
            }
        ],
        response_format: {
            type: 'json_object'
        }
        
    });
    console.log(
    "Waktu AI:",
    ((performance.now() - start) / 1000).toFixed(2),
    "detik"
);
    return JSON.parse(response.choices[0].message.content);
};



module.exports = detectWaste;