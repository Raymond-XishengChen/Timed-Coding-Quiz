var startButton = document.querySelector(".startButton");
var questionOne = document.querySelector(".questionOne");
var questionTwo = document.querySelector(".questionTwo");
var questionThree = document.querySelector(".questionThree");
var questionFour = document.querySelector(".questionFour");
var nextQuestion = document.querySelector(".nextQuestion");
var optionButton = document.querySelectorAll(".optionList button");
var correctAns = document.querySelectorAll(".correctAns");
var wrongAns = document.querySelectorAll(".wrongAns");
var questionResult = document.querySelector(".questionResult");
var scorePage = document.querySelector(".scorePage");
var questionBox = document.querySelector(".questionBox");
var quizInfo = document.querySelector(".quizInfo");
var questionNum = document.querySelector(".questionNum");
var secondsLeft = document.querySelector(".secondsLeft");
var qFourAns = document.querySelectorAll(".qFourAns");
var finalScore = document.querySelector(".finalScore");
// var submitButton = document.getElementById("submit");
// var savedInitial = document.getElementById("initial-text");

var initial = document.getElementById("initial-text");
var submitButton = document.getElementById("submit");
var score;
var questionIndex = 0;
var timeLeft;
var checkQFour = 0;

init();

//when start button is clicked, show the first question, start timer and start checking if any answer is selected
startButton.addEventListener("click", function() {
    // console.log("click" + questionIndex);
    setTime();
    questionBox.setAttribute("style","display: block");
    displayFirstQuestion();
    ansSelected();
});

//initialising all essential variables and idsplay only the quiz informations
function init(){
    questionIndex = 1;
    timeLeft = 75;
    checkQFour = 0;
    quizInfo.setAttribute("style","display: inline");
    startButton.setAttribute("style","display: flex");
    questionTwo.setAttribute("style","display: none");
    questionThree.setAttribute("style","display: none");
    questionFour.setAttribute("style","display: none");
    scorePage.setAttribute("style","display: none");
    questionBox.setAttribute("style","display: none");

}

//if any of the answers is selected, jump to the next question. Counter plus one 
function ansSelected(){
    for (var i=0; i<optionButton.length; i++){
        optionButton[i].addEventListener("click", function(){
            questionIndex++;
            console.log(questionIndex);
            displayNextQuestion();
            checkFinished();
        })
    }
    //if the correction is selected, show text "you got it right" and no penalty
    for (var indexCorrect=0; indexCorrect < correctAns.length; indexCorrect++){
        correctAns[indexCorrect].addEventListener("click", function(){
            questionResult.textContent = "You got it right!";
            questionResult.setAttribute("style","display: block");
        })
    }
    //if an incorrect answer is selected, show text "you got it wrong" and apply penalty
    for (var indexWrong=0; indexWrong < wrongAns.length; indexWrong++){
        wrongAns[indexWrong].addEventListener("click", function(){
            questionResult.textContent = "You got it Wrong!";
            questionResult.setAttribute("style","display: block");
            timeLeft = timeLeft - 10;
        })
    }
}

//keep track on the question counter and display the correct question
function displayFirstQuestion(){
    // questionIndex++;
    startButton.setAttribute("style","display: none");
    quizInfo.setAttribute("style","display: none");
    questionOne.setAttribute("style","display: inline");
    questionNum.textContent = questionIndex;
    // nextQuestion.disabled=true; 
}
function displaySecondQuestion(){
    questionOne.setAttribute("style","display: none");
    questionTwo.setAttribute("style","display: inline");
    questionNum.textContent = questionIndex;
}
function displayThirdQuestion(){
    questionTwo.setAttribute("style","display: none");
    questionThree.setAttribute("style","display: inline");
    questionNum.textContent = questionIndex;
}

function displayFourthQuestion(){
    questionThree.setAttribute("style","display: none");
    questionFour.setAttribute("style","display: inline");
    questionNum.textContent = questionIndex;
}

function displayScorePage() {
    questionFour.setAttribute("style","display: none");
    questionBox.setAttribute("style","display: none");
    scorePage.setAttribute("style","display: inline");
}

function displayNextQuestion() {
    if (questionIndex === 2) {
        displaySecondQuestion();
    }else if (questionIndex === 3){
        displayThirdQuestion();
    }else if(questionIndex === 4){
        displayFourthQuestion();
    }else if(questionIndex === 5){
        displayScorePage();
    }
}

//show timeclock
//time clock stops if no time left
//time clock stops if all questions are answered
function setTime() {
    var timeInterval = setInterval(function () {
        timeLeft--;
        secondsLeft.textContent = timeLeft;
        if(timeLeft === 0){
            clearInterval(timeInterval);
            displayScorePage();
        }else if(checkQFour){
            clearInterval(timeInterval);
        }
        finalScore.textContent = timeLeft;
        // finalScore.value = timeLeft;
    },1000)
}

//check if the last question is answered
function checkFinished() {
    for (var indexQFour=0; indexQFour < qFourAns.length; indexQFour++){
        qFourAns[indexQFour].addEventListener("click", function(){
            checkQFour = 1;
        })
    }
}

function saveScore() {
    var score = {
      initial: initial.value,
      score: timeLeft.value,
    };
    localStorage.setItem("score", JSON.stringify(score));
  }

submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    saveScore();    
    location.replace("./Assets/html/highscore.html");
    renderLastScore();
});

function renderLastScore() {
    var lastScore = JSON.parse(localStorage.getItem("score"));
    if (lastScore !== null) {
        document.getElementById("initial-text").innerHTML = lastScore.initial;
        document.getElementById("finalScore").innerHTML = lastScore.score;
    } else {
        return;
    }
}