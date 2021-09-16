// Questions Array
var questions = [
    {
    numb: 1,
    question: "Commonly used data types DO NOT include:",
    answer: "alerts",
    options: ["strings", "booleans", "alerts", "numbers"],
  },
  {
    numb: 2,
    question: "The condition in an if/else statement is enclosed within___.",
    answer: "curly brackets",
    options: ["quotes", "curly brackets", "parentheses", "square brackets"],
  },
  {
    numb: 3,
    question: "Arrays in JavaScript can be used to store___.",
    answer: "all of the above",
    options: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
  },
  {
    numb: 4,
    question:
      "String value must be enclosed within ___ when being assigned to variables.",
    answer: "quotes",
    options: ["commas", "curly brackets", "quotes", "parentheses"],
  },
  {
    numb: 5,
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answer: "console log",
    options: ["JavaScript", "terminal/bash", "for loops", "console log"],
  }
];

//selecting all required elements
var info_box = document.querySelector(".info_box");
var start_btn = document.querySelector(".start_btn button");
var exit_btn = info_box.querySelector(".buttons .quit");
var continue_btn = info_box.querySelector(".buttons .restart");
var quiz_box = document.querySelector(".quiz_box");
var result_box = document.querySelector(".result_box");
var option_list = document.querySelector(".option_list");
// new selector
var timeCounter = document.querySelector(".timer-count");
var feedbackTxt = document.querySelector("footer .feedback-text");
var restart_quiz = result_box.querySelector(".buttons .restart");
var quit_quiz = result_box.querySelector(".buttons .quit");
var submitButton = document.querySelector(".buttons .submit");

// Declare variables
var timer;
var timerCount;
var que_numb = 1;
var userScore = 0;
var counter;
var que_count = 0;


// Start button function
start_btn.onclick = ()=>{
    // show info box
    info_box.classList.add("activeInfo");
}

// exit from quiz
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
}

// Continue button function
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuetions(0);
    startTimer();
    timeCounter.textContent = timerCount;
}




// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    timerCount = 75; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    showQuetions(que_count);
    timeCounter.textContent = timerCount;
}

// Quit button function
quit_quiz.onclick = ()=>{
    window.location.reload();
}


// Next question loader function
function nextQuestion() {
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuetions(que_count);
    }else{    
        showResult();
    }
}

// getting questions and options from array
function showQuetions(index){
    var que_text = document.querySelector(".que_text");

    // create a new questions for each array
    var que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    var option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    
    var option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}


// Time Counter
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timeCounter.textContent = timerCount;
      if (timerCount <= 0) {
          clearInterval(timer);
          showResult();
    }
  }, 1000);
}

  


//if user clicked on option
function optionSelected(answer){
    var userAns = answer.textContent;
    var correcAns = questions[que_count].answer;
    
    if(userAns == correcAns){
        userScore += 1; 
        feedbackTxt.textContent = "Correct";
    }else{
        feedbackTxt.textContent = "Incorrect";
        timerCount -= 10;
        timeCounter.textContent = timerCount;
    }
    nextQuestion();
}

function showResult(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    var scoreText = result_box.querySelector(".score_text");
    scoreText.textContent = "Final Score: " + userScore + " out of 5.";
}


// submit button function
// submitButton.addEventListener("click", function(event) {
//     event.preventDefault();
  
//     var uName = document.querySelector("#user-name").value;
  
//   });