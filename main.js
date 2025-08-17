const logo = document.getElementById('logo')
const cards = document.querySelectorAll('#choose-main .cards .card')


const cardsContainer = document.querySelector('#choose-main .cards')
const gameContainer = document.querySelector('#choose-main .game')

const myCard = document.getElementById('mycard')
const myCardIcon = document.querySelector('#mycard .icon img')

const computerCard = document.getElementById('computer-card')
const computerCardIcon = document.querySelector('#computer-card .icon img')



const resultBox = document.querySelector('.game .result')
const result = document.querySelector('.result h2')

const modeBtn = document.querySelector('.btns .mode')
const rulesBtn = document.querySelector('.btns .rules')


const score = document.querySelector('.score h1')
let scoreNumber = parseInt(localStorage.getItem('score')) || 0

score.textContent = scoreNumber

let rps
const CLASSIC = ['rock', 'paper', 'scissors']
const ADVANCED = ['rock', 'paper', 'scissors', 'spock', 'lizard']
if (localStorage.getItem('mode') == undefined || localStorage.getItem('mode') == '') {
    localStorage.setItem('mode', 'classic')
    rps = CLASSIC
    gameContainer.classList.remove('game5')
    modeBtn.textContent = 'advanced mode'
    logo.setAttribute('src', 'images/logo.svg')
} else if (localStorage.getItem('mode') == 'advanced') {
    rps = ADVANCED
    cardsContainer.classList.replace('classic', 'advanced')
    gameContainer.classList.add('game5')
    modeBtn.textContent = 'classic mode'
    logo.setAttribute('src', 'images/logo-bonus.svg')

} else {
    rps = CLASSIC
    modeBtn.textContent = 'advanced mode'
    logo.setAttribute('src', 'images/logo.svg')

}


let myChoose, computerChoose

cards.forEach(el => {
    el.addEventListener('click', () => {
        myChoose = el.dataset.card
        cardsContainer.classList.add('hidden')
        gameContainer.classList.remove('hidden')
        myCard.classList = `card ${myChoose}`
        myCardIcon.setAttribute('src', `images/icon-${myChoose}.svg`)
        computerCard.className = 'card'
        computerCard.style.opacity = '0'
        computerCard.style.transition = '0.3s opacity'
        setTimeout(() => {
            computerCard.style.opacity = '1'
        }, 500);
        computerCardIcon.setAttribute('src', ``)
        result.textContent = ''
        rulesBtn.style.opacity = '0'
        rulesBtn.style.pointerEvents = 'none'
        modeBtn.style.pointerEvents = 'none'
        modeBtn.style.opacity = '0'
    })
    el.addEventListener('keydown', (e) => {
        if (e.code === "Enter") {
            el.click()
        }
    })
})



function updateScore(change) {
    scoreNumber += change;
    localStorage.setItem('score', scoreNumber);
    score.textContent = scoreNumber;
}


computerCard.addEventListener('animationend', (e) => {
    if (e.animationName == 'loading') {
        let waitResult
        waitResult = setTimeout(() => {
            playAgain.style.opacity = '1'
        }, 500);

        computerChoose = rps[Math.floor(Math.random() * rps.length)]
        computerCard.classList.add(computerChoose)
        computerCardIcon.setAttribute('src', `images/icon-${computerChoose}.svg`)
        resultBox.style.opacity = '1'



        const gameResult = GameRules()
        if (gameResult == 'win') {
            result.textContent = `you ${gameResult}`
            updateScore(+1)
            myCard.classList.add('winner')
        }

        else if (gameResult == 'lose') {
            result.textContent = `you ${gameResult}`
            updateScore(-1)
            computerCard.classList.add('winner')
        }

        else {
            result.textContent = 'tie'
            updateScore(0)
        }
        result.className = gameResult
    }
})


GameRules = () => {
    const rules = {
        rock: ['scissors', 'lizard'],
        paper: ['rock', 'spock'],
        scissors: ['paper', 'lizard'],
        lizard: ['paper', 'spock'],
        spock: ['scissors', 'rock']
    };

    if (myChoose === computerChoose) return 'tie';
    if (rules[myChoose].includes(computerChoose)) return 'win';
    return 'lose';
}


let playAgain = document.getElementById('again')
playAgain.addEventListener('click', () => {
    playAgain.style.opacity = '0'
    cardsContainer.classList.remove('hidden')
    gameContainer.classList.add('hidden')
    resultBox.style.opacity = '0'
    myCard.classList.remove('winner')
    computerCard.classList.remove('winner')
    rulesBtn.style.opacity = '1'
    modeBtn.style.opacity = '1'
    rulesBtn.style.pointerEvents = 'auto'
    modeBtn.style.pointerEvents = 'auto'
})



const splashScreen = document.getElementById('splash-screen')
const rulesImg = document.getElementById('rules-img')

rulesBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    splashScreen.classList.add('show')
    cardsContainer.classList.contains('classic') ?
        rulesImg.setAttribute('src', "images/image-rules.svg") :
        rulesImg.setAttribute('src', "images/image-rules-bonus.svg")

})

const closeSplash = document.getElementById('close')
closeSplash.addEventListener('click', () => {
    splashScreen.classList.remove('show')
})

document.addEventListener('click', (e) => {
    if (e.target === splashScreen) {
        splashScreen.classList.remove('show')
    }
})


let resetScore = document.getElementById('reset')
resetScore.addEventListener('click', () => {
    scoreNumber = 0
    localStorage.setItem('score', 0)
    score.textContent = 0
})


modeBtn.addEventListener('click', () => {
    if (cardsContainer.classList.contains('classic')) {
        localStorage.setItem('mode', 'advanced')
        rps = ADVANCED
        cardsContainer.classList.replace('classic', 'advanced')
        gameContainer.classList.add('game5')
        logo.setAttribute('src', 'images/logo-bonus.svg')
        modeBtn.textContent = 'classic mode'

    } else {
        localStorage.setItem('mode', 'classic')
        cardsContainer.classList.replace('advanced', 'classic');
        rps = CLASSIC
        gameContainer.classList.remove('game5')
        modeBtn.textContent = 'advanced mode'
        logo.setAttribute('src', 'images/logo.svg')
    }
})



document.getElementById('close-phone').addEventListener('click', () => {
    splashScreen.classList.remove('show')
})