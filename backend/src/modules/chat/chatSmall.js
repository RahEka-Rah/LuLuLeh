const OpenAI = require('openai');
const prompt = require('../prompt/smallchat');
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.BASE_URL_AIVENE
});

exports.chatSmall = async (req) => {

    const maxLengthChat = 20
    const totalSlice = 16
    try {
        if (req.session.history.length >=maxLengthChat) {
            const sliceChat = req.session.history.slice(0, 16);


            const response = await client.chat.completions.create({
                model: 'gemini-3.5-flash-lite',
                messages: [
                    {
                        role: 'system',
                        content: prompt
                    },
                    {
                        role: 'user',
                        content: "ringkas chat ini " + JSON.stringify(sliceChat)
                    }
                ],
                response_format: {
                    type: 'json_object'
                }

            });
            const result = JSON.parse(response.choices[0].message.content);
            if (result.success == true) {
                req.session.history.splice(0, totalSlice);


                const userText = {
                    role: 'user',
                    content: "apa yang sedang kita bicarakan"
                };
                const resultText = {
                    role: 'assistant',
                    content: result.content
                };


                req.session.history = [userText, resultText, ...req.session.history];


            } else {
                req.session.history.splice(0, 2);
            }
        }
    } catch (error) {
        if (req.session.history && req.session.history.length >= totalSlice) {
            req.session.history.splice(0, 2);
        }
    }







}