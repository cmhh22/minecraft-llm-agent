import { getKey } from '../utils/keys.js';
import { strictFormat } from '../utils/text.js';

// ============================================================================
// GitHub Models API - Single Model
// ============================================================================
// Uses the model specified in your profile JSON (e.g. "github/openai/gpt-4.1").
// To switch models, change the "model" field in your profile JSON and restart.
//
// Available models (GitHub free tier daily limits):
//   openai/gpt-4.1           (50/day,  10 rpm)
//   openai/gpt-4o            (50/day,  10 rpm)
//   openai/gpt-4.1-mini      (50/day,  10 rpm)
//   xai/grok-3               (15/day,   1 rpm)
//   deepseek/DeepSeek-R1     (8/day,    1 rpm)
//   mistral-ai/mistral-medium-2505  (150/day, 15 rpm)
//
// Endpoint: https://models.github.ai/inference/chat/completions
// Auth: GitHub PAT with models:read permission
// ============================================================================

export class Github {
    static prefix = 'github';

    constructor(model_name, url) {
        this.model_name = model_name || 'mistral-ai/mistral-medium-2505';
        this.url = url || 'https://models.github.ai/inference/chat/completions';
        this.requestCount = 0;

        this.apiKey = getKey('GITHUB_API_KEY');
        if (!this.apiKey) {
            console.error('Error: GITHUB_API_KEY not found in keys.json.');
            console.error('Create a GitHub PAT with models:read → github.com/settings/tokens');
        }

        console.log(`[GitHub Models] Using: ${this.model_name}`);
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

        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                this.requestCount++;
                console.log(`[${this.model_name}] Request #${this.requestCount} (attempt ${attempt}/${MAX_RETRIES}) ...`);

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

                // Rate limited - wait and retry
                if (response.status === 429) {
                    const waitSec = attempt * 30;
                    console.warn(`[RATE LIMITED] ${this.model_name} - waiting ${waitSec}s before retry...`);
                    await new Promise(r => setTimeout(r, waitSec * 1000));
                    continue;
                }

                // Content filter (Azure) - log and return message
                if (response.status === 400) {
                    const errorText = await response.text();
                    if (errorText.includes('content management policy') || errorText.includes('content_filter')) {
                        console.warn(`[CONTENT FILTER] ${this.model_name} blocked by Azure content filter`);
                        return 'My response was blocked by the content filter. Could you rephrase your request?';
                    }
                    console.error(`[ERROR 400] ${this.model_name}: ${errorText.substring(0, 300)}`);
                    continue;
                }

                // Model not found
                if (response.status === 404) {
                    console.error(`[NOT FOUND] Model "${this.model_name}" not found. Check model ID.`);
                    return 'Model not found. Please check the model name in your profile JSON.';
                }

                // Other errors - retry
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error(`[ERROR ${response.status}] ${this.model_name}: ${errorText.substring(0, 300)}`);
                    continue;
                }

                const completion = await response.json();

                if (!completion?.choices?.[0]) {
                    console.error(`[EMPTY] No choices returned from ${this.model_name}`);
                    continue;
                }
                if (completion.choices[0].finish_reason === 'length') {
                    console.warn(`[TRUNCATED] ${this.model_name} hit output token limit`);
                }

                console.log(`[OK] ${this.model_name}`);
                return completion.choices[0].message.content;

            } catch (err) {
                console.error(`[ERROR] ${this.model_name}:`, err.message || err);
                if (attempt < MAX_RETRIES) {
                    await new Promise(r => setTimeout(r, 5000));
                }
                continue;
            }
        }

        // All retries failed
        return `I couldn't get a response from ${this.model_name} after ${MAX_RETRIES} attempts. Try again or switch models in your profile JSON.`;
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
        console.warn('[GitHub Models] Embeddings not natively supported, returning empty.');
        return [];
    }
}
