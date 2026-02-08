import { getKey } from '../utils/keys.js';
import { strictFormat } from '../utils/text.js';

// GitHub Models API adapter
// Endpoint: https://models.github.ai/inference/chat/completions
// Requires a GitHub Personal Access Token (PAT) with models:read permission
// Free tier (Copilot Free): Low-tier = 15 RPM, 150 RPD, 8K in / 4K out
//                           High-tier = 10 RPM, 50 RPD, 8K in / 4K out
// Model IDs: e.g. "openai/gpt-4.1-mini", "meta/llama-4-scout-17b-16e-instruct",
//   "mistralai/mistral-small", "microsoft/phi-4", "cohere/cohere-command-a"
// Docs: https://docs.github.com/en/github-models

export class Github {
    static prefix = 'github';

    constructor(model_name, url) {
        // model_name comes WITHOUT the "github/" prefix (stripped by _model_map)
        // But GitHub API needs the publisher/model format like "mistralai/mistral-small"
        this.model_name = model_name;
        this.url = url || 'https://models.github.ai/inference/chat/completions';

        this.apiKey = getKey('GITHUB_API_KEY');
        if (!this.apiKey) {
            console.error('Error: GITHUB_API_KEY not found in keys.json.');
            console.error('Create a GitHub Personal Access Token with models:read permission.');
            console.error('Go to: GitHub → Settings → Developer settings → Fine-grained tokens');
        }
    }

    async sendRequest(turns, systemMessage, stop_seq='*') {
        let messages = [{ role: 'system', content: systemMessage }, ...turns];
        messages = strictFormat(messages);

        const body = {
            model: this.model_name,
            messages,
            stop: stop_seq ? [stop_seq] : undefined
        };

        const MAX_RETRIES = 3;
        const RETRY_DELAYS = [60000, 120000, 180000]; // 1min, 2min, 3min

        let res = null;
        for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
            try {
                console.log(`Awaiting GitHub Models response (${this.model_name})...`);

                const response = await fetch(this.url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Accept': 'application/vnd.github+json',
                        'X-GitHub-Api-Version': '2022-11-28'
                    },
                    body: JSON.stringify(body)
                });

                if (response.status === 429) {
                    throw { status: 429, message: 'Rate limited' };
                }

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`GitHub Models API error ${response.status}: ${errorText}`);
                }

                const completion = await response.json();

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
                console.error('GitHub Models error:', err.message || err);
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
        throw new Error('Embeddings are not supported by GitHub Models.');
    }
}
