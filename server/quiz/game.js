const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];


// const startQuizButton = document.querySelector(".btn");
// startQuizButton.addEventListener('click', fetchData)

// async function fetchData() {
//     const response = await fetch("http://localhost:3000/questions");
//     const questions = await response.json();
    
//     const startQuizButton = document.querySelector(".btn");
//     // const authorElement = document.querySelector("#author");
//     // textElement.textContent = quote["text"];
//     // authorElement.textContent = quote["author"];
//   }





let questions = []

fetch(
    'http://localhost:3000/questions'
)
    .then((res) => {
        return res.json();
    })
    .then((questions) => {
        console.log(questions)
        return questions
        
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });



  const CORRECT_BONUS = 100;
  const MAX_QUESTIONS = 40;
  
  startGame = () => {
      questionCounter = 0;
      score = 0;
      availableQuesions = [...questions];
      getNewQuestion();
  };
  
  getNewQuestion = () => {
      if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore",score);
          //go to the end page
          return window.location.assign('end.html');
      }
      questionCounter++;
      questionCounterText.innerText=`${questionCounter}/${MAX_QUESTIONS}`;
      const questionIndex = Math.floor(Math.random() * availableQuesions.length);
      currentQuestion = availableQuesions[questionIndex];
      question.innerText = currentQuestion.question;
  
      choices.forEach((choice) => {
          const number = choice.dataset['number'];
          choice.innerText = currentQuestion['choice' + number];
      });
  
      availableQuesions.splice(questionIndex, 1);
      acceptingAnswers = true;
  };
  
  choices.forEach((choice) => {
      choice.addEventListener('click', (e) => {
          if (!acceptingAnswers) return;
  
          acceptingAnswers = false;
          const selectedChoice = e.target;
          let selectedAnswer = selectedChoice.dataset['number'];

          const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
          if(classToApply==="correct"){
            incrementScore(CORRECT_BONUS);
          }
          selectedChoice.parentElement.classList.add(classToApply); 
          setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
          },1000);
          
      });
  });
  
incrementScore = num =>{
    score += num;
    scoreText.innerText = score;
}
//startGame();

