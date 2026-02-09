# Minecraft LLM Agent — "Bartolo"

> **A personal study project exploring AI agents in Minecraft using Large Language Models.**

https://github.com/user/minecraft-llm-agent <!-- Replace with your actual repo URL -->

---

## What Is This?

This is a **personal learning project** built for study, experimentation, and fun. It connects a Large Language Model (LLM) to a Minecraft bot that can talk to players, navigate the world, collect resources, craft items, and — most ambitiously — attempt to build structures from scratch using AI-generated code.

The bot's name is **Bartolo**. He speaks Spanish, has a cheerful personality, and tries his best to build houses, towers, and other structures when you ask him. Key word: *tries*.

### Honest Disclaimer

**The bot's constructions are far from perfect.** Roofs may end up displaced, blocks sometimes float in the air, walls might not align correctly, and interiors can be messy. This is not a production-ready tool — it is an exploration of what's possible (and what's still hard) when you let an AI agent generate and execute Minecraft building code in real time.

That said, the fact that the bot can:
- Understand a natural language request like *"build me a house"*
- Generate a complete JavaScript codeblock with hundreds of block placements
- Execute it in a live Minecraft world
- Navigate, mine, craft, and interact with the environment autonomously

...is genuinely impressive and a meaningful step forward in AI agent capabilities. There's still a long way to go — especially in spatial reasoning, coordinate accuracy, and architectural coherence — but this project demonstrates the potential.

The models used are **free-tier** offerings from GitHub Models (GPT-4.1-mini, Mistral Medium, Grok-3, DeepSeek-R1, etc.), which adds additional limitations in output quality and rate limits compared to paid APIs.

---

## Demo Videos

🎥 *Coming soon — a gallery page with short video clips showcasing the bot's different capabilities (building, mining, chatting, navigating, crafting).*

<!-- Future: link to your demo page here -->

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js v20+** | Runtime (ES modules) |
| **Mineflayer v4.33** | Minecraft bot framework — movement, inventory, block placement |
| **mineflayer-pathfinder** | A* pathfinding and navigation |
| **mineflayer-collectblock** | Automated resource collection |
| **mineflayer-pvp** | Combat capabilities |
| **mineflayer-auto-eat** | Automatic hunger management |
| **mineflayer-armor-manager** | Automatic armor equipping |
| **GitHub Models API** | Free-tier LLM access (GPT-4.1, GPT-4o, Grok-3, Mistral, DeepSeek) |
| **OpenAI-compatible API** | Chat completions endpoint for code generation |
| **Express v4.18** | Web UI backend |
| **Socket.io v4.7** | Real-time communication (UI ↔ bot) |
| **ESLint v9** | Lints AI-generated code before execution |
| **SES (Secure ECMAScript)** | Sandboxes AI-generated code for safety |
| **prismarine-viewer** | Optional 3D view of bot's perspective |

### Architecture Overview

```
Player (Minecraft) ←→ Mineflayer Bot ←→ Agent System ←→ LLM API
                                              ↕
                                     Code Generation
                                     (write JS → lint → sandbox → execute)
```

The agent receives player messages, sends them to an LLM along with the bot's current state (inventory, position, nearby blocks, health, etc.), and the LLM responds with either conversational text or executable JavaScript codeblocks that control the bot.

---

## How to Use It

Anyone is free to clone, modify, and experiment with this project. It runs locally — there's no deployment or hosted service; you need your own Minecraft instance and API keys.

### Prerequisites

- **Node.js v20.10+**
- **Minecraft Java Edition** (1.20.4 – 1.21.x)
- A **GitHub Personal Access Token** with `models:read` permission (free) — [Create one here](https://github.com/settings/tokens)
- Optionally: Gemini API key, OpenRouter API key

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/minecraft-llm-agent.git
cd minecraft-llm-agent

# 2. Install dependencies
npm install

# 3. Configure your API keys
#    Copy the example and add your keys:
cp keys.example.json keys.json
```

Edit `keys.json` with your API keys:
```json
{
    "GITHUB_API_KEY": "github_pat_YOUR_TOKEN_HERE",
    "GEMINI_API_KEY": "",
    "OPENROUTER_API_KEY": "",
    "OPENAI_API_KEY": ""
}
```

### Running

```bash
# 1. Start Minecraft and open a world (singleplayer or server)
#    Make sure to enable LAN or have a server running

# 2. Edit settings.js to match your Minecraft port
#    (shown on screen when you open to LAN)

# 3. Start the bot
node main.js
```

The web UI opens automatically at `http://localhost:8080`.

### Switching Models

Edit `bartolo.json` and change the `"model"` field:

```json
{
    "model": "github/openai/gpt-4.1-mini"
}
```

Available models (GitHub free tier):
| Model | Daily Limit | Best For |
|---|---|---|
| `github/openai/gpt-4.1` | 50/day | Best quality, good at building code |
| `github/openai/gpt-4o` | 50/day | Fast, good quality |
| `github/openai/gpt-4.1-mini` | 50/day | Good balance of speed and quality |
| `github/xai/grok-3` | 15/day | Creative, but very limited |
| `github/deepseek/DeepSeek-R1` | 8/day | Reasoning-focused |
| `github/mistral-ai/mistral-medium-2505` | 150/day | Most requests/day, decent quality |

### Talking to the Bot

In Minecraft chat, just type naturally:

```
build me a house
collect 10 oak logs
come here
make me a diamond sword
build a medieval tower
```

The bot will respond in Spanish (its personality) and execute actions autonomously.

---

## Project Structure

```
├── bartolo.json          # Bot personality, model config, and prompt engineering
├── settings.js           # Minecraft connection, ports, and behavior settings
├── keys.json             # API keys (not committed)
├── main.js               # Entry point
├── src/
│   ├── agent/            # Core agent: action manager, coder, conversation, memory
│   │   ├── agent.js      # Main agent orchestrator
│   │   ├── coder.js      # LLM code generation + lint + sandbox + execute
│   │   ├── library/      # Skills (mining, building, crafting) and world state
│   │   └── commands/     # Chat command handlers (!newAction, !goTo, etc.)
│   ├── models/           # LLM API adapters
│   │   ├── github.js     # GitHub Models API (primary)
│   │   ├── gemini.js     # Google Gemini
│   │   ├── gpt.js        # OpenAI direct
│   │   └── prompter.js   # Prompt assembly and model routing
│   └── mindcraft/        # Web UI server (Express + Socket.io)
```

---

## Known Limitations

- **Spatial accuracy**: The bot frequently misaligns roofs, walls, and decorations. Blocks may float or overlap. This is a fundamental challenge of LLM-based spatial reasoning.
- **Free-tier rate limits**: GitHub Models free tier restricts requests per day. Heavy building sessions will hit limits.
- **Content filters**: OpenAI models via Azure may block some prompts unexpectedly.
- **No persistence**: Buildings exist only in the Minecraft world. The bot doesn't "remember" what it built after restart.
- **Single-player focus**: Designed for local play, not production multiplayer servers.

---

## Credits & Attribution

This project is a **personal fork** of [**Mindcraft**](https://github.com/kolbytn/mindcraft) by Kolby Nottingham, licensed under the [MIT License](https://opensource.org/licenses/MIT). The original project provides the foundational agent architecture, mineflayer integration, and prompt engineering framework.

All modifications — including the Bartolo personality, custom prompt engineering for building, GitHub Models integration with retry logic, ESLint flat config fix, spatial coordinate system improvements, and various bug fixes — were made as part of a personal learning exercise.

---

## License

MIT License — free for anyone to use, modify, and distribute.
