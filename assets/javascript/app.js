
var questions = [{
  question: "'30 Rock' is based on a fictitious variety show called 'TGS with Tracy Jordan'. What do the initials 'TGS' stand for?",
  choices: ["The Girlie Show", "The Guy Show", "The Game Show"],
  correctAnswer: 0
}, {
  question: "Before Tracy Jordan came onboard the show, who was the star of 'TGS'?",
  choices: ["Liz Lemon", "Kenneth the page", "Jenna Maroney"],
  correctAnswer: 2
}, {
  question: "When the writers are playing 'Marry, Boff, Kill?', who is always chosen to be 'killed'?",
  choices: ["Jack", "Jenna", "Liz"],
  correctAnswer: 1
}, {
  question: "What does Tracy send Kenneth Parcell (Jack McBrayer) to Yankee Stadium to retrieve?",
  choices: ["nachos", "a hat", "a baseball"],
  correctAnswer: 0
}, {
  question: "Who is Jack referring to when he tells Liz, 'In five years we'll all either be working for him... or be dead by his hand",
  choices: ["Lutz", "Frank", "Kenneth"],
  correctAnswer: 2
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

  // Display the first question
  displayCurrentQuestion();
  $(this).find(".quizMessage").hide();

  // On clicking next, display the next question
  $(this).find(".nextButton").on("click", function () {
      if (!quizOver) {

          value = $("input[type='radio']:checked").val();

          if (value == undefined) {
              $(document).find(".quizMessage").text("Please select an answer");
              $(document).find(".quizMessage").show();
          } else {
              // TODO: Remove any message -> not sure if this is efficient to call this each time....
              $(document).find(".quizMessage").hide();

              if (value == questions[currentQuestion].correctAnswer) {
                  correctAnswers++;
              }

              currentQuestion++; // Since we have already displayed the first question on DOM ready
              if (currentQuestion < questions.length) {
                  displayCurrentQuestion();
              } else {
                  displayScore();
                  //                    $(document).find(".nextButton").toggle();
                  //                    $(document).find(".playAgainButton").toggle();
                  // Change the text in the next button to ask if user wants to play again
                  $(document).find(".nextButton").text("Play Again?");
                  quizOver = true;
              }
          }
      } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
          quizOver = false;
          $(document).find(".nextButton").text("Next Question");
          resetQuiz();
          displayCurrentQuestion();
          hideScore();
      }
  });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

  console.log("In display current Question");

  var question = questions[currentQuestion].question;
  var questionClass = $(document).find(".quizContainer > .question");
  var choiceList = $(document).find(".quizContainer > .choiceList");
  var numChoices = questions[currentQuestion].choices.length;

  // Set the questionClass text to the current question
  $(questionClass).text(question);

  // Remove all current <li> elements (if any)
  $(choiceList).find("li").remove();

  var choice;
  for (i = 0; i < numChoices; i++) {
      choice = questions[currentQuestion].choices[i];
      $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
  }
}

function resetQuiz() {
  currentQuestion = 0;
  correctAnswers = 0;
  hideScore();
}

function displayScore() {
  $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
  $(document).find(".quizContainer > .result").show();
}

function hideScore() {
  $(document).find(".result").hide();
}
var timer;

var windowTimeout = setTimeout(function() {
  alert("Alert #1");
}, 1000);

//  Start on click.
$("#start").on("click", function() {
  //  Set the button alert's timeout to run three seconds after the function's called.
  delayButtonAlert = setTimeout(function() {
    alert("Alert #2");
  }, 3000);
});

//  Cancel on click.
$("#cancel").on("click", function() {
  // Clear the button alert's timeout.
  clearTimeout(delayButtonAlert);
});

//  Cancel window alert on click.
$("#window-cancel").on("click", function() {
  //  Clear the timeout, and stop the window alert.
  clearTimeout(windowTimeout);
}); 