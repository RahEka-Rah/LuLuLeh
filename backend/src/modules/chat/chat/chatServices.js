const OpenAI = require('openai');

const chatPrompt = require("../../prompt/chatPrompt")

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.BASE_URL_AIVENE
});



const chatAi = async (req, res, question) => {
    const messages = [
        { role: 'system', content: chatPrompt }
    ];

    if (req.session.history.length > 0) {
        messages.push(...req.session.history);
    }


    messages.push({ role: 'user', content: question });

    const response = await client.chat.completions.create({
        model: 'gemini-3.5-flash-lite',
        messages: messages,
        response_format: {
            type: 'json_object'
        }

    });

    if(req.session.history.length > 20){
        req.session.history.re
    }
    return JSON.parse(response.choices[0].message.content);
};
module.exports = chatAi;