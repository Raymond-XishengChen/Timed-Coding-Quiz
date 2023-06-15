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
var questionIndex = document.querySelector(".questionIndex");

var questionIndex = 0;

init();

startButton.addEventListener("click", function() {
    // console.log("click" + questionIndex);
    questionBox.setAttribute("style","display: block");
    displayFirstQuestion();
    ansSelected();
});

// nextQuestion.addEventListener("click", function() {
//     questionIndex++;
//     displayNextQuestion();
// });

function init(){
    questionIndex = 1;
    quizInfo.setAttribute("style","display: inline");
    startButton.setAttribute("style","display: flex");
    questionTwo.setAttribute("style","display: none");
    questionThree.setAttribute("style","display: none");
    questionFour.setAttribute("style","display: none");
    scorePage.setAttribute("style","display: none");
    questionBox.setAttribute("style","display: none");
}
function ansSelected(){
    for (var i=0; i<optionButton.length; i++){
        optionButton[i].addEventListener("click", function(){
            questionIndex++;
            console.log(questionIndex);
            displayNextQuestion();
        })
    }
    for (var indexCorrect=0; indexCorrect < correctAns.length; indexCorrect++){
        correctAns[indexCorrect].addEventListener("click", function(){
            questionResult.textContent = "You got it right!";
            questionResult.setAttribute("style","display: block");
        })
    }
    for (var indexWrong=0; indexWrong < wrongAns.length; indexWrong++){
        wrongAns[indexWrong].addEventListener("click", function(){
            questionResult.textContent = "You got it Wrong!";
            questionResult.setAttribute("style","display: block");
        })
    }
}
function displayFirstQuestion(){
    // questionIndex++;
    startButton.setAttribute("style","display: none");
    quizInfo.setAttribute("style","display: none");
    questionOne.setAttribute("style","display: inline");
    console.log(String(questionIndex));
    questionIndex.textContent = String(questionIndex);
    // nextQuestion.disabled=true; 
}
function displaySecondQuestion(){
    questionOne.setAttribute("style","display: none");
    questionTwo.setAttribute("style","display: inline");
    // nextQuestion.disabled=true; 
}
function displayThirdQuestion(){
    questionTwo.setAttribute("style","display: none");
    questionThree.setAttribute("style","display: inline");
    // nextQuestion.disabled=true; 
}

function displayFourthQuestion(){
    questionThree.setAttribute("style","display: none");
    questionFour.setAttribute("style","display: inline");
    // nextQuestion.disabled=true; 
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

