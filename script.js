// global constants
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

//Global Variables
var clueHoldTime = 1000; //how long to hold each clue's light/sound
var pattern = [5];
var patternIntermediate = [10];
var patternHard = [15];
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5; //must be between 0.0 and 1.0
var guessCounter = 0;
var level = "";
var tries; //make popup that says you picked wrong and to pick again

function startGame() {
  tries = 0;
  for (let i = 0; i < 5; i++) {
    var min = Math.ceil(1);
    var max = Math.floor(4);
    pattern[i] = Math.floor(Math.random() * (max - min + 1) + min);
  }
  //initialize game variables
  progress = 0;
  gamePlaying = true;
  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("startBtnHard").classList.add("hidden");
  document.getElementById("startBtnIntermediate").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  level = "easy";
  playClueSequence();
}

function startGameInter() {
  tries = 0;
  for (let i = 0; i < 10; i++) {
    var min = Math.ceil(1);
    var max = Math.floor(6);
    patternIntermediate[i] = Math.floor(Math.random() * (max - min + 1) + min);
  }
  //initialize game variables
  progress = 0;
  gamePlaying = true;
  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("startBtnHard").classList.add("hidden");
  document.getElementById("startBtnIntermediate").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  document.getElementById("button5").classList.remove("hidden");
  document.getElementById("button6").classList.remove("hidden");
  level = "intermediate";
  playClueSequence();
}

function startGameHard() {
  tries = 0;
  for (let i = 0; i < 15; i++) {
    var min = Math.ceil(1);
    var max = Math.floor(8);
    patternHard[i] = Math.floor(Math.random() * (max - min + 1) + min);
  }
  //initialize game variables
  progress = 0;
  gamePlaying = true;
  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("startBtnHard").classList.add("hidden");
  document.getElementById("startBtnIntermediate").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  document.getElementById("button5").classList.remove("hidden");
  document.getElementById("button6").classList.remove("hidden");
  document.getElementById("button7").classList.remove("hidden");
  document.getElementById("button8").classList.remove("hidden");
  level = "hard";
  playClueSequence();
}

function stopGame() {
  clueHoldTime = 1000;
  //initialize game variables
  gamePlaying = false;
  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("startBtnIntermediate").classList.remove("hidden");
  document.getElementById("startBtnHard").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  document.getElementById("button5").classList.add("hidden");
  document.getElementById("button6").classList.add("hidden");
  document.getElementById("button7").classList.add("hidden");
  document.getElementById("button8").classList.add("hidden");
}

function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}

function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}

function playSingleClue(btn) {
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

function playClueSequence() {
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for (let i = 0; i <= progress; i++) {
    // for each clue that is revealed so far
    if (level == "easy") {
      console.log("play single clue: " + pattern[i] + " in " + delay + "ms");
      setTimeout(playSingleClue, delay, pattern[i]); // set a timeout to play that clue
    } else if (level == "intermediate") {
      console.log(
        "play single clue: " + patternIntermediate[i] + " in " + delay + "ms"
      );
      setTimeout(playSingleClue, delay, patternIntermediate[i]);
    } else {
      console.log(
        "play single clue: " + patternHard[i] + " in " + delay + "ms"
      );
      setTimeout(playSingleClue, delay, patternHard[i]);
    }
    //console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    //setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    clueHoldTime = clueHoldTime - 8;
    delay += clueHoldTime;
    delay += cluePauseTime;
  }
}

function guess(btn) {
  console.log("user guessed: " + btn);
  if (!gamePlaying) {
    return;
  }
  if (level == "easy") {
    if (pattern[guessCounter] != btn) {
      if (tries == 2) {
        loseGame();
      } else {
        tries++;
        alert("Strike " + tries + " your guess was wrong pick again!");
      }
    } else if (progress == guessCounter) {
      if (pattern.length - 1 == guessCounter) {
        winGame();
      } else {
        progress++;
        playClueSequence();
      }
    } else {
      guessCounter++;
    }
  }
  if (level == "intermediate") {
    if (patternIntermediate[guessCounter] != btn) {
      if (tries == 2) {
        loseGame();
      } else {
        tries++;
        alert("Strike " + tries + " , your guess was wrong pick again!");
      }
    } else if (progress == guessCounter) {
      if (patternIntermediate.length - 1 == guessCounter) {
        winGame();
      } else {
        progress++;
        playClueSequence();
      }
    } else {
      guessCounter++;
    }
  }
  if (level == "hard") {
    if (patternHard[guessCounter] != btn) {
      if (tries == 2) {
        loseGame();
      } else {
        tries++;
        alert("Strike " + tries + " your guess was wrong pick again!");
      }
    } else if (progress == guessCounter) {
      if (patternHard.length - 1 == guessCounter) {
        winGame();
      } else {
        progress++;
        playClueSequence();
      }
    } else {
      guessCounter++;
    }
  }
}

function loseGame() {
  stopGame();
  alert("Strike 3. You lost.");
}

function winGame() {
  stopGame();
  alert("Congratulations you won!");
}

// Sound Synthesis Functions
const freqMap = {
  1: 200.8,
  2: 500,
  3: 233.9,
  4: 354.7,
  5: 472.3,
  6: 329.6,
  7: 289.5,
  8: 307.4
};
function playTone(btn, len) {
  o.frequency.value = freqMap[btn];
  g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  tonePlaying = true;
  setTimeout(function() {
    stopTone();
  }, len);
}
function startTone(btn) {
  if (!tonePlaying) {
    o.frequency.value = freqMap[btn];
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    tonePlaying = true;
  }
}
function stopTone() {
  g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext();
var o = context.createOscillator();
var g = context.createGain();
g.connect(context.destination);
g.gain.setValueAtTime(0, context.currentTime);
o.connect(g);
o.start(0);
