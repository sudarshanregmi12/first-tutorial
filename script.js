const startBtn = document.querySelector(".start-btn");
const popupInfo = document.querySelector(".popup-info");
const exitBtn = document.querySelector(".exit-btn");
const main = document.querySelector(".main");
const continueBtn = document.querySelector(".continue-btn");
const quizSection = document.querySelector(".quiz-section");
const quizBox = document.querySelector(".quiz-box");
const nextBtn = document.querySelector(".next-btn");
const headerTimer = document.getElementById("timer");

let questionCount = 0; // Initialize question count
let timer; // Variable to store timer

// Event listeners for buttons
startBtn.addEventListener("click", () => {
  popupInfo.classList.add("active");
  main.classList.add("active");
});

exitBtn.addEventListener("click", () => {
  popupInfo.classList.remove("active");
  main.classList.remove("active");
});

continueBtn.addEventListener("click", () => {
  quizSection.classList.add("active");
  popupInfo.classList.remove("active");
  main.classList.remove("active");
  quizBox.classList.add("active");
  showQuestions(questionCount);
  startTimer();
});

nextBtn.addEventListener("click", () => {
  questionCount++;
  if (questionCount < questions.length) {
    showQuestions(questionCount);
    startTimer();
  } else {
    clearInterval(timer); // Stop timer when all questions are answered
    alert("You have completed the quiz!");
    questionCount = 0; // Reset question count after completing the quiz
    quizSection.classList.remove("active");
    quizBox.classList.remove("active");
  }
});

function showQuestions(index) {
  const questionText = document.querySelector(".question-text");
  const optionList = document.querySelector(".option-list");
  optionList.innerHTML = "";

  const question = questions[index];
  questionText.textContent = `${question.numb}. ${question.question}`;
  question.options.forEach((option) => {
    const div = document.createElement("div");
    div.className = "option";
    div.innerHTML = `<span>${option}</span>`;
    div.onclick = () => optionSelected(div);
    optionList.appendChild(div);
  });

  const questionTotal = document.querySelector(".question-total");
  questionTotal.textContent = `${index + 1} of ${questions.length} Questions`;
}

function optionSelected(answer) {
  const userAnswer = answer.textContent.trim();
  const correctAnswer = questions[questionCount].answer.trim();

  if (userAnswer === correctAnswer) {
    answer.classList.add("correct");
  } else {
    answer.classList.add("incorrect");
  }
  document.querySelectorAll(".option").forEach((option) => {
    option.classList.add("disabled");
    if (option.textContent.trim() === correctAnswer) {
      option.classList.add("correct");
    }
  });
}

const questions = [
  {
    numb: 1,
    question:
      "A constant voltage is applied between the two ends of a uniform metallic wire. Some heat is developed in it. The heat developed is doubled if",
    answer: "Both the length and the radius of the wire are doubled.",
    options: [
      "The length of the wire is doubled.",
      "The radius of the wire is doubled.",
      "Both the length and the radius of the wire are halved.",
      "Both the length and the radius of the wire are doubled.",
    ],
  },
  {
    numb: 2,
    question: "The negation of the statement 'A circle is an ellipse' is",
    answer: "A circle is not an ellipse",
    options: [
      "An ellipse is a circle",
      "An ellipse is not a circle",
      "A circle is not an ellipse",
      "A circle is an ellipse",
    ],
  },
  {
    numb: 3,
    question: "Magnetic dipole moment is a vector quantity directed from?",
    answer: "south pole to north pole",
    options: [
      "east to west",
      "west to east",
      "south pole to north pole",
      "north pole to south pole",
    ],
  },
  {
    numb: 4,
    question:
      "The speed at which the current travels in a conductor is nearly equal to?",
    answer: "3 × 10^8 m/s",
    options: ["4 × 10^6 m/s", "3 × 10^8 m/s", "3 × 10^5 m/s", "3 × 10^4 m/s"],
  },
  {
    numb: 5,
    question:
      "Calculate the energy in joule corresponding to light of wavelength 45 nm:",
    answer: "4.42×10^−18",
    options: ["4.42×10^−18", "4.42×10^−15", "4.42×10^−17", "4.42×10^−19"],
  },
];

function startTimer() {
  let timeLeft = 40 * 60; // 40 minutes in seconds
  timer = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    headerTimer.textContent = `${minutes}:${seconds}`;

    if (timeLeft === 0) {
      clearInterval(timer);
      alert("Time's up!");
      questionCount = 0; // Reset question count after time's up
      quizSection.classList.remove("active");
      quizBox.classList.remove("active");
    }

    timeLeft--;
  }, 1000); // Update every second
}

