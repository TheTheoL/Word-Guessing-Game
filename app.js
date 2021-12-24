//Variables list
const buttons = document.querySelectorAll('#querty');
let phrase = document.querySelector('#phrase ul');
const startBtn = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const heart = document.querySelectorAll('.tries img');
var missed = 0;
const hearts = document.querySelectorAll('.tries img');
const title = document.querySelector('.title');
const keyBtns = document.querySelectorAll('#qwerty button');



//phrases array
//
const phrases = [
  'life is good',
  'put in what you want to get out',
  'stupid is what stupid does',
  'life is like a box of chocolates',
  'you cannot handle the truth'
];


//Event listener that hides the start screen overlay.
startBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
});

//getRandomPhraseAsArray function. This takes a random array from the list and splits it into separate letters.

function getRandomPhraseAsArray(arr) {
    //This function should randomly choose a phrase from the phrases array and split that phrase into a new array of characters.
    const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
    const splitPhrases = randomPhrase.split('');
    return splitPhrases;
}

console.log(getRandomPhraseAsArray(phrases));
//This function loops through an array of characters and displays them on the page. If the array is not //a space, then the fu nction will add the letter class. If it a space, then the function will add the 'space' class.

function addPhraseToDisplay (arr) {
    for (i = 0; i < arr.length; i++){
        const selectArray = arr[i];
        const li = document.createElement('li');
        const ul = document.querySelector('#phrase ul');
        ul.appendChild(li);
        li.textContent = selectArray;
        if (selectArray !== ' ') {
            li.className = 'letter';
        } else {
            li.className = 'space';
        }
    }
}
//In order to use the function you have to have the value returned by the getRandomPhraseAsArray and save it to a variable, then pass it to the addPhraseToDisplay as an argument.
var phraseToDisplay = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseToDisplay);


//This next step creates a function called checkLetter that checks if the clicked letter is the right letter otherwise it returns 'null.'

function checkLetter (guessLetter) {

    const allLi = document.getElementsByClassName('letter');
    let match = null;

    for (i = 0; i < allLi.length; i++) {
        if (guessLetter === allLi[i].innerText.toLowerCase()) {
            allLi[i].className = 'letter show';
            match = allLi[i].innerText;
        }
    }
    return match;
}


//Event listener to check for 'clicks' on the keyboard.
for (i = 0; i < keyBtns.length; i++){
    keyBtns[i].addEventListener('click', (e) => {
        let userGuess = e.target.innerText;
        checkLetter(userGuess);
        e.target.className += ' chosen';
        e.target.disabled = 'true';
        let clickedLetter = checkLetter(userGuess);
        if (clickedLetter === null){
            hearts[missed].src = 'images/lostHeart.png';
            missed++;
        }
        checkWin();
    });
}



//Following fucntion checks for correct letters. If they are all correct then the player wins, but if they get 5 guesses wrong the player loses.
function checkWin() {
  var letter = document.querySelectorAll('li.letter'); //this stores all the li elements under the class name 'letter'.
  var show = document.querySelectorAll('li.show');//this stores all the li elements under the class name 'show'.

//To check if the length of the 2 variables are the same, create an 'if' statement that overlays the 'win' class to the start overlay.
  if (show.length === letter.length){
        overlay.className = 'win';
        overlay.style.display = 'flex';
        title.textContent = 'Excellent, you guessed correct!';
      }
//If the two variables are not the same, the player missed a chance to get it correct therefore loses a life/guess. IF this is the case we instead overlay
    if (missed >= 5){
       overlay.className = 'lose';
       overlay.style.display = 'flex';
       title.textContent = 'Your guess is incorrect, you lose a life';
      }

}
