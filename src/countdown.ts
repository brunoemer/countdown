interface TimeRemaining {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

class CountdownTimer {
    private targetDate: Date;
    private timerInterval: number | null = null;
    private lastValues: TimeRemaining = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    // You can change this target date to any date you want
    private readonly TARGET_DATE = new Date('2025-09-28T15:35:00').getTime();

    constructor() {
        this.targetDate = new Date(this.TARGET_DATE);
        this.init();
    }

    private init(): void {
        this.updateDisplay();
        this.startTimer();
        // this.updateTargetDateDisplay(); // Removed since target date element is hidden
    }

    private calculateTimeRemaining(): TimeRemaining {
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

    private formatTimeUnit(value: number): string {
        return value.toString().padStart(2, '0');
    }

    private animateChange(element: HTMLElement): void {
        element.classList.add('changed');
        setTimeout(() => {
            element.classList.remove('changed');
        }, 600);
    }

    private updateDisplay(): void {
        const timeRemaining = this.calculateTimeRemaining();

        const daysElement = document.getElementById('days') as HTMLElement;
        const hoursElement = document.getElementById('hours') as HTMLElement;
        const minutesElement = document.getElementById('minutes') as HTMLElement;
        const secondsElement = document.getElementById('seconds') as HTMLElement;

        if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
            console.error('Countdown elements not found');
            return;
        }

        // Update with animation if value changed
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

        // Check if countdown has ended
        if (timeRemaining.days === 0 && timeRemaining.hours === 0 && 
            timeRemaining.minutes === 0 && timeRemaining.seconds === 0) {
            this.onCountdownEnd();
        }
    }

    private updateTargetDateDisplay(): void {
        const targetDateElement = document.getElementById('target-date');
        if (targetDateElement) {
            const options: Intl.DateTimeFormatOptions = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            targetDateElement.textContent = this.targetDate.toLocaleDateString('en-US', options);
        }
    }

    private startTimer(): void {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        this.timerInterval = window.setInterval(() => {
            this.updateDisplay();
        }, 1000);
    }

    private onCountdownEnd(): void {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }

        // Show celebration message
        const titleElement = document.querySelector('.title') as HTMLElement;
        const subtitleElement = document.querySelector('.subtitle') as HTMLElement;
        
        if (titleElement && subtitleElement) {
            titleElement.textContent = '💕 Our Moment is Here! 💕';
            subtitleElement.textContent = 'Love has brought us to this perfect moment';
        }

        // Add celebration animation
        document.body.style.background = 'linear-gradient(135deg, #000000 0%, #7209b7 25%, #ff6b9d 50%, #7209b7 75%, #000000 100%)';
        
        // Optional: Add confetti or other celebration effects here
        this.addCelebrationEffect();
    }

    private addCelebrationEffect(): void {
        // Simple celebration effect - you can enhance this
        const countdownWrapper = document.querySelector('.countdown-wrapper') as HTMLElement;
        if (countdownWrapper) {
            countdownWrapper.style.animation = 'celebrate 2s ease-in-out infinite';
        }

        // Add CSS for celebration animation if not exists
        const style = document.createElement('style');
        style.textContent = `
            @keyframes celebrate {
                0%, 100% { transform: scale(1) rotate(0deg); }
                50% { transform: scale(1.05) rotate(2deg); }
            }
        `;
        document.head.appendChild(style);
    }

    public stop(): void {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    public setTargetDate(date: Date): void {
        this.targetDate = date;
        // this.updateTargetDateDisplay(); // Removed since target date element is hidden
        this.updateDisplay();
    }
}

// Initialize the countdown when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CountdownTimer();
}); 