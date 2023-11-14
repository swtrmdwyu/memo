const $ = document.querySelector.bind(document);

const op1 = $('.op-discrete-group');
const op2 = $('.op-discrete-not-group');
const op3 = $('.op-continuous');
const exit = $('.op-exit');

op1.addEventListener('click', () => {
    window.location.href = './pages/discrete-group.html';
})

op2.addEventListener('click', () => {
    window.location.href = './pages/discrete-not-group.html';
})

op3.addEventListener('click', () => {
    window.location.href = './pages/continuous.html';
})

exit.addEventListener('click', () => {
    window.location.href = './pages/exit.html';
})