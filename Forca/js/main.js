let maxAttempts;
let moves;
let levelId;
let word = [];
let letterAttempts = [];
let confirmLetter = [];
let autoIds = [];

const level1 = document.querySelector('#level1');
const level2 = document.querySelector('#level2');
const level3 = document.querySelector('#level3');

const newGameButton = document.querySelector('#new-game');
const restartButton = document.querySelector('#restart');
const returnButton = document.querySelector('#return');
const playButton = document.querySelector('#play');
const helpButton = document.querySelector('#help');

const letter = document.querySelector('#letter');
const letterUsed = document.querySelector('#letter-attempt');

const attemptsLeft = document.querySelector('#attempt-left');
const lastAttempt = document.querySelector('#attempt-last');
const notlastMessage = document.querySelector('#not-last-message');
const lastMessage = document.querySelector('#last-message');

const boatFrame = document.querySelector('#boat-frame');

const endMessage = document.querySelector('#end-message');

const easy = {
    1: 'navio',
    2: 'ouro',
    3: 'onda',
    4: 'areia',
    5: 'peixe',
    6: 'vela',
    7: 'vento',
    8: 'coral'
};

const normal = {
    1: 'pirata',
    2: 'canhao',
    3: 'espada',
    4: 'ancora',
    5: 'sereia',
    6: 'capitao',
    7: 'compasso'
};

const hard = {
    1: 'tesouro',
    2: 'papagaio',
    3: 'tubarao',
    4: 'tempestade',
    5: 'corrente',
    6: 'estrela',
    7: 'luneta'
};


// Função para adicionar ou remover classes a elementos

function changeElement(change, className, id) {
    const element = document.querySelector(id);
    if (change == 'remove') {
        if (element.classList.contains(className)) {
            element.classList.remove(className);
        }
    } else if (change == 'add') {
        if (!element.classList.contains(className)) {
            element.classList.add(className);
        }
    }
}


// Função para gerar número aleatorio entre intervalo a definir

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function removeClassByPrefix(element, prefix) {
	var regx = new RegExp('\\b' + prefix + '[^ ]*[ ]?\\b', 'g');
	element.className = element.className.replace(regx, '');
}



function start() {
    changeElement('add', 'hidden', '#part-2');
    changeElement('add', 'hidden', '#new-game');
    changeElement('remove', 'hidden', '#part-1');
    changeElement('remove', 'active', '#level1');
    changeElement('remove', 'active', '#level2');
    changeElement('remove', 'active', '#level3');
    changeElement('add', 'menu', '#menu');

    word = [];
    letterAttempts = [];
    confirmLetter = [];
    autoIds = [];

    level1.addEventListener('click', levelSelect);
    level2.addEventListener('click', levelSelect);
    level3.addEventListener('click', levelSelect);

    newGameButton.addEventListener('click', play);
}

function levelSelect(event) {

    changeElement('remove', 'hidden', '#new-game');
    changeElement('remove', 'menu', '#menu');

    const levelEvent = event.currentTarget.id

    if (levelEvent == 'level1') {
        levelId = 1;
        changeElement('add', 'active', '#level1');
        changeElement('remove', 'active', '#level2');
        changeElement('remove', 'active', '#level3');
    } else if (levelEvent == 'level2') {
        levelId = 2;
        changeElement('remove', 'active', '#level1');
        changeElement('add', 'active', '#level2');
        changeElement('remove', 'active', '#level3');
    } else if (levelEvent == 'level3') {
        levelId = 3;
        changeElement('remove', 'active', '#level1');
        changeElement('remove', 'active', '#level2');
        changeElement('add', 'active', '#level3');
    }

}

function play() {
    changeElement('add', 'hidden', '#part-1');
    changeElement('add', 'hidden', '#end-message');
    changeElement('add', 'hidden', '#help-message2');
    changeElement('add', 'hidden', '#last-message');
    changeElement('remove', 'hidden', '#not-last-message');
    changeElement('remove', 'hidden', '#help-message1');
    changeElement('remove', 'hidden', '#letter');
    changeElement('remove', 'hidden', '#play');
    changeElement('remove', 'hidden', '#part-2');

    letterUsed.textContent = '';

    word = [];
    letterAttempts = [];
    confirmLetter = [];
    autoIds = [];

    clearLetter();
    reset();
    generateWord();

    waitMove();

}

function generateWord() {

    if (levelId == 1) {
        maxAttempts = 6;
        wordId = randomIntFromInterval(1, 8);
        word = easy[wordId].split('');
    } else if (levelId == 2) {
        maxAttempts = 5;
        wordId = randomIntFromInterval(1, 7);
        word = normal[wordId].split('');
    } else if (levelId == 3) {
        maxAttempts = 4;
        wordId = randomIntFromInterval(1, 7);
        word = hard[wordId].split('');
    }

    attemptsLeft.textContent = `${maxAttempts}`;
    changeImage(maxAttempts);


    for (let i = 9; i >= word.length; i--) {
        const element = document.getElementById(i);

        if (!element.classList.contains('hide-letter')) {
            element.classList.add('hide-letter');
        }
    }

}

