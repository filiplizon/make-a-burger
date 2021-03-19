class Summary {
    setTime() {
        const currentDate = new Date();
        const deliveryDate = new Date(currentDate.getTime() + timesToDeliver[Math.floor(Math.random() * timesToDeliver.length)] * 60000);
        const deliveryTime = deliveryDate - currentDate;
        const minutes = Math.floor(deliveryTime / 1000 / 60) % 60;
        const seconds = Math.floor(deliveryTime / 1000) % 60;
        countedMinutes = minutes;
        countedSeconds = seconds;
        this.showDeliveryTime(minutes, seconds);
        counting = setInterval(this.countTime, 1000);
    }

    countTime() {
        --countedSeconds;
        if (countedSeconds < 0) {
            --countedMinutes;
            countedSeconds = 59;
        }
        if (countedMinutes === 0 && countedSeconds === 0) {
            clearInterval(counting);
        }
        deliveryTimeSpan.textContent = `00:${countedMinutes < 10 ? '0' + countedMinutes : countedMinutes}:${countedSeconds < 10 ? '0' + countedSeconds : countedSeconds}`;
    }

    showDeliveryTime(minutes, seconds) {
        deliveryTimeSpan.textContent = `00:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }
}

const summary = new Summary();