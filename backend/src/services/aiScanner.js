const OpenAI = require('openai');
const { readFile } = require('fs/promises');

const prompt = require("./prompt")

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.BASE_URL_AIVENE
});
const detectWaste = async (image) => {
    const imageBuffer = await readFile(image.path);
    const base64 = imageBuffer.toString('base64');

    const imageUrl = `data:${image.mimetype};base64,${base64}`;


    const response = await client.chat.completions.create({
        model: 'gemini-3.5-flash-lite',
        messages: [
            {
                role: 'system',
                content: prompt
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


    return JSON.parse(response.choices[0].message.content);
};



module.exports = detectWaste;