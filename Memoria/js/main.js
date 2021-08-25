const level1 = document.querySelector('#level1');
const level2 = document.querySelector('#level2');
const level3 = document.querySelector('#level3');

const board1 = document.querySelectorAll('.board1');
const board2 = document.querySelectorAll('.board2');
const board3 = document.querySelectorAll('.board3');

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

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function clearCards() {
    if (levelId == 1) {
        for (let i = 0; i < board1.length; i++) {
            if (board1[i].classList.contains('active')) {
                board1[i].classList.contains('active');
            }
        }
    } else if (levelId == 2) {
        for (let i = 0; i < board2.length; i++) {
            if (board2[i].classList.contains('active')) {
                board2[i].classList.contains('active');
            }
        }
    } else if (levelId == 3) {
        for (let i = 0; i < board3.length; i++) {
            if (board3[i].classList.contains('active')) {
                board3[i].classList.contains('active');
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
        showActiveBt('#level1');
        hideActiveBt('#level2');
        hideActiveBt('#level3');

    } else if (levelEvent == 'level2') {
        positionMax = 20;
        cardMax = 10;
        levelId = 2;
        hideActiveBt('#level1');
        showActiveBt('#level2');
        hideActiveBt('#level3');
    } else if (levelEvent == 'level3') {
        positionMax = 24;
        cardMax = 12;
        levelId = 3;
        hideActiveBt('#level1');
        hideActiveBt('#level2');
        showActiveBt('#level3');
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

    level1.addEventListener('click', levelSelect);
    level2.addEventListener('click', levelSelect);
    level3.addEventListener('click', levelSelect);

    newGameButton.addEventListener('click', play);
}


function play() {

    boardGenerate(levelId);
    showBoard(levelId);

    hideContent('#part-1');
    showContent('#part-2');

    returnButton.addEventListener('click', start);

    waitMove();
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

function stopMove() {
    if (levelId == 1) {
        for (let k = 0; k < board1.length; k++) {
            board1[k].removeEventListener('click', makeMove);
        }
    } else if (levelId == 2) {
        for (let k = 0; k < board2.length; k++) {
            board2[k].removeEventListener('click', makeMove);
        }
    } else if (levelId == 3) {
        for (let k = 0; k < board3.length; k++) {
            board3[k].removeEventListener('click', makeMove);
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

    const selectCard1 = validateCard[0];
    const selectCard2 = validateCard[1];

    if (validateCard.length == 2) {
        stopMove();
        setTimeout(validateMove, 1500, selectCard1, selectCard2);
    }


}

function validateMove(check1, check2) {


    if (checkPos[check1] != checkPos[check2]) {
        hideActive(saveId[0]);
        hideActive(saveId[1]);
    } else if (checkPos[check1] == checkPos[check2]) {
        moves.push(1)
    }

    if ((levelId == 1 && moves.length == 8) || (levelId == 2 && moves.length == 10) || (levelId == 3 && moves.length == 12)) {
        endMessage.textContent = 'Parabéns!! Ganhaste!';
        showContent('#end-message');
        setTimeout(start, 4000);
    }

    validateCard = [];
    saveId = [];

    waitMove();
}


start();