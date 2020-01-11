var startBtn = document.querySelector("#startquiz");
var wellcomePage = document.querySelector("#wellcomePage");
var questionPage = document.querySelector("#questionPage");
var time = document.querySelector("#time");
var questionSpace = document.querySelector("#questionSpace");
var choicesList = document.querySelector("#choices-list");
var checkAnswer = document.querySelector("#check-answer");
var sumbitBtn = document.querySelector("#sumbitBtn");
var highscores = document.querySelector("#highscores");





var timeLeft = 75;
var timeInterval = -1;
var count = 0;



// GAME FUNCTION

function gameOuiz(){
    

    
    
    choicesList.innerHTML = "";
    checkAnswer.innerHTML = "";

    
    questionSpace.textContent = questions[count].title;
 

    for (var i=0; i< questions[count].choices.length; i++) {

        var list = document.createElement("button");
        list.textContent = questions[count].choices[i];
        list.setAttribute("class", "btn btn-info");
        list.setAttribute("data",questions[count].choices[i]);
        list.setAttribute("answer",questions[count].answer);
        choicesList.appendChild(list);
    }
}


choicesList.addEventListener("click",function(event){
    event.preventDefault();
 
 
    if (event.target.getAttribute("data") === event.target.getAttribute("answer") ) {
        console.log(event.target.getAttribute("data"));
        console.log(event.target.getAttribute("answer"));
        checkAnswer.textContent = "correct!";
        checkQuestionsLeft();
    } else {
        timeLeft = timeLeft - 15;
        checkAnswer.textContent = "wrong!";
        checkQuestionsLeft();
    }
    
}); 

// CHECK IF THERE ARE QUESTIONS LEFT 

function checkQuestionsLeft (){
    
    count++;
    if (count === questions.length){
        // alert("end game!");
        clearInterval(timeInterval);
        showResult();
    } else {

        setTimeout(function(){gameOuiz()},300);
    }
}


// RENDER SCORE RESULT

function renderScore(){
    var scoreResult = localStorage.getItem("score");
    var initialsResult = localStorage.getItem("initials");

}

// SCORE RESULT PAGE

function showResult(){
    
    questionPage.style.display = "none";
    var scoreResultPage = document.querySelector("#scoreResultPage");
    scoreResultPage.style.display ="block"

   if (timeLeft<0){
       timeLeft = 0;
   }
    document.querySelector("#finalScore").textContent = "Your final score is " + timeLeft;
    document.querySelector("#time").textContent = timeLeft;

    // SUBMIT RESULT BUTTON
    sumbitBtn.addEventListener("click",function(result){
        result.preventDefault();

        var scoreResult = timeLeft;
        var initialsResult = document.querySelector("#initials").value;

        localStorage.setItem("score",scoreResult);
        localStorage.setItem("initials", initialsResult);

        renderScore();

        // GO TO HIGHSCORES PAGE
        scoreResultPage.style.display = "none";
        highscores.style.display = "block";
        highscores.style.margin = "80px";
        

        var highscoresResult = document.querySelector("#highscoresResult");
        highscoresResult.textContent = initialsResult + "-" + scoreResult;


        // CLEAR BUTTON
        document.querySelector("#clearBtn").addEventListener("click", function(){
            highscoresResult.innerHTML = '<h4>Your Score is clear</h4>';
            document.querySelector("#clearBtn").style.display ="none";
           localStorage.clear();
           var upper =  document.querySelector("#upper");
           upper.setAttribute("class", "displayPage");
           upper.style.margin = "100px";
          
        })

        // GO BACK BUTTON
        document.querySelector("#goBackBtn").addEventListener("click", function(){
            location.reload();
          
        })
    });
}



// START BUTTON 


startBtn.addEventListener("click", function(){


    wellcomePage.style.display = "none";
    questionPage.style.display = "block";
 


    if (timeInterval === -1){
        timeInterval = setInterval(function(){
            timeLeft--;
            time.textContent=timeLeft;
    if (timeLeft === 0 ){
      
        clearInterval(timeInterval);
        // alert("Sorry, your time is up!");
        showResult();
    }
        }, 1000);
    }

    gameOuiz();

});

