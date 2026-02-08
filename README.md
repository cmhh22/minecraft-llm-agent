# 🏠 Minecraft LLM Agent - Lolita Edition 🤖

> **Enhanced Mindcraft** with GitHub Models integration and advanced building capabilities

AI-powered Minecraft bot using the **Mindcraft** framework with **FREE GitHub Models API**. Meet **Lolita** - a Spanish-speaking female bot that builds detailed architectural structures, not just simple boxes!

![Minecraft](https://img.shields.io/badge/Minecraft-1.21.6-green)
![Node.js](https://img.shields.io/badge/Node.js-v20.20.0-blue)
![GitHub Models](https://img.shields.io/badge/GitHub%20Models-Mistral%20Medium-purple)
![Free API](https://img.shields.io/badge/API-150%20req%2Fday%20FREE-brightgreen)

> **[See the bot in action → Demo](docs/DEMO.md)**

---

## ✨ What Makes This Version Special

This is a **customized fork** of [Mindcraft](https://github.com/kolbytn/mindcraft) with:

### 🆕 New Features
- ✅ **GitHub Models Integration**: FREE API with Mistral Medium (150 requests/day)
- ✅ **Advanced Building AI**: Detailed houses with peaked roofs, windows, doors, interiors
- ✅ **Enhanced Coding Prompts**: 10-rule architecture system for quality structures
- ✅ **Spanish Language**: Native Spanish responses
- ✅ **Multiple Materials**: Uses oak planks, cobblestone, glass, stairs, logs
- ✅ **Interior Decoration**: Adds torches, crafting tables, furnaces, beds

### 🏗️ Building Examples
**Before (Default Mindcraft)**: Simple 4-wall box with flat ceiling
**After (This Version)**: 7×7×5 house with:
- Cobblestone foundation
- Oak log corner pillars  
- Glass pane windows
- Oak door entrance
- **Peaked A-frame roof** (oak stairs)
- Interior furniture

---

## 🚀 Quick Start

### Prerequisites

- [Minecraft Java Edition 1.21.6](https://www.minecraft.net/en-us/store/minecraft-java-bedrock-edition-pc)
- [Node.js v20+](https://nodejs.org/) (v20 LTS recommended)
- **GitHub Personal Access Token** with `models:read` permission (FREE)


### Installation

```bash
# Clone this repository
git clone https://github.com/cmhh22/minecraft-llm-agent.git
cd minecraft-llm-agent

# Install dependencies
npm install
```

### 🔑 Get Your FREE GitHub Models API Key

1. Go to [GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens](https://github.com/settings/tokens?type=beta)
2. Click **"Generate new token"**
3. Give it a name (e.g., "mindcraft-bot")
4. Under **"Repository permissions"**, enable: **`Models: Read`**
5. Click **"Generate token"** and copy it

### ⚙️ Configuration

1. **Rename** `keys.example.json` to `keys.json`
2. **Add your GitHub token**:
```json
{
  "GITHUB_API_KEY": "github_pat_YOUR_TOKEN_HERE"
}
```

3. **Configure Minecraft server** (if needed):
Edit `settings.js`:
```javascript
"minecraft_port": 55916,  // Must match your LAN port
"auth": "offline"          // Use "microsoft" for online servers
```

### ▶️ Running the Bot

1. **Start Minecraft Java Edition 1.21.6**
2. **Open a world**
3. Press **ESC** → **"Open to LAN"** → Note the port (e.g., 55916)
4. **Start the bot**:
```bash
node main.js
```

5. **Chat with Lolita in-game** (Spanish):
   - `"construye una casa bonita"` (build a nice house)
   - `"ven aquí"` (come here)
   - `"ataca ese zombie"` (attack that zombie)
   - `"sígueme"` (follow me)

---

## 🏗️ Advanced Building System

Lolita builds **architectural structures**, not boxes:

### Default Mindcraft Output:
```
┌─────────┐
│░░░░░░░░░│  ← 4 walls
│░░░░░░░░░│  ← Flat ceiling
│░░░░░░░░░│
└─────────┘
```

### This Version's Output:
```
      /\        ← Peaked roof (oak stairs)
     /  \
    /____\
   |🪟  🪟|     ← Glass windows
   |  🚪 |     ← Oak door
   |🪵  🪵|     ← Corner pillars
   ========     ← Cobblestone foundation
```

### Building Features:
- ✅ **10 Architecture Rules** enforced in AI prompt
- ✅ **Multiple materials**: oak_planks, cobblestone, glass_pane, oak_log, oak_stairs
- ✅ **Peaked roofs** with stairs in A-frame shape
- ✅ **Functional doors** (oak_door, spruce_door, etc.)
- ✅ **Glass windows** (minimum 2 per wall)
- ✅ **Structural pillars** at all 4 corners
- ✅ **Stone foundations** below walls
- ✅ **Interior decoration**: torches, crafting_table, furnace, bed
- ✅ **Minimum size**: 7×7×5 blocks (W×D×H)

---

## 🤖 Available Models (All FREE)

GitHub Models **Low Tier** = **150 requests/day**, **15 requests/minute**

| Model | Description | Use Case |
|-------|-------------|----------|
| `mistral-ai/mistral-medium-2505` | **⭐ Current** | Best for complex building code |
| `mistral-ai/mistral-small-2503` | Faster | Simple tasks |
| `cohere/cohere-command-a` | Good | Instruction following |
| `meta/meta-llama-3.1-8b-instruct` | Fast | Lightweight tasks |
| `microsoft/phi-4` | Code-focused | Programming |

**Change model** in `lolita.json`:
```json
{
  "model": "github/mistral-ai/mistral-medium-2505"
}
```

---

## 🎮 In-Game Commands

| Command | Example | Description |
|---------|---------|-------------|
| `!goToPlayer [name]` | `!goToPlayer Steve` | Follow a player |
| `!collectBlocks [type] [count]` | `!collectBlocks oak_log 10` | Mine blocks |
| `!craftRecipe [item] [count]` | `!craftRecipe iron_pickaxe 1` | Craft items |
| `!attack [mob]` | `!attack zombie` | Combat |
| `!newAction [description]` | `!newAction build a house` | Execute complex task |
| `!followPlayer [name]` | `!followPlayer Alex` | Follow continuously |
| `!stop` | `!stop` | Stop current action |

**Chat naturally** (Spanish):
- `"construye una casa bonita"` → Lolita builds a detailed house
- `"dame madera"` → Lolita gives you wood
- `"ataca ese creeper"` → Lolita attacks nearby creeper

---

## 📁 Project Structure

```
minecraft-llm-agent/
├── lolita.json                  # Bot profile (name, model, prompts)
├── keys.json                    # API keys (gitignored)
├── keys.example.json            # API keys template
├── settings.js                  # Server & game config
├── main.js                      # Entry point
├── docs/
│   └── DEMO.md                 # 🆕 Live gameplay examples
├── src/
│   ├── models/
│   │   ├── github.js           # 🆕 GitHub Models adapter (custom)
│   │   ├── gemini.js           # Google Gemini (backup)
│   │   ├── openrouter.js       # OpenRouter (backup)
│   │   ├── gpt.js              # OpenAI GPT
│   │   ├── ollama.js           # Local models
│   │   ├── qwen.js             # Alibaba Qwen
│   │   ├── prompter.js         # Prompt management
│   │   └── _model_map.js       # Auto-discovery system
│   ├── agent/
│   │   ├── agent.js            # Main agent logic
│   │   ├── coder.js            # Code gen with 10 building rules
│   │   ├── conversation.js     # Chat handling
│   │   └── library/
│   │       └── skills.js       # placeBlock, goTo, attack, etc.
│   └── mindcraft/
│       └── mindcraft.js        # Core framework
├── bots/Lolita/                # Bot runtime data & history
├── profiles/defaults/          # Base profiles (god_mode, etc.)
└── patches/                    # Mineflayer compatibility fixes
```

---

## 🔧 Customization

### Change Bot Name
`lolita.json`:
```json
{
  "name": "YourBotName"
}
```

### Change Language to English
`lolita.json`:
```json
{
  "conversing": "You are an AI bot named $NAME... You speak in English..."
}
```

### Adjust Response Speed
`lolita.json`:
```json
{
  "cooldown": 5000  // milliseconds between actions (default: 10000)
}
```

### Switch to Different GitHub Model
`lolita.json`:
```json
{
  "model": "github/cohere/cohere-command-a"  // or any Low-tier model
}
```

---

## 🐛 Troubleshooting

### ❌ "Error with embedding model"
**✅ Solution**: Ignore it - the bot uses word-overlap instead (works fine).

### ❌ "MC server not found"
**✅ Solution**: 
1. Minecraft world must be **Open to LAN**
2. Port in `settings.js` must match LAN port
3. Check Windows Firewall settings

### ❌ "Rate limited (429)"
**✅ Solution**: 
- Wait 60-180 seconds (automatic retry enabled)
- GitHub Models free tier: **15 RPM**, **150 RPD**

### ❌ "Unknown model: mistralai/mistral-small"
**✅ Solution**: Use correct format: `github/mistral-ai/mistral-medium-2505` (with dashes, not underscores)

### ❌ Bot builds simple boxes
**✅ Solution**: Make sure you're using the customized `lolita.json` with:
```json
{
  "coding": "...IMPORTANT BUILDING GUIDELINES...",
  "coding_examples": [ /* detailed house example */ ]
}
```

---

## 🆚 Comparison with Original Mindcraft

| Feature | Original Mindcraft | This Version |
|---------|-------------------|--------------|
| AI Provider | OpenAI, Gemini, Anthropic (paid) | **GitHub Models (FREE)** |
| Cost | $0.10+ per 1000 requests | **$0.00** (150/day) |
| Building Quality | Basic box structures | **Peaked roofs, windows, doors, interiors** |
| Prompts | Generic coding | **10-rule architecture system** |
| Examples | Simple tower | **Complete house with furniture** |
| Language | English | **Spanish** (configurable) |
| Code Security | `allow_insecure_coding=false` | **Enabled for god mode** |

---

## 🙏 Credits & Original Project

This project is a **customized fork** of the amazing **[Mindcraft](https://github.com/kolbytn/mindcraft)** by [@kolbytn](https://github.com/kolbytn) and the Mindcraft development team.

**Original Mindcraft**:
- 📄 [Paper: "Collaborating Action by Action"](https://arxiv.org/abs/2504.17950)
- 🎥 [Video Tutorial](https://www.youtube.com/watch?v=gRotoL8P8D8)
- 💬 [Discord Community](https://discord.gg/mp73p35dzC)
- 📚 [Original FAQ](https://github.com/mindcraft-bots/mindcraft/blob/main/FAQ.md)

**Development Team**: [@MaxRobinsonTheGreat](https://github.com/MaxRobinsonTheGreat), [@kolbytn](https://github.com/kolbytn), [@icwhite](https://github.com/icwhite), [@Sweaterdog](https://github.com/Sweaterdog), [@Ninot1Quyi](https://github.com/Ninot1Quyi), [@riqvip](https://github.com/riqvip), [@uukelele-scratch](https://github.com/uukelele-scratch), [@mrelmida](https://github.com/mrelmida)

**Technologies**:
- [Mineflayer](https://github.com/PrismarineJS/mineflayer) - Minecraft bot framework
- [GitHub Models](https://github.com/marketplace/models) - Free AI inference API
- [Mistral AI](https://mistral.ai/) - Language models

---

## ⚠️ Security Warning

> [!CAUTION]
> This bot executes LLM-generated code on your computer. It's sandboxed but still vulnerable to injection attacks. **Do NOT** connect to public servers with `allow_insecure_coding: true`. Use at your own risk.

---

## 📝 License

Based on Mindcraft - check their [LICENSE](LICENSE) for details.

---

## 📧 Contact

**Customization by**: [@cmhh22](https://github.com/cmhh22)

**Original Project**: [Mindcraft](https://github.com/kolbytn/mindcraft)

---

## Citation

If you use this project in your research, please cite the original Mindcraft paper:

```bibtex
@article{mindcraft2025,
  title = {Collaborating Action by Action: A Multi-agent LLM Framework for Embodied Reasoning},
  author = {White*, Isadora and Nottingham*, Kolby and Maniar, Ayush and Robinson, Max and Lillemark, Hansen and Maheshwari, Mehul and Qin, Lianhui and Ammanabrolu, Prithviraj},
  journal = {arXiv preprint arXiv:2504.17950},
  year = {2025},
  url = {https://arxiv.org/abs/2504.17950},
}
```

---

⭐ **Star this repo** if you find it useful!

🐛 **Issues?** Check [Troubleshooting](#-troubleshooting) or open an issue.

🤝 **Contributions welcome!** Areas: more building templates, additional languages, vision enhancements.