function waitMove() {

    letter.addEventListener('keyup', function(event) {
        if (event.keyCode === 13) {
            makeMove();
        }
    });
    playButton.addEventListener('click', makeMove);
    helpButton.addEventListener('click', helpMove);
    restartButton.addEventListener('click', play);
    returnButton.addEventListener('click', start);
}

function makeMove() {
    const move = letter.value;

    if (word.indexOf(move) == -1 && maxAttempts == 1) {
        changeElement('add', 'hidden', '#letter');
        changeElement('add', 'hidden', '#play');
        changeElement('remove', 'hidden', '#end-message');
        changeElement('add', 'hidden', '#last-message');
        endMessage.textContent = `Oh não!! O teu barco foi destruído!`
        maxAttempts--;
        letterUsed.textContent = `${letterAttempts}`;
        changeImage(maxAttempts);
        return;
    } else if (word.indexOf(move) == -1 && maxAttempts == 2) {
        changeElement('add', 'hidden', '#not-last-message');
        changeElement('remove', 'hidden', '#last-message');
        lastAttempt.textContent = `Esta é a tua última tentativa!!`;
        letterAttempts.push(move);
        maxAttempts--;
        letterUsed.textContent = `${letterAttempts}`;
        changeImage(maxAttempts);
        reset();
        return;
    } else if (word.indexOf(move) == -1 && letterAttempts.includes(move)) {
        reset();
        return;
    } else if (confirmLetter.includes(move)) {
        reset();
        return;
    } else if (move == '') {
        reset();
        return;
    } else if (word.indexOf(move) == -1) {
        letterAttempts.push(move);
        maxAttempts--;
        attemptsLeft.textContent = `${maxAttempts}`;
        letterUsed.textContent = `${letterAttempts}`;
        changeImage(maxAttempts);
        reset();
        return;
    } else {
        index = word.indexOf(move);

        while (index != -1) {
            addLetter(index, move);
            confirmLetter.push(move);
            index = word.indexOf(move, index + 1);
        }
        reset();
    }

    if (word.length == confirmLetter.length) {
        changeElement('add', 'hidden', '#letter');
        changeElement('add', 'hidden', '#play');
        changeElement('remove', 'hidden', '#end-message');
        changeElement('add', 'hidden', '#not-last-message');
        changeElement('add', 'hidden', '#last-message');
        endMessage.textContent = `Boa!! Escapaste aos piratas!`
        changeImage('win');
        helpButton.removeEventListener('click', helpMove);
    }
}

function addLetter(index, letter) {
    const element = document.getElementById(index);
    
    element.textContent = `${letter}`;
}

function clearLetter() {
    for (let i = 0; i < 10; i++) {
        const element = document.getElementById(i)
        element.textContent = '';
        element.classList.remove('hide-letter');
    }
}

function reset() {
    letter.value = '';
    letter.focus();
}

function changeImage(attempt) {
    removeClassByPrefix(boatFrame, 'attempt-');
    boatFrame.classList.add('attempt-' + attempt);
}

function helpMove() {

    if (autoIds.length > 1) {
        changeElement('add', 'hidden', '#help-message1');
        changeElement('remove', 'hidden', '#help-message2');
        reset();
        return;
    }

    if (maxAttempts == 2) {
        changeElement('add', 'hidden', '#not-last-message');
        changeElement('remove', 'hidden', '#last-message');
        lastAttempt.textContent = `Esta é a tua última tentativa!!`;
    }

    if (maxAttempts == 1) {
        changeElement('add', 'hidden', '#letter');
        changeElement('add', 'hidden', '#play');
        changeElement('remove', 'hidden', '#end-message');
        changeElement('add', 'hidden', '#last-message');
        endMessage.textContent = `Oh não!! O teu barco foi destruído!`
    }

    maxAttempts--;
    attemptsLeft.textContent = `${maxAttempts}`;
    changeImage(maxAttempts);

    const maxLetter = word.length - 1;
    randomLetter = randomIntFromInterval(0, maxLetter);
    autoLetter = word[randomLetter];

    while (confirmLetter.includes(autoLetter)) {
        randomLetter = randomIntFromInterval(0, maxLetter);
        autoLetter = word[randomLetter];
    }

    autoIds.push(autoLetter);
    index = word.indexOf(autoLetter);

    while (index != -1) {
        addLetter(index, autoLetter);
        confirmLetter.push(autoLetter);
        index = word.indexOf(autoLetter, index + 1);
    }
    reset();

    if (word.length == confirmLetter.length) {
        changeElement('add', 'hidden', '#letter');
        changeElement('add', 'hidden', '#play');
        changeElement('add', 'hidden', '#not-last-message');
        changeElement('add', 'hidden', '#last-message');
        changeElement('remove', 'hidden', '#end-message');
        endMessage.textContent = `Boa!! Escapaste aos piratas!`
        changeImage('win');
        helpButton.removeEventListener('click', helpMove);
    }

}



start()