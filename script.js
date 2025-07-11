// Quiz Data - Week 1 Questions
const week1Questions = [
    {
        id: 1,
        question: "|x + 1| < 5 means",
        options: [
            "-6 < x < 4",
            "x > 4", 
            "x = 4",
            "5 < x < -6"
        ],
        correctAnswer: 0
    },
    {
        id: 2,
        question: "If x is an irrational number, which of the following must be true?",
        options: [
            "x is a real number",
            "x must be positive",
            "x is the square root of a prime number",
            "None of these."
        ],
        correctAnswer: 0
    },
    {
        id: 3,
        question: "(x - 1)(x - 2)(x - 3) = 0 → x = 1",
        options: [
            "The above implication is true",
            "The converse of the implication is true",
            "Both the implication and its converse are true",
            "None of these."
        ],
        correctAnswer: 1
    },
    {
        id: 4,
        question: "Consider the proposition 2x + 5 ≥ 17. The condition x ≥ 0 is",
        options: [
            "Sufficient for the proposition to be satisfied",
            "Necessary for the proposition to be satisfied",
            "Both necessary and sufficient for the proposition to be satisfied.",
            "Neither necessary nor sufficient for the proposition to be satisfied."
        ],
        correctAnswer: 1
    },
    {
        id: 5,
        question: "Which of the following statements is correct?",
        options: [
            "x is a rectangle → x is a square",
            "x² > 0 → x > 0.",
            "xy = 0 → x = 0 or y = 0",
            "None of these"
        ],
        correctAnswer: 2
    },
    {
        id: 6,
        question: "What is the negation of the statement \"No one can help liking cats\"?",
        options: [
            "Some people may not like cats",
            "Everyone likes cats",
            "Some people like cats",
            "None of these"
        ],
        correctAnswer: 0
    },
    {
        id: 7,
        question: "Consider the statements: (1) \"Being a square is sufficient for being a rectangle.\" (2) \"Being a rectangle is necessary for being a square.\" Which of these is true?",
        options: [
            "Only statement (1) is true.",
            "Only statement (2) is true.",
            "Both (1) and (2) are true.",
            "Neither (1) nor (2) is true"
        ],
        correctAnswer: 2
    },
    {
        id: 8,
        question: "For what real number x is the following expression undefined? (x+1)(x+4)/x(x+1)(x-4)",
        options: [
            "x = -1 and x = 4",
            "x = 0, x = -1 and x = 4",
            "x = -1",
            "x = 4 and x = 0"
        ],
        correctAnswer: 1
    }
];

// Quiz State
let currentQuiz = {
    questions: [],
    currentQuestionIndex: 0,
    userAnswers: [],
    startTime: null,
    endTime: null,
    score: 0
};

// Screen Management
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    document.getElementById(screenId).classList.add('active');
}

function showWeekSelection() {
    showScreen('weekSelection');
}

function showQuiz() {
    showScreen('quizScreen');
}

function showResults() {
    showScreen('resultsScreen');
}

function showReview() {
    showScreen('reviewScreen');
}

// Week Selection
function selectWeek(weekNumber) {
    if (weekNumber === 1) {
        startQuiz(weekNumber);
    } else {
        alert('Coming soon! Only Week 1 is currently available.');
    }
}

// Quiz Functions
function startQuiz(weekNumber) {
    // Initialize quiz data
    currentQuiz.questions = [...week1Questions];
    
    // Automatically shuffle questions
    currentQuiz.questions = shuffleArray(currentQuiz.questions);
    
    // Shuffle options for each question and update correct answer indices
    currentQuiz.questions.forEach(question => {
        const optionIndexes = Array.from({length: question.options.length}, (_, i) => i);
        const shuffledIndexes = shuffleArray(optionIndexes);
        
        // Create new options array and update correct answer
        question.options = shuffledIndexes.map(index => question.options[index]);
        question.correctAnswer = shuffledIndexes.indexOf(question.correctAnswer);
    });
    
    currentQuiz.currentQuestionIndex = 0;
    currentQuiz.userAnswers = new Array(currentQuiz.questions.length).fill(-1);
    currentQuiz.startTime = new Date();
    currentQuiz.endTime = null;
    currentQuiz.score = 0;
    
    // Update UI
    document.getElementById('quizTitle').textContent = `Week ${weekNumber}: Assignment 1`;
    document.getElementById('totalQuestions').textContent = currentQuiz.questions.length;
    
    // Show quiz screen and load first question
    showQuiz();
    loadQuestion();
    
    // Show notification about automatic shuffling
    showNotification('Questions and options automatically shuffled for practice!', 'success');
}

