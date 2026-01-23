# 🚗 Massachusetts Driver's Ed Quiz Game

An interactive, video-game-style quiz application to help you ace the Massachusetts Learner's Permit Test!

## 🎮 Features

- **3 Game Modes:**
  - 🟢 **Practice Mode** - Learn at your own pace with unlimited questions
  - 🟠 **Test Mode** - Simulate the real MA RMV test (25 questions, 25 minutes)
  - 🔴 **Survival Mode** - See how long you can last with only 3 lives!

- **80+ Real Questions** covering all Massachusetts test topics:
  - Traffic Signs
  - Traffic Laws & Rules
  - Road Markings & Signals
  - Safe Driving Practices
  - Vehicle Operation

- **Engaging Features:**
  - Real-time scoring and streak tracking
  - Instant feedback with detailed explanations
  - Achievement system
  - Progress tracking and statistics
  - Category-specific practice
  - Beautiful animations and visual effects
  - Mobile-responsive design

## 🚀 How to Run

### Option 1: Double-Click (Easiest!)
1. Simply open `index.html` in your web browser (Chrome, Firefox, Safari, or Edge)
2. That's it! Start playing!

### Option 2: Local Server (Recommended)
If you encounter any issues with loading data, run a local server:

**Using Python 3:**
```bash
python3 -m http.server 8000
```

**Using Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Using Node.js (with npx):**
```bash
npx serve
```

Then open your browser and go to:
- `http://localhost:8000` (Python)
- `http://localhost:3000` (npx serve)

## 📖 How to Play

### Main Menu
1. Choose your game mode
2. View your stats and achievements
3. Track your progress over time

### Practice Mode
- Select a specific category or practice all topics
- No time limits or lives
- Perfect for learning and building confidence

### Test Mode
- Simulates the actual MA RMV permit test
- 25 random questions
- 25-minute time limit
- Need 72% (18/25) to pass
- Great for final preparation!

### Survival Mode
- Start with 3 lives (hearts)
- One wrong answer = lose a life
- Game over when you run out of lives
- Challenge yourself to beat your high score!

### During the Quiz
- Read each question carefully
- Click your answer choice
- Get instant feedback (correct ✓ or incorrect ✗)
- Read the explanation to understand why
- Click "Next Question" to continue
- Watch your score, streak, and accuracy!

## 📊 Scoring System

- **Easy Questions:** 10 points
- **Medium Questions:** 15 points
- **Hard Questions:** 25 points
- **Streak Bonuses:**
  - 3+ streak: 1.5x points
  - 5+ streak: 2x points

## 🏆 Achievements

Unlock achievements as you play:
- **First Blood** - Answer your first question correctly
- **Hot Streak** - Get 5 correct answers in a row
- **On Fire!** - Get 10 correct answers in a row
- **Perfect Driver** - Score 100% on Test Mode
- **Survivor** - Answer 20 questions in Survival Mode

## 💾 Progress Tracking

Your progress is automatically saved in your browser:
- Total games played
- High score
- Best streak
- Category performance statistics
- Unlocked achievements

## 📱 Mobile Friendly

The game works great on:
- 📱 Smartphones (iPhone, Android)
- 📱 Tablets (iPad, etc.)
- 💻 Desktops and Laptops
- All modern web browsers

## 🎯 Study Tips

1. **Start with Practice Mode** - Get familiar with all question types
2. **Focus on Weak Areas** - Use category-specific practice
3. **Read Explanations** - Understanding is more important than memorizing
4. **Take Test Mode** - Simulate real test conditions before your exam
5. **Aim for 80%+** - The real test requires 72%, but aiming higher ensures success

## 📚 Based on Official MA RMV Material

All questions are based on the official Massachusetts Registry of Motor Vehicles (RMV) Driver's Manual. For additional study, visit:
- [MA RMV Driver's Manual](https://www.mass.gov/info-details/drivers-manual)

## 🛠️ Technical Details

- **No Installation Required** - Runs entirely in your web browser
- **No Internet Required** - Works offline once loaded
- **No Account Needed** - Progress saved locally
- **Privacy Friendly** - No data collection or tracking

## 🐛 Troubleshooting

**Questions not loading?**
- Make sure you're running from a local server (see "How to Run" above)
- Check that the `data/questions.json` file exists
- Try a different browser

**Progress not saving?**
- Make sure browser cookies/localStorage are enabled
- Don't use private/incognito mode if you want progress saved

**Display issues?**
- Try refreshing the page (F5)
- Clear your browser cache
- Update your browser to the latest version

## 📝 License

Created for educational purposes. Study hard and drive safe! 🚗💨

## 🙏 Good Luck!

You've got this! With practice and dedication, you'll ace that permit test. Safe driving starts with knowledge! 🎓🚦
