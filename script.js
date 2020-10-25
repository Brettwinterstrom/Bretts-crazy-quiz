const startButton = document.getElementById('start-btn');
const playAgainButton = document.getElementById('play-again');
const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const questionElement = document.getElementById('question');
const countdownTimer = document.getElementById('countdown-timer');
const endScreen = document.getElementById('end-screen');
const highscoreScreen = document.getElementById('highscore-screen');
const scoreSpan = document.querySelector('#end-screen span');
const pTag = document.getElementById('ptag');
let timeLeft = 75;
let currentQuestionIndex = 0;
let score = 0;
let timer;

const questions = [
  {
    question: "What is 2+2?",
    answers: {
      a: "22",
      b: "3",
      c: "4",
      d: "5"
    },
    correctAnswer: "4"
  },
  {
    question: "What is 4 + 4?",
    answers: {
      a: "44",
      b: "14",
      c: "8",
      d: "12"
    },
    correctAnswer: "8"
  },
  {
    question: "What is 8 - 4?",
    answers: {
      a: "5",
      b: "84",
      c: "48",
      d: "4"
    },
    correctAnswer: "4"
  }
];
//Load initial load screen with start button that has on click function
startButton.addEventListener('click', startGame);

//Upon click of start button pop up a question with a set of answers and hide everything else
function startGame() {
  //hide message
  pTag.classList.add('hide');
  //hide start button
  startButton.classList.add('hide');
  //show questions container
  questionContainer.classList.remove('hide');
  //start timer
  timer = setInterval(function () {
    //decrease time
    timeLeft--;
    //show updated time
    countdownTimer.textContent = timeLeft;
    //if time is 0 then end quiz
    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
  generateQuestion();
};

function generateQuestion() {
  //create question html
  const questionMarkUp = `
    <div id="question">${questions[currentQuestionIndex].question}</div>
    <div class="answer-buttons-container">
        <button class="answerChoice btn btn-light">${questions[currentQuestionIndex].answers.a}</button>
        <button class="answerChoice btn btn-light">${questions[currentQuestionIndex].answers.b}</button>
        <button class="answerChoice btn btn-light">${questions[currentQuestionIndex].answers.c}</button>
        <button class="answerChoice btn btn-light">${questions[currentQuestionIndex].answers.d}</button>
    </div>
  `;
  //add question the to page
  questionContainer.innerHTML = questionMarkUp;
}

//add event listener for answers
questionContainer.addEventListener("click", function (event) {
  //filter for answerChoice
  if (event.target.className.indexOf("answerChoice") > -1) {
    processAnswer(event);
  }
});

//onlcik of answer choice
function processAnswer(event) {
  //check if answer is correct
  if (event.target.textContent === questions[currentQuestionIndex].correctAnswer) {
    //increase score
    score++;
  } else {
    timeLeft = timeLeft - 5;
  }

  //increase index
  currentQuestionIndex++;

  //stop quiz when there is no more quetions
  if (currentQuestionIndex === questions.length) {
    endQuiz();
    return;

  }

  //show next question
  generateQuestion();
}

function endQuiz() {
  //show end screen elements
  endScreen.classList.remove('hide');

  //update the score on UI
  scoreSpan.textContent = score;

  //stop timer
  clearInterval(timer);

  //hide questions
  questionContainer.classList.add('hide');
}

document.querySelector(".submit-btn").addEventListener("click", storeData);
const inpKey = document.getElementById("inpKey")
const lsOutput = document.getElementById("lsOutput")

function storeData() {
  endScreen.classList.add('hide');
  highscoreScreen.classList.remove('hide');
  //get the input box value in a var
  var userInput = document.querySelector("#end-screen input")
  // check if input is not empty
  // const key = inpKey.value;

  if (key) {
    localStorage.setItem(key, score);
    location.reload()
  }


}