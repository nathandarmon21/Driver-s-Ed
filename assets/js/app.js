// Main Application Controller
class DriverEdApp {
    constructor() {
        this.game = new QuizGame();
        this.currentScreen = 'menu';
        this.selectedAnswer = null;
        this.init();
    }

    async init() {
        // Load questions
        const loaded = await this.game.loadQuestions();
        if (!loaded) {
            this.showError('Failed to load questions. Please refresh the page.');
            return;
        }

        // Set up event listeners
        this.setupEventListeners();

        // Show main menu
        this.showScreen('menu');
        this.updateStats();
    }

    setupEventListeners() {
        // Mode selection buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.target.dataset.mode;
                if (mode === 'practice') {
                    this.showCategorySelection();
                } else {
                    this.startGame(mode, 'all');
                }
            });
        });

        // Category selection
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.startGame('practice', category);
            });
        });

        // Answer buttons
        document.querySelectorAll('.answer-btn').forEach((btn, index) => {
            btn.addEventListener('click', () => {
                if (this.selectedAnswer === null) {
                    this.selectAnswer(index);
                }
            });
        });

        // Next question button
        document.getElementById('nextBtn')?.addEventListener('click', () => {
            this.nextQuestion();
        });

        // Navigation buttons
        document.getElementById('backToMenu')?.addEventListener('click', () => {
            this.showScreen('menu');
        });

        document.getElementById('playAgain')?.addEventListener('click', () => {
            this.showScreen('menu');
        });

        document.getElementById('quitGame')?.addEventListener('click', () => {
            if (confirm('Are you sure you want to quit? Your progress will not be saved.')) {
                this.showScreen('menu');
            }
        });

        // Stats and achievements
        document.getElementById('viewStats')?.addEventListener('click', () => {
            this.showStats();
        });

        document.getElementById('resetProgress')?.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
                this.game.resetProgress();
                this.updateStats();
                alert('Progress reset successfully!');
            }
        });
    }

    showScreen(screenName) {
        this.currentScreen = screenName;

        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show requested screen
        const screen = document.getElementById(`${screenName}Screen`);
        if (screen) {
            screen.classList.add('active');
        }
    }

    showCategorySelection() {
        this.showScreen('category');
    }

    startGame(mode, category) {
        this.game.startGame(mode, category);
        this.showScreen('game');
        this.updateGameUI();
        this.displayQuestion();
    }

    displayQuestion() {
        const question = this.game.currentQuestion;
        if (!question) return;

        this.selectedAnswer = null;

        // Update progress
        const progress = ((this.game.currentQuestionIndex + 1) / this.game.questions.length) * 100;
        document.getElementById('progressBar').style.width = `${progress}%`;
        document.getElementById('questionNumber').textContent =
            `Question ${this.game.currentQuestionIndex + 1} of ${this.game.questions.length}`;

        // Update question
        document.getElementById('questionText').textContent = question.question;
        document.getElementById('categoryBadge').textContent = question.category;
        document.getElementById('difficultyBadge').textContent = question.difficulty;
        document.getElementById('difficultyBadge').className = `badge difficulty-${question.difficulty}`;

        // Update answers
        const answerButtons = document.querySelectorAll('.answer-btn');
        question.options.forEach((option, index) => {
            answerButtons[index].textContent = option;
            answerButtons[index].className = 'answer-btn';
            answerButtons[index].disabled = false;
        });

        // Hide next button and explanation
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('explanation').style.display = 'none';

        // Add animation
        document.querySelector('.question-card').classList.add('fade-in');
        setTimeout(() => {
            document.querySelector('.question-card').classList.remove('fade-in');
        }, 500);
    }

    selectAnswer(answerIndex) {
        this.selectedAnswer = answerIndex;

        const result = this.game.submitAnswer(answerIndex);
        const answerButtons = document.querySelectorAll('.answer-btn');

        // Disable all buttons
        answerButtons.forEach(btn => btn.disabled = true);

        // Show correct/incorrect
        answerButtons[answerIndex].classList.add(result.isCorrect ? 'correct' : 'incorrect');
        if (!result.isCorrect) {
            answerButtons[result.correctAnswer].classList.add('correct');
        }

        // Show explanation
        const explanationDiv = document.getElementById('explanation');
        explanationDiv.innerHTML = `
            <div class="explanation-header ${result.isCorrect ? 'correct' : 'incorrect'}">
                ${result.isCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </div>
            <p>${result.explanation}</p>
        `;
        explanationDiv.style.display = 'block';

        // Show next button
        document.getElementById('nextBtn').style.display = 'block';

        // Update score and stats
        this.updateGameUI();

        // Show achievement if any
        const achievements = this.game.checkAchievements();
        if (achievements.length > 0) {
            this.showAchievement(achievements[0]);
        }

        // Animate result
        this.animateResult(result.isCorrect);
    }

    nextQuestion() {
        this.game.nextQuestion();

        if (this.game.currentQuestion) {
            this.displayQuestion();
        } else {
            this.showResults();
        }
    }

    updateGameUI() {
        // Update score
        document.getElementById('currentScore').textContent = this.game.score;

        // Update streak
        const streakEl = document.getElementById('currentStreak');
        streakEl.textContent = this.game.streak;
        if (this.game.streak >= 5) {
            streakEl.classList.add('fire');
        } else {
            streakEl.classList.remove('fire');
        }

        // Update accuracy
        const accuracy = this.game.questionsAnswered > 0
            ? ((this.game.correctAnswers / this.game.questionsAnswered) * 100).toFixed(1)
            : 0;
        document.getElementById('currentAccuracy').textContent = `${accuracy}%`;

        // Update lives (survival mode)
        if (this.game.gameMode === 'survival') {
            document.getElementById('livesDisplay').style.display = 'block';
            const livesContainer = document.getElementById('livesCount');
            livesContainer.innerHTML = '❤️'.repeat(this.game.lives) + '🖤'.repeat(3 - this.game.lives);
        } else {
            document.getElementById('livesDisplay').style.display = 'none';
        }

        // Update timer (test mode)
        if (this.game.gameMode === 'test' && this.game.timeRemaining > 0) {
            document.getElementById('timerDisplay').style.display = 'block';
            document.getElementById('timeRemaining').textContent = this.game.formatTime(this.game.timeRemaining);

            // Warning for low time
            if (this.game.timeRemaining <= 60) {
                document.getElementById('timerDisplay').classList.add('warning');
            }
        } else {
            document.getElementById('timerDisplay').style.display = 'none';
        }
    }

    showResults() {
        const results = this.game.endGame();

        this.showScreen('results');

        // Update results display
        document.getElementById('finalScore').textContent = results.score;
        document.getElementById('totalQuestions').textContent = results.questionsAnswered;
        document.getElementById('correctCount').textContent = results.correctAnswers;
        document.getElementById('wrongCount').textContent = results.wrongAnswers;
        document.getElementById('finalAccuracy').textContent = `${results.accuracy}%`;
        document.getElementById('finalStreak').textContent = results.bestStreak;

        // Pass/Fail for test mode
        const passFailDiv = document.getElementById('passFailStatus');
        if (this.game.gameMode === 'test') {
            passFailDiv.style.display = 'block';
            passFailDiv.className = results.passed ? 'pass' : 'fail';
            passFailDiv.textContent = results.passed
                ? '✓ PASSED! You\'re ready for the real test!'
                : '✗ Not quite there. Keep practicing!';
        } else {
            passFailDiv.style.display = 'none';
        }

        // Category breakdown
        this.displayCategoryBreakdown(results.categoryStats);

        // Performance message
        this.displayPerformanceMessage(results.accuracy);
    }

    displayCategoryBreakdown(categoryStats) {
        const container = document.getElementById('categoryBreakdown');
        container.innerHTML = '<h3>Performance by Category</h3>';

        Object.entries(categoryStats).forEach(([category, stats]) => {
            if (stats.total > 0) {
                const accuracy = stats.accuracy.toFixed(1);
                const barColor = accuracy >= 80 ? '#4CAF50' : accuracy >= 60 ? '#FFC107' : '#f44336';

                const categoryHTML = `
                    <div class="category-stat">
                        <div class="category-name">${category}</div>
                        <div class="category-bar-container">
                            <div class="category-bar" style="width: ${accuracy}%; background-color: ${barColor}"></div>
                        </div>
                        <div class="category-score">${stats.correct}/${stats.total} (${accuracy}%)</div>
                    </div>
                `;
                container.innerHTML += categoryHTML;
            }
        });
    }

    displayPerformanceMessage(accuracy) {
        const messageEl = document.getElementById('performanceMessage');
        let message = '';

        if (accuracy >= 90) {
            message = '🌟 Outstanding! You really know your stuff!';
        } else if (accuracy >= 80) {
            message = '👍 Great job! You\'re well prepared!';
        } else if (accuracy >= 70) {
            message = '👌 Good work! A bit more practice and you\'ll ace it!';
        } else if (accuracy >= 60) {
            message = '📚 Keep studying! You\'re making progress!';
        } else {
            message = '💪 Don\'t give up! Practice makes perfect!';
        }

        messageEl.textContent = message;
    }

    animateResult(isCorrect) {
        const overlay = document.createElement('div');
        overlay.className = `result-overlay ${isCorrect ? 'correct-overlay' : 'incorrect-overlay'}`;
        overlay.textContent = isCorrect ? '✓' : '✗';
        document.body.appendChild(overlay);

        setTimeout(() => {
            overlay.remove();
        }, 800);
    }

    showAchievement(achievement) {
        const achievementEl = document.createElement('div');
        achievementEl.className = 'achievement-popup';
        achievementEl.innerHTML = `
            <div class="achievement-icon">🏆</div>
            <div class="achievement-text">
                <div class="achievement-title">Achievement Unlocked!</div>
                <div class="achievement-name">${achievement}</div>
            </div>
        `;
        document.body.appendChild(achievementEl);

        setTimeout(() => {
            achievementEl.classList.add('show');
        }, 100);

        setTimeout(() => {
            achievementEl.classList.remove('show');
            setTimeout(() => achievementEl.remove(), 300);
        }, 3000);
    }

    updateStats() {
        document.getElementById('gamesPlayed').textContent = this.game.getTotalGamesPlayed();
        document.getElementById('highScore').textContent = this.game.getHighScore();
        document.getElementById('bestStreak').textContent = this.game.getBestStreak();
    }

    showStats() {
        this.updateStats();
        alert('Full stats view - check the menu screen for your current stats!');
    }

    showError(message) {
        alert(`Error: ${message}`);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new DriverEdApp();
});