function loadQuestion() {
    const question = currentQuiz.questions[currentQuiz.currentQuestionIndex];
    const questionNumber = currentQuiz.currentQuestionIndex + 1;
    
    // Update question info
    document.getElementById('currentQuestion').textContent = questionNumber;
    document.getElementById('questionNumber').textContent = questionNumber;
    document.getElementById('questionText').innerHTML = question.question;
    
    // Update progress bar
    const progress = (questionNumber / currentQuiz.questions.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    
    // Load options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.onclick = () => selectOption(index);
        
        const isSelected = currentQuiz.userAnswers[currentQuiz.currentQuestionIndex] === index;
        if (isSelected) {
            optionElement.classList.add('selected');
        }
        
        optionElement.innerHTML = `
            <input type="radio" name="question${question.id}" value="${index}" ${isSelected ? 'checked' : ''}>
            <span class="option-text">${option}</span>
        `;
        
        optionsContainer.appendChild(optionElement);
    });
    
    // Update navigation buttons
    updateNavigationButtons();
}

function selectOption(optionIndex) {
    // Save user answer
    currentQuiz.userAnswers[currentQuiz.currentQuestionIndex] = optionIndex;
    
    // Update UI
    document.querySelectorAll('.option').forEach((option, index) => {
        option.classList.toggle('selected', index === optionIndex);
        const radio = option.querySelector('input[type="radio"]');
        radio.checked = index === optionIndex;
    });
    
    // Update navigation buttons
    updateNavigationButtons();
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    // Previous button
    prevBtn.disabled = currentQuiz.currentQuestionIndex === 0;
    
    // Next/Submit button
    const isLastQuestion = currentQuiz.currentQuestionIndex === currentQuiz.questions.length - 1;
    
    if (isLastQuestion) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-flex';
    } else {
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
    }
}

function previousQuestion() {
    if (currentQuiz.currentQuestionIndex > 0) {
        currentQuiz.currentQuestionIndex--;
        loadQuestion();
    }
}

function nextQuestion() {
    if (currentQuiz.currentQuestionIndex < currentQuiz.questions.length - 1) {
        currentQuiz.currentQuestionIndex++;
        loadQuestion();
    }
}

// Shuffle Functions
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}



// Submit and Results
function submitQuiz() {
    // Check if all questions are answered
    const unansweredQuestions = currentQuiz.userAnswers.findIndex(answer => answer === -1);
    
    if (unansweredQuestions !== -1) {
        const proceed = confirm(`Question ${unansweredQuestions + 1} is not answered. Do you want to submit anyway?`);
        if (!proceed) return;
    }
    
    // Calculate results
    currentQuiz.endTime = new Date();
    calculateScore();
    displayResults();
    showResults();
}

function calculateScore() {
    let correctCount = 0;
    
    currentQuiz.questions.forEach((question, index) => {
        if (currentQuiz.userAnswers[index] === question.correctAnswer) {
            correctCount++;
        }
    });
    
    currentQuiz.score = correctCount;
}

function displayResults() {
    const score = currentQuiz.score;
    const total = currentQuiz.questions.length;
    const percentage = Math.round((score / total) * 100);
    const timeTaken = formatTime(currentQuiz.endTime - currentQuiz.startTime);
    
    // Update score display
    document.getElementById('scoreNumber').textContent = score;
    document.getElementById('scoreTotalQuestions').textContent = total;
    document.getElementById('scorePercentage').textContent = `${percentage}%`;
    
    // Update details
    document.getElementById('correctCount').textContent = score;
    document.getElementById('incorrectCount').textContent = total - score;
    document.getElementById('timeTaken').textContent = timeTaken;
    
    // Animate score
    animateScore(score);
}

