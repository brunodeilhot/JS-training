# JS-training

This project was built during the August summer interval of the FullStack course, which took place in the midle of the JavaScript module.
The purpose was to put into practice the knowledge of basic JavaScript functionality, improve my capacity for solving problems and my logic thinking.

It contains four games: Guessing, TicTacToe, Memory and Hangman.
I also created the design and since these are simple games it made sense to give them a children's game style.


#### Main project page
  - Simple page written in html with scss for styling
  - Allows you to choose between each of the project's games and redirect to their page
  
#### Guessing game (Adivinha):
  - Choose a dificulty which defines the variables for number of attempts and time left
  - Use of a class to hide and show content and this way give the perception of a single page app
  - Once the game begins a random number is generated and you have to try and guess which
  - The game then displays your attempts at guessing and wether the random number is higher or lower then the attempt
  - If you guess the number or the timer ends you get an ending message for win or loose and the number you had to guess
  
#### TicTacToe (Galo):
  - Starting the game you will have to decide which symbol to play with
  - The first player is the O and the second the X
  - Once each player clicks on a square the script validates, based on the combination of square id, if any of the moves played until that point are valid for a victory
  - If the validation checks true then the player that last moved will win, otherwise if it never validates then game ends in a draw
  
#### Memory (Memória):
  - Choosing the dificulty will determine the board shown and the timer
  - Once the game begins the board will appear and show number of cards based on difficulty chosen
  - The cards are assigned classes, in pairs, wich determine the image shown on the face of the card
  - Once you turn a card, the script will wait until another card is turned to validate wether the class of each card matches
  - If the classes match then they will be given an active class to remain visible
  - The game ends if you turn all the paired cards or if the timer ends
  
#### Hangman (Forca):
This hangman game has different twist since no man is hanged if you lose, instead you are being attacked by a pirate ship and by guessing the word you will escape from the pirates.
  - Begin by choosing the difficulty which will define the length of the words and number of attempts
  - Once the game begins a random word is chosen from a list of words and the letters are split into an array
  - The user inputs the attempt letter which is then followed by a series of validations:
    - Wether the letter can be found in the letters array and if the first and last index are different, then display the letters
    - How many attempts are left and display a different message if its the last attempt
    - If the letter guessed is wrong reduces the number of attempts and displays a list of letters attempted previously
    - Reset the form if the user inputs a letter from a previous play
   - Player is also allowed to request help for two correct letters in exchange for two attempts
   - After validation if the length of the generated word array is the same as the player's correct attempts array then a victory status is displayed
   - Display a loose status if the attempts run out
