// Game Engine for MA Driver's Ed Quiz
class QuizGame {
    constructor() {
        this.questions = [];
        this.currentQuestion = null;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.streak = 0;
        this.bestStreak = 0;
        this.questionsAnswered = 0;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.gameMode = 'practice'; // practice, test, survival
        this.lives = 3;
        this.timer = null;
        this.timeRemaining = 0;
        this.isPaused = false;
        this.categoryStats = {};
        this.usedQuestions = new Set();
        this.achievements = [];

        this.loadProgress();
    }

    async loadQuestions() {
        try {
            const response = await fetch('data/questions.json');
            const data = await response.json();
            this.questions = data.questions;
            this.initializeCategoryStats();
            return true;
        } catch (error) {
            console.error('Error loading questions:', error);
            return false;
        }
    }

    initializeCategoryStats() {
        const categories = [...new Set(this.questions.map(q => q.category))];
        categories.forEach(category => {
            if (!this.categoryStats[category]) {
                this.categoryStats[category] = {
                    total: 0,
                    correct: 0,
                    accuracy: 0
                };
            }
        });
    }

    startGame(mode = 'practice', category = 'all') {
        this.gameMode = mode;
        this.score = 0;
        this.streak = 0;
        this.questionsAnswered = 0;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.currentQuestionIndex = 0;
        this.usedQuestions.clear();

        // Filter questions by category
        let questionPool = category === 'all'
            ? [...this.questions]
            : this.questions.filter(q => q.category === category);

        // Shuffle questions
        this.shuffleArray(questionPool);

        // Set mode-specific settings
        if (mode === 'practice') {
            this.lives = Infinity;
            this.timeRemaining = 0;
        } else if (mode === 'test') {
            this.lives = Infinity;
            // MA RMV test has 25 questions with 25 minutes
            questionPool = questionPool.slice(0, 25);
            this.timeRemaining = 25 * 60; // 25 minutes in seconds
            this.startTimer();
        } else if (mode === 'survival') {
            this.lives = 3;
            this.timeRemaining = 0;
        }

        this.questions = questionPool;
        this.loadNextQuestion();
    }

    loadNextQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            this.endGame();
            return;
        }

        this.currentQuestion = this.questions[this.currentQuestionIndex];
        this.usedQuestions.add(this.currentQuestion.id);
    }

    submitAnswer(answerIndex) {
        if (!this.currentQuestion || this.isPaused) return;

        const isCorrect = answerIndex === this.currentQuestion.correctAnswer;
        this.questionsAnswered++;

        // Update category stats
        const category = this.currentQuestion.category;
        this.categoryStats[category].total++;

        if (isCorrect) {
            this.correctAnswers++;
            this.streak++;
            this.categoryStats[category].correct++;

            // Calculate points based on difficulty and streak
            let points = this.calculatePoints(this.currentQuestion.difficulty);
            if (this.streak >= 3) points *= 1.5;
            if (this.streak >= 5) points *= 2;
            this.score += Math.floor(points);

            if (this.streak > this.bestStreak) {
                this.bestStreak = this.streak;
            }

            // Check for achievements
            this.checkAchievements();
        } else {
            this.wrongAnswers++;
            this.streak = 0;

            if (this.gameMode === 'survival') {
                this.lives--;
                if (this.lives <= 0) {
                    this.endGame();
                    return;
                }
            }
        }

        // Update category accuracy
        this.categoryStats[category].accuracy =
            (this.categoryStats[category].correct / this.categoryStats[category].total) * 100;

        return {
            isCorrect,
            correctAnswer: this.currentQuestion.correctAnswer,
            explanation: this.currentQuestion.explanation
        };
    }

    calculatePoints(difficulty) {
        const basePoints = {
            'easy': 10,
            'medium': 15,
            'hard': 25
        };
        return basePoints[difficulty] || 10;
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        this.loadNextQuestion();
    }

    startTimer() {
        if (this.timer) clearInterval(this.timer);

        this.timer = setInterval(() => {
            if (!this.isPaused && this.timeRemaining > 0) {
                this.timeRemaining--;

                if (this.timeRemaining <= 0) {
                    this.endGame();
                }
            }
        }, 1000);
    }

    pauseGame() {
        this.isPaused = true;
    }

    resumeGame() {
        this.isPaused = false;
    }

    endGame() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        const accuracy = this.questionsAnswered > 0
            ? (this.correctAnswers / this.questionsAnswered) * 100
            : 0;

        const passed = this.gameMode === 'test'
            ? (accuracy >= 72 && this.questionsAnswered >= 18) // MA requires 72% (18/25)
            : true;

        this.saveProgress();

        return {
            score: this.score,
            questionsAnswered: this.questionsAnswered,
            correctAnswers: this.correctAnswers,
            wrongAnswers: this.wrongAnswers,
            accuracy: accuracy.toFixed(1),
            bestStreak: this.bestStreak,
            passed: passed,
            categoryStats: this.categoryStats,
            achievements: this.achievements
        };
    }

    checkAchievements() {
        const newAchievements = [];

        // First question correct
        if (this.questionsAnswered === 1 && this.correctAnswers === 1) {
            newAchievements.push('First Blood!');
        }

        // Streak achievements
        if (this.streak === 5 && !this.achievements.includes('Hot Streak')) {
            newAchievements.push('Hot Streak');
            this.achievements.push('Hot Streak');
        }
        if (this.streak === 10 && !this.achievements.includes('On Fire!')) {
            newAchievements.push('On Fire!');
            this.achievements.push('On Fire!');
        }

        // Perfect score in test mode
        if (this.gameMode === 'test' && this.questionsAnswered === 25 && this.wrongAnswers === 0) {
            if (!this.achievements.includes('Perfect Driver')) {
                newAchievements.push('Perfect Driver');
                this.achievements.push('Perfect Driver');
            }
        }

        // Survival achievements
        if (this.gameMode === 'survival' && this.questionsAnswered === 20) {
            if (!this.achievements.includes('Survivor')) {
                newAchievements.push('Survivor');
                this.achievements.push('Survivor');
            }
        }

        return newAchievements;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    saveProgress() {
        const progress = {
            totalGamesPlayed: this.getTotalGamesPlayed() + 1,
            highScore: Math.max(this.score, this.getHighScore()),
            bestStreak: Math.max(this.bestStreak, this.getBestStreak()),
            categoryStats: this.categoryStats,
            achievements: this.achievements
        };
        localStorage.setItem('driverEdProgress', JSON.stringify(progress));
    }

    loadProgress() {
        const saved = localStorage.getItem('driverEdProgress');
        if (saved) {
            const progress = JSON.parse(saved);
            this.achievements = progress.achievements || [];
            if (progress.categoryStats) {
                this.categoryStats = progress.categoryStats;
            }
        }
    }

    getTotalGamesPlayed() {
        const saved = localStorage.getItem('driverEdProgress');
        return saved ? JSON.parse(saved).totalGamesPlayed || 0 : 0;
    }

    getHighScore() {
        const saved = localStorage.getItem('driverEdProgress');
        return saved ? JSON.parse(saved).highScore || 0 : 0;
    }

    getBestStreak() {
        const saved = localStorage.getItem('driverEdProgress');
        return saved ? JSON.parse(saved).bestStreak || 0 : 0;
    }

    resetProgress() {
        localStorage.removeItem('driverEdProgress');
        this.achievements = [];
        this.categoryStats = {};
        this.initializeCategoryStats();
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
}

// Export for use in main app
window.QuizGame = QuizGame;
