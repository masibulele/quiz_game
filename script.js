// TODO get screen elements that needs to be dynamically
const startScreenDisplay = document.querySelector("#quiz-start");
const quizScreenDisplay = document.querySelector("#quiz-screen");
const startBtnDisplay = document.querySelector("#start-btn");
const resetScreenDisplay = document.querySelector("#quiz-results");
const resetBtnDisplay = document.querySelector("#restart-btn");
const questionDisplay = document.querySelector("#quiz-question");
const questionOptionsContainerDisplay = document.querySelector(".question-option-container");
const questionIdDisplay =  document.querySelector("#q-id");
const scoreCountDisplay = document.querySelector("#s-count");
const totalQuestionDisplayNum = document.querySelector("#total-question-num");
const progressBarDisplay = document.querySelector(".progress");
const scoreResultsDisplay = document.querySelector("#result-score");
const scoreMaxDisplay = document.querySelector("#score-total");
const gameResultComment = document.querySelector(".game-comment");


// TODO create data array with questions and answers
// Quiz questions
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

// TODO start quiz with  click of start button
startScreenDisplay.classList.add("active");
startBtnDisplay.addEventListener('click',startQuiz);
resetBtnDisplay.addEventListener('click',resetQuiz);

// TODO: initials question and answers and score variable
let qNum =0;
let score = 0;
let totalQ = quizQuestions.length
let questionIndex = 0;

// TODO: when answer is selected check if answer correct
// TODO: provide visual feedback if correct or incorret
// TODO: move to next question
// TODO: update progess bar
// TODO: where correct update score
// TODO: check if there is another question
// TODO: if no more questions  show results with final score and message.
// TODO: on click off reset return to start screen





// define support functions
function startQuiz (){
    startScreenDisplay.classList.remove("active");
    quizScreenDisplay.classList.add("active");
    gamePlay();
};

function resetQuiz(){
    resetScreenDisplay.classList.remove("active");
    startScreenDisplay.classList.add("active");


}

function gamePlay(){
questionIdDisplay.textContent=qNum;
scoreCountDisplay.textContent=score;
totalQuestionDisplayNum.textContent = totalQ;
let currentQuestion = quizQuestions[questionIndex];
let calcProgress = (questionIndex+1)/totalQ *100;
progressBarDisplay.style.width = calcProgress +"%";

questionDisplay.textContent = currentQuestion.question;
questionIdDisplay.textContent= questionIndex+1;

questionOptionsContainerDisplay.innerHTML="";
currentQuestion.answers.forEach((answer)=>{
    const ansBtn = document.createElement('button');
    ansBtn.innerText = answer.text;
    ansBtn.dataset.correct= answer.correct;
    ansBtn.classList.add("ans-btn");
    ansBtn.addEventListener('click',showAns)
    questionOptionsContainerDisplay.appendChild(ansBtn);



});






}


function showAns(event){
    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        score++;
        scoreCountDisplay.textContent=score;
    }

    Array.from(questionOptionsContainerDisplay.children).forEach((btn)=>{
        if(btn.dataset.correct ==="true"){
            btn.classList.add("correct");
        }
        else if (btn === selectedBtn ){
            btn.classList.add("incorrect")
        }
        

    });
    
    setTimeout(()=>{
        questionIndex++;
       
        if(questionIndex<totalQ){
            gamePlay()

        }else{
            showResults()

        }

    },1000);

    
}


function showResults(){
     quizScreenDisplay.classList.remove("active");
     resetScreenDisplay.classList.add("active");

     scoreResultsDisplay.innerText=score;
     scoreMaxDisplay.textContent= totalQ;

     let resultPec = score/totalQ*100


     if(resultPec>=80){
        gameResultComment.innerText = "Great result!";
       
     }else if(resultPec>=60){

        gameResultComment.innerText = "Great attempt but there is always room to improve.";

     }else{

        gameResultComment.innerText = "Good effort keep learning";
        
     }

}