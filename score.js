const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Is JavaScript case sensitive?',
        choice1: 'Yes',
        choice2: 'No',
        choice3: 'Depends',
        choice4: 'Lemons',
        answer: 1,
    },
    {
        question:
            "Which of the following syntax is correct to print a page using JavaScript?",
        choice1: "window.print();",
        choice2: "browser.print();",
        choice3: "navigator.print();",
        choice4: "None of the above",
        answer: 1,
    },
    {
        question: "Which of the following types of variables is visible only within a function where it is defined?",
        choice1: "Global",
        choice2: "Local",
        choice3: "Both",
        choice4: "Neither",
        answer: 2,
    },
    {
        question: "Which of the following function of Boolean object returns a string containing the source of the Boolean object?",
        choice1: "toSource",
        choice2: "valueOf",
        choice3: "toString",
        choice4: "None of the above",
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
    timer()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

function timer() {
    var sec = 60;
    function startTimer(){
        console.log('timer suppose to go')
        var timer = setInterval(function(){
            sec--;
            document.getElementById('timerText').innerHTML='00:'+sec;
            if (sec < 0) {
                clearInterval(timer);
                alert("Time is up!")
                return window.location.assign('end.html')
            }
            if(answer == 'incorrect') {
                sec -= 5;
                document.getElementById('timerText').innerHTML='00:'+sec;
                if (sec < 0) {
                    clearInterval(timer);
                    alert("Time is up!")
                    return window.location.assign('end.html');
                }
        }}, 1000); 
    }

    startTimer()
};

function incrementScore(num) {
    score +=num
    scoreText.innerText = score
}

startGame()