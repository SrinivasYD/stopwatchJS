let timer;
let isRunning = false; // starting condition of stopwatch
let seconds = 0;
let laps = []; // To store laps
let secondsArr = []; // To store seconds for displaying laps

// Implementation of event handler function for start/stop button
function startStop() {
  if (isRunning) {
    clearInterval(timer);
    document.getElementById("startStop").innerText = "Start";
    document.getElementById("lapReset").innerText = "Reset";
  } else {
    timer = setInterval(updateDisplay, 10);
    document.getElementById("startStop").innerText = "Stop";
    document.getElementById("lapReset").innerText = "Lap";
  }
  isRunning = !isRunning;
}

// Implementation of event handler function for lap/reset button
function lapReset() {
  // Laps calculation when stopwatch is running
  if (isRunning) {
    secondsArr.push(seconds);
    if (secondsArr.length === 1) {
      laps.push(formatTime(secondsArr[0]));
    } else {
      laps.push(
        formatTime(
          secondsArr[secondsArr.length - 1] - secondsArr[secondsArr.length - 2]
        )
      );
    }
    updateLapsDisplay();
  } 
  // Resetting the stopwatch 
  else {
    if (document.getElementById("lapReset").innerText === "Reset") {
      clearInterval(timer);
      seconds = 0;
      secondsArr = [];
      laps = [];
      document.getElementById("display").innerText = "00:00.00";
      document.getElementById("laps").innerHTML = "";
    }
  }
}

// Displaying the laps 
function updateLapsDisplay() {
  let lapsList = document.getElementById("laps");
  lapsList.innerHTML = "";
  laps.forEach((lapTime, index) => {
    let lapItem = document.createElement("li");
    lapItem.innerText = `Lap ${index + 1}: ${lapTime}`;
    lapsList.appendChild(lapItem);
  });
}

// Displaying the stopwatch time
function updateDisplay() {
  seconds++;
  document.getElementById("display").innerText = formatTime(seconds);
}

// Format in which time will be displayed 
function formatTime(time) {
  let minutes = Math.floor((time % 360000) / 6000);
  let seconds = Math.floor((time % 6000) / 100);
  let milliseconds = time % 100;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
}