function animateScore(finalScore) {
    const scoreElement = document.getElementById('scoreNumber');
    const duration = 1000; // 1 second
    const steps = 20;
    const increment = finalScore / steps;
    const stepDuration = duration / steps;
    
    let currentScore = 0;
    const interval = setInterval(() => {
        currentScore += increment;
        if (currentScore >= finalScore) {
            currentScore = finalScore;
            clearInterval(interval);
        }
        scoreElement.textContent = Math.floor(currentScore);
    }, stepDuration);
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Review Functions
function reviewAnswers() {
    generateReviewContent();
    showReview();
}

function generateReviewContent() {
    const reviewContent = document.getElementById('reviewContent');
    reviewContent.innerHTML = '';
    
    currentQuiz.questions.forEach((question, index) => {
        const userAnswer = currentQuiz.userAnswers[index];
        const isCorrect = userAnswer === question.correctAnswer;
        
        const questionElement = document.createElement('div');
        questionElement.className = `review-question ${isCorrect ? 'correct' : 'incorrect'}`;
        
        questionElement.innerHTML = `
            <div class="review-question-header">
                <span class="question-number">Question ${index + 1}</span>
                <span class="review-status ${isCorrect ? 'correct' : 'incorrect'}">
                    <i class="fas fa-${isCorrect ? 'check-circle' : 'times-circle'}"></i>
                    ${isCorrect ? 'Correct' : 'Incorrect'}
                </span>
            </div>
            <div class="review-question-text">${question.question}</div>
            <div class="review-options">
                ${question.options.map((option, optIndex) => {
                    let classes = ['review-option'];
                    
                    if (optIndex === question.correctAnswer) {
                        classes.push('correct-answer');
                    }
                    
                    if (optIndex === userAnswer) {
                        classes.push('user-answer');
                        if (!isCorrect) {
                            classes.push('incorrect');
                        }
                    }
                    
                    return `<div class="${classes.join(' ')}">${option}</div>`;
                }).join('')}
            </div>
        `;
        
        reviewContent.appendChild(questionElement);
    });
}

// Retry Quiz
function retryQuiz() {
    if (confirm('This will restart the quiz with new shuffled questions and options. Are you sure?')) {
        startQuiz(1);
    }
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#22c55e' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => {
            document.body.removeChild(notification);
            document.head.removeChild(style);
        }, 300);
    }, 3000);
}

// Keyboard Navigation
document.addEventListener('keydown', (event) => {
    const activeScreen = document.querySelector('.screen.active').id;
    
    if (activeScreen === 'quizScreen') {
        switch(event.key) {
            case 'ArrowLeft':
                if (!document.getElementById('prevBtn').disabled) {
                    previousQuestion();
                }
                break;
            case 'ArrowRight':
                if (currentQuiz.currentQuestionIndex < currentQuiz.questions.length - 1) {
                    nextQuestion();
                }
                break;
            case '1':
            case '2':
            case '3':
            case '4':
                const optionIndex = parseInt(event.key) - 1;
                const currentQuestion = currentQuiz.questions[currentQuiz.currentQuestionIndex];
                if (optionIndex < currentQuestion.options.length) {
                    selectOption(optionIndex);
                }
                break;
        }
    }
});

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    // Show welcome screen
    showWeekSelection();
    
    // Add some welcome animation
    setTimeout(() => {
        const weekCards = document.querySelectorAll('.week-card');
        weekCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'fadeIn 0.5s ease-out';
            }, index * 100);
        });
    }, 500);
});

// Performance optimization - Preload next question
function preloadNextQuestion() {
    if (currentQuiz.currentQuestionIndex < currentQuiz.questions.length - 1) {
        // Preload next question content if needed
        const nextQuestion = currentQuiz.questions[currentQuiz.currentQuestionIndex + 1];
        // Could implement image preloading or other optimizations here
    }
}

// Auto-save functionality (optional)
function autoSaveProgress() {
    const saveData = {
        currentQuestionIndex: currentQuiz.currentQuestionIndex,
        userAnswers: currentQuiz.userAnswers,
        startTime: currentQuiz.startTime
    };
    
    localStorage.setItem('nptelQuizProgress', JSON.stringify(saveData));
}

function loadSavedProgress() {
    const savedData = localStorage.getItem('nptelQuizProgress');
    if (savedData) {
        const data = JSON.parse(savedData);
        // Could implement progress restoration here
    }
}

// Clear saved progress when quiz is completed
function clearSavedProgress() {
    localStorage.removeItem('nptelQuizProgress');
}
