const playButton = document.querySelector('#play');

const gameStart = document.querySelector('#part-1');
const gameNext = document.querySelector('#part-2');

const endMessage1 = document.querySelector('#message1');
const endMessage2 = document.querySelector('#message2');

const line = document.querySelector('#winline');

const square = document.querySelectorAll('.square');

const player1 = 'Jogador 1';
const player2 = 'Jogador 2';

let endGameCheck = false;


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

function playerWait(id) {
    const element = document.querySelector(id);
    if (element.classList.contains('player-active')) {
        element.classList.remove('player-active');
    }
}

function playerActive(id) {
    const element = document.querySelector(id);
    if (!element.classList.contains('player-active')) {
        element.classList.add('player-active');
    }
}

function addPlayer1(id) {
    const element = document.getElementById(id);
    if (!element.classList.contains('square-p1','square-p2')) {
        element.classList.add('square-p1');
        element.classList.remove('square-'+id);
    }
}

function addPlayer2(id) {
    const element = document.getElementById(id);
    if (!element.classList.contains('square-p1','square-p2')) {
        element.classList.add('square-p2');
        element.classList.remove('square-'+id);
    }
}

function clearSquares() {

    const element = document.querySelectorAll('.square');

    for (let i = 0; i < element.length; i++) {
        if (element[i].classList.contains('square-p1') || element[i].classList.contains('square-p2')) {
            element[i].classList.remove('square-p1','square-p2');
        }
        const iSquare = i;
        element[i].classList.remove('square-'+iSquare)
        element[i].classList.add('square-'+iSquare)
    }
}

function clearLines() {
    while (line.classList.length > 0) {
        line.classList.remove(line.classList.item(0));
    }
}

function endMessage(player) {
    
    if (player == player1) {
        if (!endMessage1.classList.contains('end-message-p1') && !endMessage1.classList.contains('end-message-p2')) {
            endMessage1.classList.add('end-message-p1');
            endMessage2.classList.add('end-message-p1');
        } else if (endMessage1.classList.contains('end-message-p2')) {
            endMessage1.classList.remove('end-message-p2');
            endMessage1.classList.add('end-message-p1');
            endMessage2.classList.remove('end-message-p2');
            endMessage2.classList.add('end-message-p1');
        }
    } else if (player == player2) {
        if (!endMessage1.classList.contains('end-message-p1') && !endMessage1.classList.contains('end-message-p2')) {
            endMessage1.classList.add('end-message-p2');
            endMessage2.classList.add('end-message-p2');
        } else if (endMessage1.classList.contains('end-message-p1')) {
            endMessage1.classList.remove('end-message-p1');
            endMessage1.classList.add('end-message-p2');
            endMessage2.classList.remove('end-message-p1');
            endMessage2.classList.add('end-message-p2');
        }
    } else if (player == false) {
        if (!endMessage1.classList.contains('end-message-p1') && !endMessage1.classList.contains('end-message-p2')) {
            endMessage1.classList.add('end-message-draw');
            endMessage2.classList.add('end-message-draw');
        } else if (endMessage1.classList.contains('end-message-p1') || endMessage1.classList.contains('end-message-p2')) {
            if (endMessage1.classList.contains('end-message-p1')) {
                endMessage1.classList.remove('end-message-p1');
                endMessage2.classList.remove('end-message-p1');
            } else {
                endMessage1.classList.remove('end-message-p2');
                endMessage2.classList.remove('end-message-p2');
            }
            endMessage1.classList.add('end-message-draw');
            endMessage2.classList.add('end-message-draw');
        }
    }
}

function winLine(player, position) {
    if (player == player1) {
        line.classList.add('linecolor-p1');
    } else if (player == player2) {
        line.classList.add('linecolor-p2');
    }

    line.classList.add('winline-'+position);
}

function winlineActive (position) {
    line.classList.add('winline-'+position+'-active');
}

function start() {
    hideContent('#part-2');
    hideContent('#message1');
    hideContent('#message2');
    showContent('#play');
    showContent('#menu');
    showContent('#title')

    playButton.addEventListener('click', play);
}

