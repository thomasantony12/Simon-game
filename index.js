var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animate(userChosenColour);
  playAudio(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    setTimeout(function () {
      playAudio("wrong");
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, press any key to restart.");
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  $("#level-title").text("level " + level);
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut()
    .fadeIn();
  playAudio(randomChosenColour);
}

function playAudio(audio) {
  var adi = new Audio("/sounds/" + audio + ".mp3");
  adi.play();
}

function animate(btn) {
  $("." + btn).addClass("pressed");
  setTimeout(function () {
    $("." + btn).removeClass("pressed");
  }, 50);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
