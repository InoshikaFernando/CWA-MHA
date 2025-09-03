function startTimer() {
  let startTime = Date.now();
  timerInterval = setInterval(() => {
    elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('timer').innerText = `Time: ${elapsedTime} sec`;
  }, 1000);
}


function stopTimer() {
  clearInterval(timerInterval);
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
}

function handleQuizProgress() {
    if (questionCount === 0) {
        startTimer();
      }
      if (questionCount >= totalQuestions) {
        stopTimer();
        let timeUsed = elapsedTime || 1; // Avoid division by zero
        let points = Math.round((correctCount / timeUsed) * 100 * level);
        document.getElementById('finalScore').innerText = 
          `🎉 Quiz Finished! You got ${correctCount} out of ${totalQuestions} correct.`;
        document.getElementById('points').innerText = `Points: ${points}`;
        document.getElementById('answer').disabled = true;
        document.getElementById('checkBtn').disabled = true;
        return;
      }
}