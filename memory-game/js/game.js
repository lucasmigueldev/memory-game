const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');


const characters = [
    'beth',
    'jerry',
    'jessica',
    'meeseeks',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'scroopy',
    'summer'
]

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

const checkoEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 20) {

        clearInterval(this.loop);

        const finalTime = seconds;

        alert(`Parabéns, ${spanPlayer.innerHTML}! você venceu o jogo em ${finalTime} segundos.`)
    }
}


let firstCard = '';
let secondCard = '';

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkoEndGame();

    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 500);
    }
}

const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard === '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
    }

    checkCards();
}

const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face first');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url(../img/${character}.png)`


    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);

    return card;
}

let seconds = 0;

const timerCounter = () => {
    this.loop = setInterval(() => {
        seconds++;
        timer.innerHTML = `${seconds}`
    }, 1000);
}

const loadGame = () => {

    const duplicateCharacter = [...characters, ...characters];

    const shufffledArray = duplicateCharacter.sort(() => Math.random() - 0.5);

    shufffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}


const getPlayerWithExpiry = () => {
    const itemStr = localStorage.getItem('player');

    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
        localStorage.removeItem('player');
        return null;
    }

    return item.value;


}

window.onload = () => {
    const playerName = getPlayerWithExpiry();
    spanPlayer.innerHTML = playerName;

    if (!playerName) {
        alert('Sessão expirada! Você será redirecionado para escolher seu nome novamente.');
        window.location = '../index.html';
        return;
    }

    const startModal = document.getElementById('startModal');
    const modalPlayerName = document.getElementById('modalPlayerName');
    const startBtn = document.getElementById('startBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    modalPlayerName.innerHTML = playerName || 'jogador';

    startModal.style.display = 'flex';

    startBtn.addEventListener('click', () => {
        startModal.style.display = 'none';

        timerCounter();
        loadGame();
    });

    cancelBtn.addEventListener('click', () => {
        alert('Tudo bem! Recarregue a página para jogar quando quiser.')
    });

}


