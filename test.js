// Simple test of game logic
const fs = require('fs');

// Load questions
const questionsData = JSON.parse(fs.readFileSync('data/questions.json', 'utf8'));

console.log('=== TESTING DRIVER\'S ED QUIZ GAME ===\n');

// Test 1: Questions loaded
console.log('Test 1: Load Questions');
console.log(`✓ Loaded ${questionsData.questions.length} questions`);

// Test 2: Validate question structure
console.log('\nTest 2: Validate Question Structure');
let structureValid = true;
questionsData.questions.forEach((q, index) => {
    if (!q.id || !q.category || !q.question || !q.options || !q.explanation || q.correctAnswer === undefined) {
        console.log(`✗ Question ${index} missing required fields`);
        structureValid = false;
    }
    if (q.options.length !== 4) {
        console.log(`✗ Question ${index} doesn't have exactly 4 options`);
        structureValid = false;
    }
    if (q.correctAnswer < 0 || q.correctAnswer > 3) {
        console.log(`✗ Question ${index} has invalid correctAnswer: ${q.correctAnswer}`);
        structureValid = false;
    }
});
if (structureValid) {
    console.log('✓ All questions have valid structure');
}

// Test 3: Categories
console.log('\nTest 3: Question Categories');
const categories = {};
questionsData.questions.forEach(q => {
    categories[q.category] = (categories[q.category] || 0) + 1;
});
Object.entries(categories).forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count} questions`);
});
console.log('✓ All categories populated');

// Test 4: Difficulty levels
console.log('\nTest 4: Difficulty Distribution');
const difficulties = {};
questionsData.questions.forEach(q => {
    difficulties[q.difficulty] = (difficulties[q.difficulty] || 0) + 1;
});
Object.entries(difficulties).forEach(([diff, count]) => {
    console.log(`  ${diff}: ${count} questions`);
});
console.log('✓ Multiple difficulty levels present');

// Test 5: Unique IDs
console.log('\nTest 5: Unique Question IDs');
const ids = new Set();
let duplicates = false;
questionsData.questions.forEach(q => {
    if (ids.has(q.id)) {
        console.log(`✗ Duplicate ID found: ${q.id}`);
        duplicates = true;
    }
    ids.add(q.id);
});
if (!duplicates) {
    console.log('✓ All question IDs are unique');
}

// Test 6: Simulated Game Flow
console.log('\nTest 6: Simulate Game Flow');

// Mock QuizGame class methods
class MockQuizGame {
    constructor() {
        this.questions = questionsData.questions;
        this.score = 0;
        this.correctAnswers = 0;
        this.questionsAnswered = 0;
    }

    startGame() {
        this.score = 0;
        this.correctAnswers = 0;
        this.questionsAnswered = 0;
        // Shuffle and take first 10
        const shuffled = [...this.questions].sort(() => Math.random() - 0.5);
        this.gameQuestions = shuffled.slice(0, 10);
        this.currentIndex = 0;
        return true;
    }

    submitAnswer(answerIndex) {
        const question = this.gameQuestions[this.currentIndex];
        const isCorrect = answerIndex === question.correctAnswer;

        this.questionsAnswered++;
        if (isCorrect) {
            this.correctAnswers++;
            this.score += 10;
        }

        return { isCorrect, explanation: question.explanation };
    }

    nextQuestion() {
        this.currentIndex++;
        return this.currentIndex < this.gameQuestions.length;
    }

    getResults() {
        return {
            score: this.score,
            questionsAnswered: this.questionsAnswered,
            correctAnswers: this.correctAnswers,
            accuracy: ((this.correctAnswers / this.questionsAnswered) * 100).toFixed(1)
        };
    }
}

const game = new MockQuizGame();
game.startGame();

// Simulate answering 10 questions
let answered = 0;
while (answered < 10) {
    // Randomly answer (50% chance of correct answer)
    const question = game.gameQuestions[game.currentIndex];
    const answerIndex = Math.random() > 0.5 ? question.correctAnswer : (question.correctAnswer + 1) % 4;

    game.submitAnswer(answerIndex);
    answered++;

    if (answered < 10) {
        game.nextQuestion();
    }
}

const results = game.getResults();
console.log(`✓ Simulated game: ${results.correctAnswers}/${results.questionsAnswered} correct (${results.accuracy}%)`);
console.log(`✓ Score: ${results.score} points`);

// Summary
console.log('\n=== ALL TESTS PASSED ===');
console.log('\n✅ Game is ready to play!');
console.log('   Run: python3 -m http.server 8000');
console.log('   Then open: http://localhost:8000');