function play() {

    board = [[],[],[],[],[],[],[],[],[]];
    moves = [];
    clearSquares();
    endGameCheck = false;

    hideContent('#play');
    hideContent('#menu');
    hideContent('#title');
    hideContent('#message1');
    hideContent('#message2');
    showContent('#part-2');

    player1Play();

}

function player1Play() {

    playerActive('#player1');
    playerWait('#player2');

    for (let i = 0; i < square.length; i++) {
        square[i].addEventListener('click', player1Move);
    }

}

function player1Move(event) {

    for (let i = 0; i < square.length; i++) {
        square[i].removeEventListener('click', player1Move);
    }

    const squareSelected = event.target.id;

    if (!board[squareSelected].includes(player1) && !board[squareSelected].includes(player2)) {
        board[squareSelected].push(player1);
        moves.push(player1);
        
        addPlayer1(squareSelected);
        winValidate(player1);
        if (endGameCheck == false) {
            player2Play();
        } else {
            return
        }
    } else {
        player1Play();
    }
}

function player2Play() {

    playerActive('#player2');
    playerWait('#player1');

    for (let i = 0; i < square.length; i++) {
        square[i].addEventListener('click', player2Move);
    }

}

function player2Move(event) {

    for (let i = 0; i < square.length; i++) {
        square[i].removeEventListener('click', player2Move);
    }

    const squareSelected = event.target.id;

    if (!board[squareSelected].includes(player1) && !board[squareSelected].includes(player2)) {
        board[squareSelected].push(player2);
        moves.push(player2);
        
        addPlayer2(squareSelected);
        winValidate(player2);
        if (endGameCheck == false) {
            player1Play();
        } else {
            return
        }
    } else {
        player2Play();
    }
}

function winValidate(player) {

    if (board[0].includes(player) && board[1].includes(player) && board[2].includes(player)) {
        const position = 'v1'
        winLine(player, position);
        setTimeout(winlineActive, 50, position);
        winGame(player);
        endGameCheck = true;
    } else if (board[0].includes(player) && board[3].includes(player) && board[6].includes(player)) {
        const position = 'h1'
        winLine(player, position);
        setTimeout(winlineActive, 50, position);
        winGame(player);
        endGameCheck = true;
    } else if (board[3].includes(player) && board[4].includes(player) && board[5].includes(player)) {
        const position = 'v2'
        winLine(player, position);
        setTimeout(winlineActive, 50, position);
        winGame(player);
        endGameCheck = true;
    } else if (board[6].includes(player) && board[7].includes(player) && board[8].includes(player)) {
        const position = 'v3'
        winLine(player, position);
        setTimeout(winlineActive, 50, position);
        winGame(player);
        endGameCheck = true;
    } else if (board[1].includes(player) && board[4].includes(player) && board[7].includes(player)) {
        const position = 'h2'
        winLine(player, position);
        setTimeout(winlineActive, 50, position);
        winGame(player);
        endGameCheck = true;
    } else if (board[2].includes(player) && board[5].includes(player) && board[8].includes(player)) {
        const position = 'h3'
        winLine(player, position);
        setTimeout(winlineActive, 50, position);
        winGame(player);
        endGameCheck = true;
    } else if (board[2].includes(player) && board[4].includes(player) && board[6].includes(player)) {
        const position = 'd2'
        winLine(player, position);
        setTimeout(winlineActive, 50, position);
        winGame(player);
        endGameCheck = true;
    } else if (board[0].includes(player) && board[4].includes(player) && board[8].includes(player)) {
        const position = 'd1'
        winLine(player, position);
        setTimeout(winlineActive, 50, position);
        winGame(player);
        endGameCheck = true;
    } else if (moves.length == 9) {
        endGameCheck = true;
        setTimeout(endGame, 2000, false);

    }
}


function winGame(player) {

    setTimeout(endGame, 3000, player);

}


function endGame(player) {

    clearLines();
    hideContent('#part-2');

    if (player == false) {
    endMessage1.textContent = `Desta vez empataram!`
    endMessage(false);
    } else {
    endMessage1.textContent = `Parabéns ${player} !!`
    endMessage(player);
    }

    showContent('#title');
    showContent('#play');
    showContent('#menu');
    showContent('#message1');
    showContent('#message2');


    playButton.addEventListener('click', play);

}

start();