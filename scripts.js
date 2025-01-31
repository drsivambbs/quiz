const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correct: "Mars"
    },
    {
        question: "Who wrote 'Hamlet'?",
        options: ["Shakespeare", "Hemingway", "Tolkien", "Austen"],
        correct: "Shakespeare"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const resultElement = document.getElementById("result");
const submitButton = document.getElementById("submit-btn");
const resetButton = document.getElementById("reset-btn");
const skipButton = document.getElementById("skip-btn");

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        displayFinalScore();
        return;
    }

    const questionData = questions[currentQuestionIndex];
    questionElement.textContent = questionData.question;
    optionsContainer.innerHTML = "";

    questionData.options.forEach(option => {
        const label = document.createElement("label");
        label.innerHTML = `<input type="radio" name="option" value="${option}"> ${option}`;
        optionsContainer.appendChild(label);
        optionsContainer.appendChild(document.createElement("br"));
    });

    resultElement.textContent = "";
}

function displayFinalScore() {
    questionElement.textContent = "Quiz Completed!";
    optionsContainer.innerHTML = "";
    
    let message = "";
    if (score === questions.length) {
        message = "🎉 Excellent work! You got everything right!";
    } else if (score > questions.length / 2) {
        message = "😊 Great job! Keep practicing!";
    } else {
        message = "👍 Good effort! Keep learning and improving!";
    }

    resultElement.innerHTML = `Your score: <strong>${score} / ${questions.length}</strong><br>${message}`;

    submitButton.style.display = "none";
    skipButton.style.display = "none";
    resetButton.style.display = "none";
}

submitButton.addEventListener("click", () => {
    const selectedOption = document.querySelector('input[name="option"]:checked');

    if (!selectedOption) {
        resultElement.textContent = "Please select an option!";
        return;
    }

    const userAnswer = selectedOption.value;
    const correctAnswer = questions[currentQuestionIndex].correct;

    if (userAnswer === correctAnswer) {
        resultElement.textContent = "Correct!";
        resultElement.style.color = "green";
        score++;
    } else {
        resultElement.textContent = `Wrong! Correct answer: ${correctAnswer}`;
        resultElement.style.color = "red";
    }

    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 1000);
});

resetButton.addEventListener("click", () => {
    document.querySelectorAll('input[name="option"]').forEach(input => input.checked = false);
    resultElement.textContent = "";
});

skipButton.addEventListener("click", () => {
    currentQuestionIndex++;
    loadQuestion();
});

loadQuestion();
