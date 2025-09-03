let startTime;
let timerStarted = false;
function startTimer() {
  console.log("Timer started");
  timerStarted = true;
  startTime = Date.now();
  timerInterval = setInterval(() => {
    elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('timer').innerText = `Time: ${elapsedTime} sec`;
  }, 1000);
}


function stopTimer() {
  console.log("Timer stopped");
  clearInterval(timerInterval);
  timerStarted = false;
}

function resetQuiz() {
  questionCount = 0;
  correctCount = 0;
  elapsedTime = 0;
  document.getElementById('score').innerText = "";
  document.getElementById('finalScore').innerText = "";
  document.getElementById('timer').innerText = "Time: 0 sec";
  document.getElementById('points').innerText = "";
  stopTimer();
  startTime = Date.now();
}

function handleQuizProgress() {
    if (questionCount === 0 && !timerStarted) {
        startTimer();
      }
      if (questionCount >= totalQuestions) {
        stopTimer();
        let timeUsed = elapsedTime || 1; // Avoid division by zero
        level = parseInt(document.getElementById('level').value, 10);
        let points = Math.round((correctCount / timeUsed) * 100 * Math.sqrt(level));
        document.getElementById('finalScore').innerText = 
          `🎉 Quiz Finished! You got ${correctCount} out of ${totalQuestions} correct.`;
        document.getElementById('points').innerText = `Points: ${points}`;
        document.getElementById('quizActive').style.display = 'none';
        return;
      }
}