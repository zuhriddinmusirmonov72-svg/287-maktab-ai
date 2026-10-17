# 🤖 UZ AI HUB

**Professional Telegram AI Assistant** for Uzbekistan - Your multilingual AI companion for learning, coding, translation, writing, and everyday questions.

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

- 🌍 **Multilingual Support**: Uzbek, Russian, and English
- 🤖 **Multiple AI Modes**:
  - General Assistant
  - Study Assistant (educational support)
  - Coding Assistant (programming help)
  - Translation (multi-language)
  - Writing Assistant
  - Creative Ideas Generator
- 💬 **Conversation History**: Maintains context across messages
- 📊 **Usage Tracking**: Daily limits and statistics
- 👨‍💼 **Admin Panel**: Statistics, announcements, and monitoring
- ⚡ **Rate Limiting**: Prevents abuse with cooldowns
- 🔒 **Secure**: Environment-based configuration, no hardcoded secrets
- 📱 **Professional Interface**: Inline keyboards and intuitive navigation

## 📋 Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** (comes with Node.js)
- **Telegram Bot Token** (from [@BotFather](https://t.me/BotFather))
- **OpenRouter API Key** (from [OpenRouter](https://openrouter.ai/))

## 🚀 Quick Start (Windows)

### 1. Install Node.js

Download and install Node.js LTS from [nodejs.org](https://nodejs.org/)

Verify installation:
```powershell
node --version
npm --version
```

### 2. Download or Clone the Project

```powershell
cd D:\Projects
git clone <your-repo-url> uz-ai-hub
cd uz-ai-hub
```

Or download and extract the ZIP file to your desired location.

### 3. Install Dependencies

```powershell
npm install
```

### 4. Create Telegram Bot

1. Open Telegram and search for [@BotFather](https://t.me/BotFather)
2. Send `/newbot` command
3. Follow the prompts to set a name and username
4. **Copy the bot token** (looks like `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`)

### 5. Get OpenRouter API Key

1. Visit [OpenRouter](https://openrouter.ai/)
2. Create a free account
3. Go to [Keys](https://openrouter.ai/keys) section
4. Create a new API key
5. **Copy the API key** (starts with `sk-`)

### 6. Configure Environment

Copy the example environment file:
```powershell
copy .env.example .env
```

Edit `.env` file with your favorite text editor (Notepad, VS Code, etc.):

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
OPENROUTER_API_KEY=your_openrouter_key_here
OPENROUTER_MODEL=openrouter/free
ADMIN_IDS=your_telegram_user_id
DATABASE_PATH=./data/uz-ai-hub.db
DAILY_USER_LIMIT=30
USER_COOLDOWN_SECONDS=2
AI_TIMEOUT_MS=60000
MAX_HISTORY_MESSAGES=12
MAX_INPUT_LENGTH=6000
TIMEZONE=Asia/Tashkent
NODE_ENV=development
```

**How to find your Telegram User ID:**
- Send a message to [@userinfobot](https://t.me/userinfobot)
- It will reply with your ID

### 7. Run the Bot

```powershell
npm start
```

You should see:
```
✅ Bot is running as @your_bot_username
📊 Environment: development
🤖 AI Model: openrouter/free
👥 Admins: 1

Press Ctrl+C to stop
```

### 8. Test Your Bot

1. Open Telegram
2. Search for your bot username
3. Send `/start` command
4. Try asking a question!

## 📝 Available Commands

### User Commands

- `/start` - Welcome message and main menu
- `/menu` - Show main menu
- `/help` - Show help and instructions
- `/newchat` - Start a fresh conversation
- `/clear` - Clear conversation history
- `/profile` - View your usage statistics
- `/settings` - Change preferences
- `/language` - Change interface language
- `/cancel` - Cancel current operation

### Admin Commands

- `/admin` - Open administrator panel

## 🎮 Usage

### Basic Chat

Simply send any message to the bot, and it will respond using AI:

```
You: What is the capital of Uzbekistan?
Bot: The capital of Uzbekistan is Tashkent...
```

### Modes

Select different AI modes from the menu:

- **🤖 AI Chat**: General conversation
- **📚 Study Assistant**: Educational help with step-by-step explanations
- **💻 Coding Assistant**: Programming help and code review
- **🌐 Translation**: Multi-language translation
- **✍️ Writing Assistant**: Help with writing tasks
- **🧠 Creative Ideas**: Brainstorming and creative thinking

### Settings

- **Language**: Change interface language (Uzbek/Russian/English)
- **Response Style**: Concise or Detailed responses
- **Clear History**: Reset conversation context

## 🏗️ Project Structure

```
uz-ai-hub/
├── src/
│   ├── index.js              # Entry point
│   ├── bot.js                # Bot initialization and setup
│   ├── config.js             # Configuration management
│   ├── database.js           # SQLite database manager
│   ├── logger.js             # Logging utility
│   ├── handlers/             # Command and message handlers
│   │   ├── start.js
│   │   ├── chat.js
│   │   ├── commands.js
│   │   ├── settings.js
│   │   ├── profile.js
│   │   ├── admin.js
│   │   └── callbacks.js
│   ├── services/             # Business logic
│   │   ├── ai.js             # AI integration
│   │   ├── conversation.js   # Conversation management
│   │   └── usage.js          # Usage tracking
│   ├── keyboards/            # Telegram inline keyboards
│   │   ├── mainMenu.js
│   │   ├── settingsMenu.js
│   │   └── adminMenu.js
│   ├── middleware/           # Bot middleware
│   │   ├── errorHandler.js
│   │   ├── userTracking.js
│   │   └── rateLimit.js
│   └── utils/                # Utilities
│       ├── formatting.js
│       └── language.js       # Translations
├── tests/                    # Test files
├── data/                     # Database storage
├── .env                      # Environment config (not in git)
├── .env.example              # Example environment
├── package.json
└── README.md
```

## 🧪 Testing

Run automated tests:

```powershell
npm test
```

## 🔧 Configuration

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `TELEGRAM_BOT_TOKEN` | ✅ | - | Telegram bot token from BotFather |
| `OPENROUTER_API_KEY` | ✅ | - | OpenRouter API key |
| `OPENROUTER_MODEL` | ✅ | `openrouter/free` | AI model identifier |
| `ADMIN_IDS` | ✅ | - | Comma-separated Telegram user IDs |
| `DATABASE_PATH` | ❌ | `./data/uz-ai-hub.db` | SQLite database file path |
| `DAILY_USER_LIMIT` | ❌ | `30` | Max requests per user per day |
| `USER_COOLDOWN_SECONDS` | ❌ | `2` | Cooldown between requests |
| `AI_TIMEOUT_MS` | ❌ | `60000` | AI request timeout |
| `MAX_HISTORY_MESSAGES` | ❌ | `12` | Conversation context size |
| `MAX_INPUT_LENGTH` | ❌ | `6000` | Maximum input length |
| `TIMEZONE` | ❌ | `Asia/Tashkent` | Timezone for daily resets |
| `NODE_ENV` | ❌ | `development` | Environment mode |

### AI Models

The bot supports various OpenRouter models. The default `openrouter/free` uses available free models, but note:

- **Free tier limitations exist** - Check [OpenRouter pricing](https://openrouter.ai/docs#limits)
- You can specify other models like:
  - `meta-llama/llama-3.1-8b-instruct:free`
  - `google/gemma-2-9b-it:free`
  - Or any paid model with your API credits

## 🌐 Deployment

### Option 1: Render.com (Recommended)

1. Create account at [Render.com](https://render.com/)
2. Create a new **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. Add environment variables from your `.env` file
6. Deploy!

**Important Notes:**
- Free tier may sleep after inactivity (use paid plans for 24/7)
- Free tier has limited resources
- Database will be in-memory unless using persistent storage

### Option 2: Local Server (24/7)

Keep running on your computer:

```powershell
npm start
```

To run in background (using PM2):

```powershell
npm install -g pm2
pm2 start src/index.js --name uz-ai-hub
pm2 save
pm2 startup
```

### Option 3: VPS (DigitalOcean, AWS, etc.)

1. Rent a VPS with Node.js support
2. Upload project files
3. Install dependencies: `npm install`
4. Setup `.env` file
5. Use PM2 for process management
6. Configure firewall (bot uses long polling, no ports needed)

## 🔒 Security

### Best Practices

✅ **DO:**
- Keep `.env` file secure and never commit it
- Use strong API keys
- Regularly update dependencies
- Monitor bot usage
- Set reasonable rate limits
- Review admin announcements before sending

❌ **DON'T:**
- Share your bot token publicly
- Commit API keys to version control
- Allow unlimited requests
- Store sensitive user data unnecessarily

### Data Privacy

The bot stores:
- Telegram user IDs (for identification)
- Conversation history (for context)
- Usage statistics (for limits)
- User preferences (language, mode)

The bot does NOT store:
- Phone numbers
- Email addresses
- Passwords
- Private messages permanently (can be cleared)

## 🐛 Troubleshooting

### Bot doesn't start

```
Error: Configuration errors
```

**Solution**: Check your `.env` file has all required variables set correctly.

### AI not responding

```
AI service is temporarily unavailable
```

**Solutions**:
- Check your OpenRouter API key is valid
- Verify you haven't exceeded API limits
- Check your internet connection
- Try a different model

### Database errors

```
Error: Failed to initialize database
```

**Solution**: 
- Ensure `data/` directory exists
- Check write permissions
- Delete `data/*.db` files and restart (clears all data!)

### Rate limit errors

```
Too many requests. Please wait X seconds.
```

**Solution**: This is normal rate limiting. Wait or adjust `USER_COOLDOWN_SECONDS` in `.env`.

### Commands stopped working

**Solution**:
- Restart the bot: Stop (Ctrl+C) and run `npm start` again
- Clear pending updates if bot was offline
- Check logs for specific errors

## 📊 Monitoring

### View Logs

Logs are output to console with timestamps:

```
[2024-01-15T10:30:45.123Z] [INFO] Bot started successfully
[2024-01-15T10:31:12.456Z] [INFO] New user registered
```

### Admin Statistics

Use `/admin` command to access:
- Total users
- Active users today
- Request count
- Success rate
- System health

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 🆘 Support

### Common Issues

- **Free tier limitations**: OpenRouter free tier has limits. Consider paid plans for heavy usage.
- **Sleeping on free hosting**: Use paid hosting or keep-alive services.
- **Database persistence**: Free hosting may lose data on restart.

### Getting Help

1. Check this README
2. Review error messages carefully
3. Check [Telegraf docs](https://telegraf.js.org/)
4. Check [OpenRouter docs](https://openrouter.ai/docs)

## 🎯 Roadmap

Future improvements:
- [ ] Voice message support
- [ ] Image generation
- [ ] Document analysis
- [ ] Multi-user group chat support
- [ ] Webhook support for better scaling
- [ ] PostgreSQL option for production
- [ ] Docker containerization
- [ ] Conversation export
- [ ] Custom AI model training

## 👏 Acknowledgments

- [Telegraf](https://telegraf.js.org/) - Telegram Bot Framework
- [OpenRouter](https://openrouter.ai/) - Unified AI API
- [Better-SQLite3](https://github.com/WiseLibs/better-sqlite3) - Fast SQLite driver

---

**Made with ❤️ for Uzbekistan**

Start building intelligent conversations today! 🚀
