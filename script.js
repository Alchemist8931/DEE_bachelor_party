let questions = [];

let current = 0;
let score = 0;
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const roundEl = document.getElementById('round');
const roundStartEl = document.getElementById('round-start');
const scoreEl = document.getElementById('score');

function showRoundInfo() {
    const round = Math.floor(current / 10) + 1;
    roundEl.textContent = `Раунд ${round}`;
}

function showRoundScreen() {
    return new Promise(resolve => {
        const round = Math.floor(current / 10) + 1;
        roundStartEl.textContent = `Раунд ${round}`;
        roundStartEl.classList.remove('hidden');
        setTimeout(() => {
            roundStartEl.classList.add('hidden');
            resolve();
        }, 2000);
    });
}

async function showQuestion() {
    if (current >= questions.length) {
        questionEl.textContent = `Игра окончена! Верных ответов: ${score} из ${questions.length}`;
        optionsEl.innerHTML = "";
        roundEl.textContent = "";
        return;
    }
    if (current >= questions.length) {
        questionEl.textContent = `Игра окончена! Верных ответов: ${score} из ${questions.length}`;
        optionsEl.innerHTML = "";
        roundEl.textContent = "";
        return;
    }

    if (current % 10 === 0) {
        await showRoundScreen();
    }

    showRoundInfo();

    const q = questions[current];
    questionEl.textContent = q.text;
    questionEl.classList.add('fade-in');
    setTimeout(() => questionEl.classList.remove('fade-in'), 500);

    optionsEl.innerHTML = '';
    q.options.forEach((opt, idx) => {
        const li = document.createElement('li');
        li.textContent = opt;
        li.className = 'fade-in';
        li.addEventListener('click', () => selectAnswer(idx));
        optionsEl.appendChild(li);
        setTimeout(() => li.classList.remove('fade-in'), 500);
    });
}

function selectAnswer(index) {
    if (index === questions[current].correct) {
        score++;
    }
    current++;
    scoreEl.textContent = `Счёт: ${score}`;
    showQuestion();
}

async function loadQuestions() {
    try {
        const response = await fetch('questions.json');
        if (!response.ok) {
            throw new Error('Ошибка сети');
        }
        questions = await response.json();
        showQuestion();
    } catch (e) {
        console.error('Ошибка загрузки вопросов:', e);
    }
}

document.addEventListener('DOMContentLoaded', loadQuestions);

