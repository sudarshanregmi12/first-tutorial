const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBOX = document.querySelector('.quiz-box');
const nextBtn = document.querySelector('.next-btn');
const headerScore = document.querySelector('.header-score');

let questionCount = 0; // Initialize question count
let score = 0; // Initialize score

// Event listeners for buttons
startBtn.addEventListener('click', () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
});

exitBtn.addEventListener('click', () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
});

continueBtn.addEventListener('click', () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBOX.classList.add('active');

    showQuestions(questionCount);
});

nextBtn.addEventListener('click', () => {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.add('disabled');
    });

    questionCount++;
    if (questionCount < questions.length) {
        showQuestions(questionCount);
    } else {
        alert("You have completed the quiz!");
        questionCount = 0; // Reset question count after completing the quiz
        score = 0; // Reset score after completing the quiz
        updateScore();
    }
});

// Function to show questions
function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    const optionsList = document.querySelectorAll('.option span');

    // Reset option styles and enable options
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('correct', 'incorrect', 'disabled');
    });

    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;
    optionsList.forEach((option, i) => {
        option.textContent = questions[index].options[i];
    });

    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index + 1} of ${questions.length} Questions`;

    // Add event listeners to each option for click handling
    const optionsDiv = document.querySelectorAll('.option');
    optionsDiv.forEach(option => {
        option.addEventListener('click', () => {
            if (!option.classList.contains('disabled')) {
                const selectedOption = option.querySelector('span');
                optionSelected(selectedOption);
            }
        });
    });
}

// Function to handle option click
function optionSelected(answer) {
    const userAnswer = answer.textContent.trim();
    const correctAnswer = questions[questionCount].answer.trim();

    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.add('disabled');
        const optionText = option.querySelector('span').textContent.trim();
        if (optionText === correctAnswer) {
            option.classList.add('correct');
        } else if (optionText === userAnswer) {
            option.classList.add('incorrect');
        }
    });

    // Update score if answer is correct
    if (userAnswer === correctAnswer) {
        score++;
        updateScore();
    }
}

// Function to update score display
function updateScore() {
    headerScore.textContent = `Score: ${score} / ${questions.length}`;
}
const timerDuration = 60; // Timer duration in seconds (1 minute)
let timer; // Variable to store timer

// Function to start timer for each question
function startTimer() {
    let timeLeft = timerDuration;
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            disableOptions();
            nextQuestion();
        } else {
            timeLeft--;
        }
    }, 1000); // Update every second
}

// Function to disable option selection
function disableOptions() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.add('disabled');
    });
}

// Function to proceed to the next question
function nextQuestion() {
    questionCount++;
    if (questionCount < questions.length) {
        showQuestions(questionCount);
        startTimer(); // Start timer for the next question
    } else {
        clearInterval(timer); // Clear timer if all questions are answered
        alert("You have completed the quiz!");
        questionCount = 0; // Reset question count after completing the quiz
        score = 0; // Reset score after completing the quiz
        updateScore();
    }
}

// Array of quiz questions
let questions = [
    {
        numb: 1,
        question: "A constant voltage is applied between the two ends of a uniform metallic wire. Some heat is developed in it. The heat developed is doubled if",
        answer: "B. Both the length and the radius of the wire are doubled",
        options: [
            "A. Both the length and the radius of the wire are halved.",
            "B. Both the length and the radius of the wire are doubled.",
            "C. The length of the wire is doubled.",
            "D. The radius of the wire is doubled."
        ]
    },
    {
        numb: 2,
        question: "The negation of the statement 'A circle is an ellipse' is",
        answer: "C. A circle is not an ellipse",
        options: [
            "A. An ellipse is a circle",
            "B. An ellipse is not a circle",
            "C. A circle is not an ellipse",
            "D. A circle is an ellipse"
        ]
    },
    {
        numb: 3,
        question: "Magnetic dipole moment is a vector quantity directed from ?",
        answer: "C. south pole to north pole",
        options: [
            "A. east to west",
            "B. west to east",
            "C. south pole to north pole",
            "D. north pole to south pole"
        ]
    },
    {
        numb: 4,
        question: "The speed at which the current travels, in conductor, is nearly equal to ?",
        answer: "B. 3 × 10^8 m/s",
        options: [
            "A. 4 × 10^6 m/s",
            "B. 3 × 10^8 m/s",
            "C. 3 × 10^5 m/s",
            "D. 3 × 10^4 m/s"
        ]
    },
    {
        numb: 5,
        question: "Calculate the energy in joule corresponding to light of wavelength 45 nm :",
        answer: "A. 4.42×10^−18",
        options: [
            "A. 4.42×10^−18",
            "B. 4.42×10^−15",
            "C. 4.42×10^−17",
            "D. 4.42×10^−19"
        ]
    }
    // Add more questions as needed
];
