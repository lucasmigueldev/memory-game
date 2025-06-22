const input = document.querySelector('.login__input');
const button = document.querySelector('.login__button');
const form = document.querySelector('.login-form');

const validateInput = ({ target }) => {
    target.value.length > 3 ? button.removeAttribute('disabled') :
        button.setAttribute('disabled', '');
}

const savePlayerWithExpiry = (playerName, expiryInMinutes) => {
    const now = new Date();
    const item = {
        value: playerName,
        expiry: now.getTime() + expiryInMinutes * 60 * 1000,
    };
    localStorage.setItem('player', JSON.stringify(item));
};

const handleSubmit = (event) => {
    event.preventDefault();

     savePlayerWithExpiry(input.value, 10);
    window.location = './pages/game.html';
}


input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);