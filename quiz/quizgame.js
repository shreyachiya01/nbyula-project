import {
    getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, onSnapshot
}
    from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js"

const db = getFirestore();

const questionTitle = document.getElementById('question')
// const option1Title = document.getElementsByClassName('choice-text')[0]
// const option2Title = document.getElementsByClassName('choice-text')[1]
// const option3Title = document.getElementsByClassName('choice-text')[2]
// const option4Title = document.getElementsByClassName('choice-text')[3]

const choices = Array.from(document.getElementsByClassName('choice-text'));
const scoreText = document.getElementById('score');
const progressText = document.getElementById('progressText');
const progressBarFull = document.getElementById('progressBarFull');


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
let questions = [];

let isLoad = false;


async function GetDocument() {
    var ref = doc(db, "Course", "quiz1", "questions", "question1");
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
        console.log(docSnap.data())
        questionTitle.innerHTML = docSnap.data().questionTitle
        option1Title.innerHTML = docSnap.data().option1Title
        option2Title.innerHTML = docSnap.data().option2Title
        option3Title.innerHTML = docSnap.data().option3Title
        option4Title.innerHTML = docSnap.data().option4Title
    }

}

// const usersCollectionRef = collection(db, "Course", "quiz1", "questions");
// let questionss = onSnapshot(usersCollectionRef, (snapshot) => {
//     const que = snapshot.docs.map((doc) => {
//         // questions.push(doc.data().questionTitle)
//         return doc.data();
//     })
//     ret = que
//     isLoad = true
//     console.log(ret)
// })
// console.log(questionss)

async function GetQuestions() {
    let ret = []
    const usersCollectionRef = await collection(db, "Course", "quiz1", "questions");
    onSnapshot(usersCollectionRef, (snapshot) => {
        const que = snapshot.docs.map((doc) => {
            // questions.push(doc.data().questionTitle)
            return doc.data();
        })
        ret = que
        questions = ret

        console.log(ret)
        startGame();
    });

}

GetQuestions()

const CORRECT_BONUS = 10;
let MAX_QUESTIONS = 3;

console.log(db)
// GetDocument()


const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    // console.log(questions)
    // questions.forEach((dc) => {
    //     console.log(dc)
    //     availableQuesions.push(dc)
    // })

    // console.log(availableQuesions)
    MAX_QUESTIONS = questions.length
    getNewQuestion();
};

const getNewQuestion = () => {
    if ((availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS)) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('/quiz/end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    questionTitle.innerText = currentQuestion.questionTitle;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['option' + number + 'Title'];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

const incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

// console.log(questions[0]);