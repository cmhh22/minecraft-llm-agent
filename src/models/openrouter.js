import OpenAIApi from 'openai';
import { getKey, hasKey } from '../utils/keys.js';
import { strictFormat } from '../utils/text.js';

export class OpenRouter {
    static prefix = 'openrouter';
    constructor(model_name, url) {
        this.model_name = model_name;

        let config = {};
        config.baseURL = url || 'https://openrouter.ai/api/v1';

        const apiKey = getKey('OPENROUTER_API_KEY');
        if (!apiKey) {
            console.error('Error: OPENROUTER_API_KEY not found. Make sure it is set properly.');
        }

        // Pass the API key to OpenAI compatible Api
        config.apiKey = apiKey; 

        this.openai = new OpenAIApi(config);
    }

    async sendRequest(turns, systemMessage, stop_seq='*') {
        let messages = [{ role: 'system', content: systemMessage }, ...turns];
        messages = strictFormat(messages);

        const pack = {
            model: this.model_name,
            messages,
            stop: stop_seq
        };

        const MAX_RETRIES = 3;
        const RETRY_DELAYS = [60000, 120000, 180000]; // 1min, 2min, 3min

        let res = null;
        for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
            try {
                console.log('Awaiting openrouter api response...');
                let completion = await this.openai.chat.completions.create(pack);
                if (!completion?.choices?.[0]) {
                    console.error('No completion or choices returned:', completion);
                    return 'No response received.';
                }
                if (completion.choices[0].finish_reason === 'length') {
                    throw new Error('Context length exceeded');
                }
                console.log('Received.');
                res = completion.choices[0].message.content;
                return res;
            } catch (err) {
                if (err.status === 429 && attempt < MAX_RETRIES) {
                    const delay = RETRY_DELAYS[attempt];
                    console.warn(`Rate limited (429). Waiting ${delay/1000}s before retry ${attempt+1}/${MAX_RETRIES}...`);
                    await new Promise(r => setTimeout(r, delay));
                    continue;
                }
                console.error('Error while awaiting response:', err);
                res = 'My brain disconnected, try again.';
            }
        }
        return res;
    }

    async sendVisionRequest(messages, systemMessage, imageBuffer) {
        const imageMessages = [...messages];
        imageMessages.push({
            role: "user",
            content: [
                { type: "text", text: systemMessage },
                {
                    type: "image_url",
                    image_url: {
                        url: `data:image/jpeg;base64,${imageBuffer.toString('base64')}`
                    }
                }
            ]
        });
        
        return this.sendRequest(imageMessages, systemMessage);
    }

    async embed(text) {
        throw new Error('Embeddings are not supported by Openrouter.');
    }
}