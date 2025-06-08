/*
This is javascript file that handles the functionality of the index.html file. It selected multiple items using id and then use them to create a quiz functionality such as starting the quiz, appearing of ques, correct and incorrect options, updatin scores, and in the end results final score max score showing result msg based on how much percentage you scored and restarting the quiz.
*/

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startButton = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-question');
const scoreSpan = document.getElementById('score');
const finalScoreSpan = document.getElementById('final-score');
const maxScoreSpan = document.getElementById('max-score');
const resultMsg = document.getElementById('result-msg');
const restartButton = document.getElementById('restart-btn');
const progressBar = document.getElementById('progress');
const timer = document.getElementById('time-left-p');

const quizQuestions = [
  {
    question: "Who won the Formula 1 Drivers' Championship in 2023?",
    answers: [
      { text: "Lewis Hamilton", correct: false },
      { text: "Max Verstappen", correct: true },
      { text: "Charles Leclerc", correct: false },
      { text: "Lando Norris", correct: false }
    ]
  },
  {
    question: "Which team does Max Verstappen drive for?",
    answers: [
      { text: "Mercedes", correct: false },
      { text: "Ferrari", correct: false },
      { text: "Red Bull Racing", correct: true },
      { text: "McLaren", correct: false }
    ]
  },
  {
    question: "Who was Max Verstappen's teammate during the 2023 season?",
    answers: [
      { text: "George Russell", correct: false },
      { text: "Carlos Sainz", correct: false },
      { text: "Sergio Perez", correct: true },
      { text: "Fernando Alonso", correct: false }
    ]
  },
  {
    question: "Which team is famous for its red-colored Formula 1 cars?",
    answers: [
      { text: "Mercedes", correct: false },
      { text: "Ferrari", correct: true },
      { text: "Alpine", correct: false },
      { text: "Aston Martin", correct: false }
    ]
  },
  {
    question: "Who is the seven-time Formula 1 World Champion?",
    answers: [
      { text: "Sebastian Vettel", correct: false },
      { text: "Fernando Alonso", correct: false },
      { text: "Lewis Hamilton", correct: true },
      { text: "Kimi Räikkönen", correct: false }
    ]
  },
  {
    question: "Which country hosts the famous Monaco Grand Prix?",
    answers: [
      { text: "Italy", correct: false },
      { text: "France", correct: false },
      { text: "Monaco", correct: true },
      { text: "Spain", correct: false }
    ]
  },
  {
    question: "Who drives alongside Charles Leclerc at Ferrari in the 2023 season?",
    answers: [
      { text: "Carlos Sainz", correct: true },
      { text: "Oscar Piastri", correct: false },
      { text: "George Russell", correct: false },
      { text: "Pierre Gasly", correct: false }
    ]
  },
  {
    question: "Which British team had Lando Norris as one of its drivers in 2023?",
    answers: [
      { text: "Williams", correct: false },
      { text: "McLaren", correct: true },
      { text: "Mercedes", correct: false },
      { text: "Haas", correct: false }
    ]
  },
  {
    question: "What color are the Red Bull Racing cars primarily known for?",
    answers: [
      { text: "Silver", correct: false },
      { text: "Green", correct: false },
      { text: "Blue", correct: true },
      { text: "Yellow", correct: false }
    ]
  },
  {
    question: "Which Spanish driver returned to Aston Martin for the 2023 Formula 1 season?",
    answers: [
      { text: "Carlos Sainz", correct: false },
      { text: "Fernando Alonso", correct: true },
      { text: "Pedro de la Rosa", correct: false },
      { text: "Marc Gené", correct: false }
    ]
  }
];

let shuffeledQuizQuestions;
let timerId = null;
let counter;

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;

startButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = score;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  shuffeledQuizQuestions = [...quizQuestions].sort(() => Math.random() - 0.5);
  shuffeledQuizQuestions.forEach(question => {
    question.answers = [...question.answers].sort(() => Math.random() - 0.5);
  })

  showQuestion();
})

const startTimer = () => {
  counter = 15;
  timer.textContent = counter;

  timerId = setInterval(() => {
    counter--;
    timer.textContent = counter;

    if (counter <= 5) {
      timer.style.color = "red";
    }
  }, 1000);
}

const stopTimer = () => {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
    timer.style.color = "#333"
  }
}

const showQuestion = () => {
  answersDisabled = false;

  const currentQuestion = shuffeledQuizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;

  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn")

    button.dataset.correct = answer.correct;

    button.addEventListener("click", (event) => {
      if (answersDisabled) return;

      answersDisabled = true

      const selectedButton = event.target;
      const isCorrect = selectedButton.dataset.correct === "true";

      Array.from(answersContainer.children).forEach(button => {
        if (button.dataset.correct === "true") {
          button.classList.add("correct");
        } else if (button === selectedButton) {
          button.classList.add("incorrect");
        }
      });

      if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
      }

      setTimeout(() => {
        currentQuestionIndex++;

        if (currentQuestionIndex < shuffeledQuizQuestions.length) {
          showQuestion()
        } else {
          showResults()
        }
      }, 1000);
    })

    answersContainer.append(button);
  })

  startTimer();
}

const showResults = () => {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;
  maxScoreSpan.textContent = quizQuestions.length;

  const percentage = (score/quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMsg.textContent = "Perfect! You're awesome."
  } else if (percentage >= 80) {
    resultMsg.textContent = "Great job! Today is your Day."
  } else if (percentage >= 60) {
    resultMsg.textContent = "Good effort! Keep Learning, your day will come."
  } else {
    resultMsg.textContent = "You are too bad to be participating."
  }
}

restartButton.addEventListener("click", () => {
  resultScreen.classList.remove("active");

  startButton.click();
})
