const questions = [];
for (let i = 1; i <= 30; i++) {
    questions.push({
        text: `Вопрос ${i}?`,
        options: [`Ответ A${i}`, `Ответ B${i}`, `Ответ C${i}`, `Ответ D${i}`],
        correct: 0
    });
}

let current = 0;
let score = 0;
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const roundEl = document.getElementById('round');
const scoreEl = document.getElementById('score');

function showRound() {
    const round = Math.floor(current / 10) + 1;
    roundEl.textContent = `Раунд ${round}`;
}

function showQuestion() {
    if (current >= questions.length) {
        questionEl.textContent = `Игра окончена! Верных ответов: ${score} из ${questions.length}`;
        optionsEl.innerHTML = "";
        roundEl.textContent = "";
        return;
    }

    showRound();

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

document.addEventListener('DOMContentLoaded', showQuestion);
