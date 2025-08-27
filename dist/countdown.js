"use strict";
class CountdownTimer {
    constructor() {
        this.timerInterval = null;
        this.lastValues = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        this.TARGET_DATE = new Date('2025-09-28T15:35:00').getTime();
        this.targetDate = new Date(this.TARGET_DATE);
        this.init();
    }
    init() {
        this.updateDisplay();
        this.startTimer();
    }
    calculateTimeRemaining() {
        const now = new Date().getTime();
        const distance = this.targetDate.getTime() - now;
        if (distance < 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        return { days, hours, minutes, seconds };
    }
    formatTimeUnit(value) {
        return value.toString().padStart(2, '0');
    }
    animateChange(element) {
        element.classList.add('changed');
        setTimeout(() => {
            element.classList.remove('changed');
        }, 600);
    }
    updateDisplay() {
        const timeRemaining = this.calculateTimeRemaining();
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
            console.error('Countdown elements not found');
            return;
        }
        if (timeRemaining.days !== this.lastValues.days) {
            daysElement.textContent = this.formatTimeUnit(timeRemaining.days);
            this.animateChange(daysElement);
        }
        if (timeRemaining.hours !== this.lastValues.hours) {
            hoursElement.textContent = this.formatTimeUnit(timeRemaining.hours);
            this.animateChange(hoursElement);
        }
        if (timeRemaining.minutes !== this.lastValues.minutes) {
            minutesElement.textContent = this.formatTimeUnit(timeRemaining.minutes);
            this.animateChange(minutesElement);
        }
        if (timeRemaining.seconds !== this.lastValues.seconds) {
            secondsElement.textContent = this.formatTimeUnit(timeRemaining.seconds);
            this.animateChange(secondsElement);
        }
        this.lastValues = timeRemaining;
        if (timeRemaining.days === 0 && timeRemaining.hours === 0 &&
            timeRemaining.minutes === 0 && timeRemaining.seconds === 0) {
            this.onCountdownEnd();
        }
    }
    updateTargetDateDisplay() {
        const targetDateElement = document.getElementById('target-date');
        if (targetDateElement) {
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            targetDateElement.textContent = this.targetDate.toLocaleDateString('en-US', options);
        }
    }
    startTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        this.timerInterval = window.setInterval(() => {
            this.updateDisplay();
        }, 1000);
    }
    onCountdownEnd() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        const titleElement = document.querySelector('.title');
        const subtitleElement = document.querySelector('.subtitle');
        if (titleElement && subtitleElement) {
            titleElement.textContent = '💕 Our Moment is Here! 💕';
            subtitleElement.textContent = 'Love has brought us to this perfect moment';
        }
        document.body.style.background = 'linear-gradient(135deg, #000000 0%, #7209b7 25%, #ff6b9d 50%, #7209b7 75%, #000000 100%)';
        this.addCelebrationEffect();
    }
    addCelebrationEffect() {
        const countdownWrapper = document.querySelector('.countdown-wrapper');
        if (countdownWrapper) {
            countdownWrapper.style.animation = 'celebrate 2s ease-in-out infinite';
        }
        const style = document.createElement('style');
        style.textContent = `
            @keyframes celebrate {
                0%, 100% { transform: scale(1) rotate(0deg); }
                50% { transform: scale(1.05) rotate(2deg); }
            }
        `;
        document.head.appendChild(style);
    }
    stop() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    setTargetDate(date) {
        this.targetDate = date;
        this.updateDisplay();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new CountdownTimer();
});
