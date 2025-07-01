let questions = [];
let userAnswers = [];

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
       showResults();
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
       const btn = document.createElement('button');
        btn.setAttribute('role', 'button');
        btn.textContent = opt;
        btn.className = 'fade-in';
        btn.addEventListener('click', () => selectAnswer(idx));
        optionsEl.appendChild(btn);
        setTimeout(() => btn.classList.remove('fade-in'), 500);
    });
}

function selectAnswer(index) {
    userAnswers.push(index);
    if (index === questions[current].correct) {
        score++;
    }
    current++;
    scoreEl.textContent = `Счёт: ${score}`;
    showQuestion();
}

function showResults() {
    questionEl.textContent = `Игра окончена! Верных ответов: ${score} из ${questions.length}`;
    optionsEl.innerHTML = "";
    roundEl.textContent = "";

    const resultsEl = document.getElementById('results');
    const tbody = document.querySelector('#results-table tbody');
    tbody.innerHTML = '';
    questions.forEach((q, idx) => {
        const tr = document.createElement('tr');
        const tdQ = document.createElement('td');
        tdQ.textContent = q.text;
        const tdUser = document.createElement('td');
        const userIdx = userAnswers[idx];
        tdUser.textContent = userIdx !== undefined ? q.options[userIdx] : '—';
        const tdCorrect = document.createElement('td');
        tdCorrect.textContent = q.options[q.correct];
        tr.appendChild(tdQ);
        tr.appendChild(tdUser);
        tr.appendChild(tdCorrect);
        tbody.appendChild(tr);
    });

    resultsEl.classList.remove('hidden');
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


