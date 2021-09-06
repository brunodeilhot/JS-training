const level1 = document.querySelector('#level1');
const level2 = document.querySelector('#level2');
const level3 = document.querySelector('#level3');

const board1 = document.querySelectorAll('.board1');
const board2 = document.querySelectorAll('.board2');
const board3 = document.querySelectorAll('.board3');

const timerContent = document.querySelector('#countdown');

const frontCard = document.querySelectorAll('.front');

const newGameButton = document.querySelector('#new-game');

const returnButton = document.querySelector('#return');

const endMessage = document.querySelector('#end-message');

let levelId;
let positionMax;
let cardMax;

let validateCard = [];
let checkPos = [];
let saveId = [];
let moves = [];

function hideContent(id) {
    const element = document.querySelector(id);
    if (!element.classList.contains('hidden')) {
        element.classList.add('hidden');
    }
}

function showContent(id) {
    const element = document.querySelector(id);
    if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
    }
}

function showActive(id) {
    const element = document.getElementById(id);
    if (!element.classList.contains('active')) {
        element.classList.add('active');
    }
}

function hideActive(id) {
    const element = document.getElementById(id);
    if (element.classList.contains('active')) {
        element.classList.remove('active');
    }
}

function showActiveBt(id) {
    const element = document.querySelector(id);
    if (!element.classList.contains('active-bt')) {
        element.classList.add('active-bt');
    }
}

function hideActiveBt(id) {
    const element = document.querySelector(id);
    if (element.classList.contains('active-bt')) {
        element.classList.remove('active-bt');
    }
}

function addCard(level,id,cardId) {
    const element = document.querySelector('#pos'+level+'-'+id);
    if (!element.classList.contains('card-'+cardId)) {
        element.classList.add('card-'+cardId);
    }
}

function showBoard(id) {
    const element = document.querySelector('#board-'+id);
    if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
    }
}

