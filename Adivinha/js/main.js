let randomGeneratedNumber;
let maxAttempts;

const value = {
    minValue: 1,
    maxValue: 100
};

const number = document.querySelector('#number');
const levelSelect = document.querySelector('#level');
const timerContent = document.querySelector('#countdown');
const attemptNumber = document.querySelector('#attempts')
const attemptList = document.querySelector('#numberlist');
const winnerIcon = document.querySelector('#winner');
const looserIcon = document.querySelector('#looser');
const endMessage = document.querySelector('#message');
const playButton = document.querySelector('#play');
const confirmButton = document.querySelector('#confirm');
const newGameButton = document.querySelector('#new-game');


function showContent(id) {
    const element = document.querySelector(id);
    if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
    }
}

function hideContent(id) {
    const element = document.querySelector(id);
    if (!element.classList.contains('hidden')) {
        element.classList.add('hidden');
    }
}

function reset() {
    number.value = '';
    number.focus();
}

function clearList() {

    while (attemptList.firstChild) {
        attemptList.removeChild(attemptList.firstChild);
    }

}


function countdown() {

    if (seconds == 0) {
        minutes--;
        seconds = 59;
    }

    if (seconds < 10) {
        timerContent.textContent = `0${minutes}:0${seconds}`;
        if (minutes == 0) {
            timerContent.classList.add('end-time');
        }
    } else {
        timerContent.textContent = `0${minutes}:${seconds}`;
    }

    seconds--;

}


function start() {

    showContent('.part-1');
    hideContent('.part-2');
    hideContent('.part-3');
    hideContent('#play');
    hideContent('#attempts');
    clearList()
    levelSelect.selectedIndex = 0;
    reset();

    levelSelect.addEventListener('change', maxMoves);

    playButton.addEventListener('click', play);
}


function maxMoves() {

    if (levelSelect.selectedIndex == '0') {
        hideContent('#play');
    } else if (levelSelect.selectedIndex == '1') {
        showContent('#play');
        maxAttempts = 15;
        minutes = 2;
        seconds = 0;
        timerContent.textContent = `0${minutes}:0${seconds}`;
    } else if (levelSelect.selectedIndex == '2') {
        showContent('#play');
        maxAttempts = 10;
        minutes = 1;
        seconds = 0;
        timerContent.textContent = `0${minutes}:0${seconds}`;
    } else if (levelSelect.selectedIndex == '3') {
        showContent('#play');
        maxAttempts = 5;
        minutes = 0;
        seconds = 30;
        timerContent.textContent = `0${minutes}:${seconds}`;
    }

}


function play() {

    timerContent.classList.remove('end-time');
    hideContent('.part-1');
    showContent('.part-2');
    hideContent('.part-3');
    reset();
    startGame();
    timeOut(true);
    nextMove();
}


function startGame() {
    randomGeneratedNumber = parseInt(Math.ceil(Math.random()*100));
    moves = [];
}


function timeOut(time) {

    if (time == true) {
        if (maxAttempts == 15) {
            countdownTimer = setInterval(countdown, 1000);
            timer = setTimeout(endTime, 119000);
        } else if (maxAttempts == 10) {
            countdownTimer = setInterval(countdown, 1000);
            timer = setTimeout(endTime, 60000);
        } else {
            countdownTimer = setInterval(countdown, 1000);
            timer = setTimeout(endTime, 31000);
        }
    }
    if (time == false) {
        clearTimeout(timer);
        clearInterval(countdownTimer);
    }
}


function endTime() {

    hideContent('.part-1');
    hideContent('.part-2');
    showContent('.part-3');
    timeOut(false);

    hideContent('#winner');
    showContent('#looser');
    endMessage.textContent = `Ficaste sem tempo! O número era o  ${randomGeneratedNumber}.`

    newGame();

}


function nextMove() {
    number.addEventListener('keyup', function(event) {
        if (event.keyCode === 13) {
            makeMove();
        }
    });
    confirmButton.addEventListener('click', makeMove);
}


function makeMove() {

    const move = number.value;

    if (move >= value.minValue && move <= value.maxValue) {
        if (!moves.includes(move)) {
            moves.push(move);
            hideContent('#error');
            hideContent('#duplicate');
            validateMove();
            reset();
        } else if (moves.includes(move)) {
            hideContent('#error');
            showContent('#duplicate');
            reset();
        } 
    }
    reset();
}


function validateMove() {

    const move = moves[moves.length - 1];
    const attemptsRem = maxAttempts - moves.length
    const li = document.createElement('li');
    const span = document.createElement('span');

    li.textContent = move;

    if (moves.length < maxAttempts) {

        attemptList.appendChild(li);
        
        if (attemptsRem > 1) {
            attemptNumber.textContent = `Ainda tens mais ${attemptsRem} tentativas!`
            showContent('#attempts');
        } else {
            attemptNumber.textContent = `Esta é a tua última tentativa!`
        }

        if (move > randomGeneratedNumber) {
            li.appendChild(span);
            span.classList.add('arrow-down');
        } else if ( move < randomGeneratedNumber) {
            li.appendChild(span);
            span.classList.add('arrow-up');
        } else {
            endGame();
        }
    } else {
        endGame();
    }
}


function endGame() {

    hideContent('.part-1');
    hideContent('.part-2');
    showContent('.part-3');
    timeOut(false);

    const lastmove = moves[moves.length - 1];
    const winmove = randomGeneratedNumber;

    if (lastmove == winmove) {
        hideContent('#looser');
        showContent('#winner');
        endMessage.textContent = `Parabéns!!! Ganhaste em ${moves.length} tentativas.`
    } else {
        hideContent('#winner');
        showContent('#looser');
        endMessage.textContent = `Perdeste!!! O número era o  ${randomGeneratedNumber}.`
    }

    newGame();
}


function newGame() {
    newGameButton.addEventListener('click', start)
}


start();