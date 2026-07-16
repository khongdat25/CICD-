const grid = document.getElementById('grid');
const movesDisplay = document.getElementById('moves');
let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let isLocked = false;

const emojis = ['🚀', '🤖', '⚡', '🔥', '🌟', '💻', '🌍', '🎨'];
let gameEmojis = [...emojis, ...emojis];

function initGame() {
    grid.innerHTML = '';
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    isLocked = false;
    movesDisplay.textContent = moves;

    // Shuffle
    gameEmojis.sort(() => 0.5 - Math.random());

    gameEmojis.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = emoji;
        card.innerHTML = `
            <div class="card-face card-front"></div>
            <div class="card-face card-back">${emoji}</div>
        `;
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}

function flipCard() {
    if (isLocked) return;
    if (this === flippedCards[0]) return;

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        moves++;
        movesDisplay.textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.value === card2.dataset.value;

    if (match) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);
        matchedPairs++;
        flippedCards = [];
        
        if (matchedPairs === emojis.length) {
            setTimeout(() => alert(`You won in ${moves} moves!`), 500);
        }
    } else {
        isLocked = true;
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            isLocked = false;
        }, 1000);
    }
}

function restartGame() {
    initGame();
}

initGame();