function hideBoard(id) {
    const element = document.querySelector('#board-'+id);
    if (!element.classList.contains('hidden')) {
        element.classList.add('hidden');
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function removeClassByPrefix(element, prefix) {
	var regx = new RegExp('\\b' + prefix + '[^ ]*[ ]?\\b', 'g');
	element.className = element.className.replace(regx, '');
}

function clearCards() {
    if (levelId == 1) {
        for (let i = 0; i < board1.length; i++) {
            if (board1[i].classList.contains('active')) {
                board1[i].classList.remove('active');
            }
        }
    } else if (levelId == 2) {
        for (let i = 0; i < board2.length; i++) {
            if (board2[i].classList.contains('active')) {
                board2[i].classList.remove('active');
            }
        }
    } else if (levelId == 3) {
        for (let i = 0; i < board3.length; i++) {
            if (board3[i].classList.contains('active')) {
                board3[i].classList.remove('active');
            }
        }
    }
    for (let i = 0; i < frontCard.length; i++) {
        removeClassByPrefix(frontCard[i], 'card-');
    }
}

function turnAllCards() {
    if (levelId == 1) {
        for (let i = 0; i < board1.length; i++) {
            if (!board1[i].classList.contains('active')) {
                board1[i].classList.add('active');
            }
        }
    } else if (levelId == 2) {
        for (let i = 0; i < board2.length; i++) {
            if (!board2[i].classList.contains('active')) {
                board2[i].classList.add('active');
            }
        }
    } else if (levelId == 3) {
        for (let i = 0; i < board3.length; i++) {
            if (!board3[i].classList.contains('active')) {
                board3[i].classList.add('active');
            }
        }
    }
}

function boardGenerate(level) {

    checkPos = [];
    let rndInt;

    for (let i = 1; i <= positionMax; i++) {
        rndInt = randomIntFromInterval(1,cardMax);

        while (checkPos.indexOf(rndInt) != checkPos.lastIndexOf(rndInt)) {
            rndInt = randomIntFromInterval(1,cardMax);
        }

        if (checkPos.indexOf(rndInt) == checkPos.lastIndexOf(rndInt)) {
            checkPos.push(rndInt);
            addCard(level,i,rndInt);
        }

    }

}

function levelSelect(event) {

    showContent('#new-game');
    hideContent('#button-hidden');

    const levelEvent = event.target.id;

    if (levelEvent == 'level1') {
        positionMax = 16;
        cardMax = 8;
        levelId = 1;
        minutes = 2;
        seconds = 30;
        showActiveBt('#level1');
        hideActiveBt('#level2');
        hideActiveBt('#level3');

    } else if (levelEvent == 'level2') {
        positionMax = 20;
        cardMax = 10;
        levelId = 2;
        minutes = 2;
        seconds = 0;
        hideActiveBt('#level1');
        showActiveBt('#level2');
        hideActiveBt('#level3');
    } else if (levelEvent == 'level3') {
        positionMax = 24;
        cardMax = 12;
        levelId = 3;
        minutes = 1;
        seconds = 30;
        hideActiveBt('#level1');
        hideActiveBt('#level2');
        showActiveBt('#level3');
    }

}

function countdown() {

    if (minutes == 0 && seconds == 0) {
        timerContent.textContent = `00:00`;
        return;
    }

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

function timeOut(time) {

    if (time == true) {
        if (levelId == 1) {
            countdownTimer = setInterval(countdown, 1000);
            timer = setTimeout(endTime, 150000);
        } else if (levelId == 2) {
            countdownTimer = setInterval(countdown, 1000);
            timer = setTimeout(endTime, 120000);
        } else {
            countdownTimer = setInterval(countdown, 1000);
            timer = setTimeout(endTime, 90000);
        }
    }
    if (time == false) {
        clearTimeout(timer);
        clearInterval(countdownTimer);
    }
}

function start() {
    clearCards();
    hideContent('#part-2');
    hideContent('#board-1');
    hideContent('#board-2');
    hideContent('#board-3');
    hideContent('#new-game');
    hideContent('#end-message')
    showContent('#button-hidden');
    showContent('#part-1');
    hideActiveBt('#level1');
    hideActiveBt('#level2');
    hideActiveBt('#level3');

    timerContent.classList.remove('end-time');
    timerContent.textContent = ``;

    level1.addEventListener('click', levelSelect);
    level2.addEventListener('click', levelSelect);
    level3.addEventListener('click', levelSelect);

    newGameButton.addEventListener('click', play);
}


function play() {

    validateCard = [];
    saveId = [];
    moves = [];

    boardGenerate(levelId);
    showBoard(levelId);

    hideContent('#part-1');
    showContent('#part-2');

    timeOut(true);
    returnButton.addEventListener('click', returnStart);

    waitMove();
}

function returnStart() {
    timeOut(false);
    start();
}

function waitMove() {

    if (levelId == 1) {
        for (let k = 0; k < board1.length; k++) {
            board1[k].addEventListener('click', makeMove);
        }
    } else if (levelId == 2) {
        for (let k = 0; k < board2.length; k++) {
            board2[k].addEventListener('click', makeMove);
        }
    } else if (levelId == 3) {
        for (let k = 0; k < board3.length; k++) {
            board3[k].addEventListener('click', makeMove);
        }
    }

}


function makeMove(event) {

    const selectCard = event.currentTarget.id;
    const element = document.getElementById(selectCard);

    if (element.classList.contains('active')) {
        return
    }

    showActive(selectCard);
    saveId.push(selectCard);

    if (levelId == 1) {
        temp = selectCard.replace('1-', '')
    } else if (levelId == 2) {
        temp = selectCard.replace('2-', '')
    } else if (levelId == 3) {
        temp = selectCard.replace('3-', '')
    }
    
    validateCard.push(temp);

    if (validateCard.length == 2) {
        const selectCard1 = validateCard[0];
        const selectCard2 = validateCard[1];
        validateCard = [];
        validateMove(selectCard1, selectCard2);
    }


}

function validateMove(check1, check2) {

    if (checkPos[check1] != checkPos[check2]) {
        const selectCard1 = saveId[0];
        const selectCard2 = saveId[1];
        setTimeout(hideActive, 1500, selectCard1);
        setTimeout(hideActive, 1500, selectCard2);
    } else if (checkPos[check1] == checkPos[check2]) {
        moves.push(1)
    }

    if ((levelId == 1 && moves.length == 8) || (levelId == 2 && moves.length == 10) || (levelId == 3 && moves.length == 12)) {
        endMessage.textContent = 'Parabéns!! Ganhaste!';
        showContent('#end-message');
        setTimeout(start, 4000);
        timeOut(false);
    }

    validateCard = [];
    saveId = [];

    waitMove();
}

function endTime() {
    endMessage.textContent = 'Ohhh! Acabou-se o tempo!';
    showContent('#end-message');
    setTimeout(start, 4000);
    timeOut(false);
    turnAllCards();
}

start();