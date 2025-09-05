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
      // Quiz completion logic is now handled in checkAnswer() function
}

function showCertificate(points, correctCount, totalQuestions, level, elapsedTime) {
  // Determine certificate tier based on points
  let certificateData = getCertificateTier(points, correctCount, totalQuestions, level, elapsedTime);
  
  // Create certificate modal
  const certificateModal = document.createElement('div');
  certificateModal.id = 'certificateModal';
  certificateModal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `;
  
  const certificate = document.createElement('div');
  certificate.style.cssText = `
    background: white;
    padding: 40px;
    border-radius: 15px;
    text-align: center;
    max-width: 600px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    position: relative;
  `;
  
  certificate.innerHTML = `
    <div style="border: 5px solid ${certificateData.borderColor}; border-radius: 10px; padding: 30px; background: ${certificateData.backgroundGradient};">
      <div style="font-size: 48px; color: ${certificateData.iconColor}; margin-bottom: 20px;">${certificateData.icon}</div>
      <h1 style="color: #2c3e50; margin-bottom: 10px; font-size: 32px;">${certificateData.title}</h1>
      <h2 style="color: ${certificateData.subtitleColor}; margin-bottom: 20px; font-size: 24px;">${certificateData.subtitle}</h2>
      <p style="font-size: 18px; color: #34495e; margin-bottom: 15px;">This certifies that</p>
      <div style="font-size: 24px; font-weight: bold; color: #2c3e50; margin-bottom: 20px; padding: 10px; background: #ecf0f1; border-radius: 5px;">Student</div>
      <p style="font-size: 18px; color: #34495e; margin-bottom: 15px;">has successfully completed the Addition Practice</p>
      <p style="font-size: 18px; color: #34495e; margin-bottom: 15px;">with a score of ${correctCount}/${totalQuestions}</p>
      <p style="font-size: 18px; color: #34495e; margin-bottom: 15px;">earning ${points} points in Level ${level}</p>
      <p style="font-size: 16px; color: #7f8c8d; margin-bottom: 20px;">${certificateData.achievement}</p>
      <div style="display: flex; justify-content: space-between; margin-top: 30px;">
        <div style="text-align: left;">
          <p style="font-size: 14px; color: #7f8c8d; margin: 0;">Date: ${new Date().toLocaleDateString()}</p>
        </div>
        <div style="text-align: right;">
          <p style="font-size: 14px; color: #7f8c8d; margin: 0;">Time: ${elapsedTime} seconds</p>
        </div>
      </div>
    </div>
    <div style="margin-top: 20px;">
      <button onclick="printCertificate()" style="background: #27ae60; color: white; border: none; padding: 12px 24px; border-radius: 5px; cursor: pointer; margin: 5px; font-size: 16px;">🖨️ Print Certificate</button>
      <button onclick="downloadCertificate()" style="background: #3498db; color: white; border: none; padding: 12px 24px; border-radius: 5px; cursor: pointer; margin: 5px; font-size: 16px;">💾 Download</button>
      <button onclick="closeCertificate()" style="background: #e74c3c; color: white; border: none; padding: 12px 24px; border-radius: 5px; cursor: pointer; margin: 5px; font-size: 16px;">❌ Close</button>
    </div>
  `;
  
  certificateModal.appendChild(certificate);
  document.body.appendChild(certificateModal);
}

function getCertificateTier(points, correctCount, totalQuestions, level, elapsedTime) {
  // Certificate tiers based on points
  if (points >= 500) {
    return {
      icon: "🏆",
      title: "Certificate of Mastery",
      subtitle: "Addition Legend",
      borderColor: "#ffd700",
      backgroundGradient: "linear-gradient(135deg, #fff8dc, #f0e68c)",
      iconColor: "#ffd700",
      subtitleColor: "#8b4513",
      achievement: "Outstanding performance! You've achieved legendary status in addition!"
    };
  } else if (points >= 300) {
    return {
      icon: "🥇",
      title: "Certificate of Excellence",
      subtitle: "Addition Expert",
      borderColor: "#ff6b35",
      backgroundGradient: "linear-gradient(135deg, #ffeaa7, #fab1a0)",
      iconColor: "#ff6b35",
      subtitleColor: "#d63031",
      achievement: "Excellent work! You've mastered addition with exceptional speed and accuracy!"
    };
  } else if (points >= 200) {
    return {
      icon: "🥈",
      title: "Certificate of Achievement",
      subtitle: "Addition Pro",
      borderColor: "#74b9ff",
      backgroundGradient: "linear-gradient(135deg, #a8e6cf, #74b9ff)",
      iconColor: "#74b9ff",
      subtitleColor: "#0984e3",
      achievement: "Great job! You've shown strong skills in addition practice!"
    };
  } else if (points >= 100) {
    return {
      icon: "🥉",
      title: "Certificate of Completion",
      subtitle: "Addition Learner",
      borderColor: "#a29bfe",
      backgroundGradient: "linear-gradient(135deg, #dda0dd, #a29bfe)",
      iconColor: "#a29bfe",
      subtitleColor: "#6c5ce7",
      achievement: "Well done! You've completed the addition practice successfully!"
    };
  } else {
    return {
      icon: "📜",
      title: "Certificate of Participation",
      subtitle: "Addition Student",
      borderColor: "#636e72",
      backgroundGradient: "linear-gradient(135deg, #ddd6fe, #a8a8a8)",
      iconColor: "#636e72",
      subtitleColor: "#2d3436",
      achievement: "Good effort! Keep practicing to improve your addition skills!"
    };
  }
}

function printCertificate() {
  // Get the certificate data from the current modal
  const certificateModal = document.getElementById('certificateModal');
  if (!certificateModal) return;
  
  const certificateDiv = certificateModal.querySelector('div[style*="border: 5px solid"]');
  if (!certificateDiv) return;
  
  // Extract the certificate content
  const icon = certificateDiv.querySelector('div[style*="font-size: 48px"]')?.textContent || '🏆';
  const title = certificateDiv.querySelector('h1')?.textContent || 'Certificate of Excellence';
  const subtitle = certificateDiv.querySelector('h2')?.textContent || 'Addition Master';
  const scoreText = certificateDiv.querySelectorAll('p')[1]?.textContent || '';
  const pointsText = certificateDiv.querySelectorAll('p')[2]?.textContent || '';
  const achievementText = certificateDiv.querySelectorAll('p')[3]?.textContent || '';
  const dateText = certificateDiv.querySelector('.footer div:first-child p')?.textContent || `Date: ${new Date().toLocaleDateString()}`;
  const timeText = certificateDiv.querySelector('.footer div:last-child p')?.textContent || 'Time: 0 seconds';
  
  // Create print window
  const printWindow = window.open('', '_blank', 'width=800,height=600');
  
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title} - ${subtitle}</title>
        <style>
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
          body { 
            font-family: Arial, sans-serif; 
            margin: 0; 
            padding: 20px; 
            background: white;
          }
          .certificate { 
            border: 5px solid #f39c12; 
            border-radius: 10px; 
            padding: 30px; 
            background: linear-gradient(135deg, #f8f9fa, #e9ecef); 
            text-align: center; 
            max-width: 600px;
            margin: 0 auto;
          }
          h1 { color: #2c3e50; margin-bottom: 10px; font-size: 32px; }
          h2 { color: #8e44ad; margin-bottom: 20px; font-size: 24px; }
          .trophy { font-size: 48px; color: #f39c12; margin-bottom: 20px; }
          .student-name { 
            font-size: 24px; 
            font-weight: bold; 
            color: #2c3e50; 
            margin-bottom: 20px; 
            padding: 10px; 
            background: #ecf0f1; 
            border-radius: 5px; 
          }
          .details { font-size: 18px; color: #34495e; margin-bottom: 15px; }
          .achievement { font-size: 16px; color: #7f8c8d; margin-bottom: 20px; }
          .footer { display: flex; justify-content: space-between; margin-top: 30px; }
          .footer p { font-size: 14px; color: #7f8c8d; margin: 0; }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="trophy">${icon}</div>
          <h1>${title}</h1>
          <h2>${subtitle}</h2>
          <p class="details">This certifies that</p>
          <div class="student-name">Student</div>
          <p class="details">has successfully completed the Addition Practice</p>
          <p class="details">${scoreText}</p>
          <p class="details">${pointsText}</p>
          <p class="achievement">${achievementText}</p>
          <div class="footer">
            <div>
              <p>${dateText}</p>
            </div>
            <div>
              <p>${timeText}</p>
            </div>
          </div>
        </div>
        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}

function downloadCertificate() {
  // Get the certificate data from the current modal
  const certificateModal = document.getElementById('certificateModal');
  if (!certificateModal) return;
  
  const certificateDiv = certificateModal.querySelector('div[style*="border: 5px solid"]');
  if (!certificateDiv) return;
  
  // Extract the certificate content
  const icon = certificateDiv.querySelector('div[style*="font-size: 48px"]')?.textContent || '🏆';
  const title = certificateDiv.querySelector('h1')?.textContent || 'Certificate of Excellence';
  const subtitle = certificateDiv.querySelector('h2')?.textContent || 'Addition Master';
  const scoreText = certificateDiv.querySelectorAll('p')[1]?.textContent || '';
  const pointsText = certificateDiv.querySelectorAll('p')[2]?.textContent || '';
  const achievementText = certificateDiv.querySelectorAll('p')[3]?.textContent || '';
  const dateText = certificateDiv.querySelector('.footer div:first-child p')?.textContent || `Date: ${new Date().toLocaleDateString()}`;
  const timeText = certificateDiv.querySelector('.footer div:last-child p')?.textContent || 'Time: 0 seconds';
  
  // Create HTML content for download
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title} - ${subtitle}</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 0; 
            padding: 20px; 
            background: white;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }
          .certificate { 
            border: 5px solid #f39c12; 
            border-radius: 10px; 
            padding: 30px; 
            background: linear-gradient(135deg, #f8f9fa, #e9ecef); 
            text-align: center; 
            max-width: 600px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
          h1 { color: #2c3e50; margin-bottom: 10px; font-size: 32px; }
          h2 { color: #8e44ad; margin-bottom: 20px; font-size: 24px; }
          .trophy { font-size: 48px; color: #f39c12; margin-bottom: 20px; }
          .student-name { 
            font-size: 24px; 
            font-weight: bold; 
            color: #2c3e50; 
            margin-bottom: 20px; 
            padding: 10px; 
            background: #ecf0f1; 
            border-radius: 5px; 
          }
          .details { font-size: 18px; color: #34495e; margin-bottom: 15px; }
          .achievement { font-size: 16px; color: #7f8c8d; margin-bottom: 20px; }
          .footer { display: flex; justify-content: space-between; margin-top: 30px; }
          .footer p { font-size: 14px; color: #7f8c8d; margin: 0; }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="trophy">${icon}</div>
          <h1>${title}</h1>
          <h2>${subtitle}</h2>
          <p class="details">This certifies that</p>
          <div class="student-name">Student</div>
          <p class="details">has successfully completed the Addition Practice</p>
          <p class="details">${scoreText}</p>
          <p class="details">${pointsText}</p>
          <p class="achievement">${achievementText}</p>
          <div class="footer">
            <div>
              <p>${dateText}</p>
            </div>
            <div>
              <p>${timeText}</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
  
  // Create and download the HTML file
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `addition-certificate-${new Date().toISOString().split('T')[0]}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function closeCertificate() {
  const modal = document.getElementById('certificateModal');
  if (modal) {
    document.body.removeChild(modal);
  }
}