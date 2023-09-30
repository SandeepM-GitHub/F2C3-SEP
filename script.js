document.addEventListener('DOMContentLoaded', function () {
    // Array to store active timers
    const activeTimers = [];

    // Function to create a new timer
    function createNewTimer(hours, minutes, seconds) {
        const totalTime = hours * 3600 + minutes * 60 + seconds;

        if (totalTime <= 0) {
            alert('Please enter a valid time.');
            return;
        }

        const timer = {
            totalTime,
            intervalId: null,
        };

        activeTimers.push(timer);

        // Create timer element in the Active Timers Display Section
        const timerItem = document.createElement('div');
        timerItem.className = 'timer-item';
        timerItem.innerHTML = `
            <span>${hours}:${minutes}:${seconds}</span>
            <button class="stop-timer">Stop Timer</button>
        `;

        document.querySelector('.active-timers-section').appendChild(timerItem);

        // Start the timer
        timer.intervalId = setInterval(() => {
            timer.totalTime--;

            // Update the timer display
            const timerDisplay = timerItem.querySelector('span');
            const hoursRemaining = Math.floor(timer.totalTime / 3600);
            const minutesRemaining = Math.floor((timer.totalTime % 3600) / 60);
            const secondsRemaining = timer.totalTime % 60;
            timerDisplay.textContent = `${hoursRemaining}:${minutesRemaining}:${secondsRemaining}`;

            if (timer.totalTime <= 0) {
                // Timer has ended
                clearInterval(timer.intervalId);
                timerDisplay.textContent = '00:00:00';

                // Update the timer end display
                timerItem.classList.add('timer-ended');
                timerItem.innerHTML += '<div class="timer-end-message">Timer Ended</div>';

                // Play an audio alert
                const audio = new Audio('alert.mp3'); // Replace 'alert.mp3' with your audio file
                audio.play();

                // Remove the timer after a delay (e.g., 5 seconds)
                setTimeout(() => {
                    const index = activeTimers.indexOf(timer);
                    if (index !== -1) {
                        activeTimers.splice(index, 1);
                        timerItem.remove();
                    }
                }, 5000);
            }
        }, 1000);
    }

    // Event listener for the "Start New Timer" button
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', function () {
        const hoursInput = parseInt(document.getElementById('hours').value);
        const minutesInput = parseInt(document.getElementById('minutes').value);
        const secondsInput = parseInt
