var userClickedPatttern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];


//start the game
var started = false;
var level = 0;
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();

    started = true;
  }
});

//check the answer
function checkAnswer(currentLevel) {
  console.log(userClickedPatttern);
  console.log(gamePattern);
  if (userClickedPatttern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPatttern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }


  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

//start Over
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}


function nextSequence() {
  userClickedPatttern = [];
  //update level by 1
  level++;
  $("#level-title").text("Level " + level);
  //choose a random color
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //flash the button and play the sound of that color
  var selectedButton = "#" + randomChosenColour;
  $(selectedButton).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//store info when user click the button
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPatttern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPatttern.length - 1);
});

//play sounds
function playSound(name) {
  var sound = "sounds/" + name + ".mp3";
  var audio = new Audio(sound);
  audio.play();
}

//add animation to user clicks
function animatePress(currentColour) {
  var currentClass = "#" + currentColour;
  $(currentClass).addClass("pressed");
  setTimeout(function() {
    $(currentClass).removeClass("pressed");
  }, 100);
}
