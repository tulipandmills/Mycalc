// Script loaded confirmation
console.log('Calculator.js loaded successfully');

// Basic Calculator Variables
let currentValue = '0';
let previousValue = '';
let operation = '';
let shouldResetDisplay = false;
let calculationHistory = [];

// Unit conversion variables
let currentUnit = null;
let previousUnit = null;

// Epoch tracking
let isEpoch = false;
let previousIsEpoch = false;

// Unit conversion ratios (all in seconds as base)
const unitConversions = {
    seconds: 1,
    minutes: 60,
    hours: 3600,
    days: 86400,
    weeks: 604800,
    months: 2592000, // 30 days
    years: 31536000 // 365 days
};

const unitLabels = {
    seconds: 'sec',
    minutes: 'min',
    hours: 'hr',
    days: 'day',
    weeks: 'wk',
    months: 'mo',
    years: 'yr'
};

// Convert value from one unit to another
function convertUnit(value, fromUnit, toUnit) {
    if (!fromUnit || !toUnit) return value;

    // Convert to seconds first
    const inSeconds = value * unitConversions[fromUnit];
    // Then convert to target unit
    return inSeconds / unitConversions[toUnit];
}

// Basic Calculator Functions
function updateDisplay() {
    const display = document.getElementById('display');
    display.value = currentValue;
    updateUnitDisplay();
    updateOperatorDisplay();
    updateDatetimeDisplay();
}

function updateUnitDisplay() {
    const unitDisplay = document.getElementById('unit-display');
    if (currentUnit) {
        unitDisplay.textContent = unitLabels[currentUnit];
        unitDisplay.style.display = 'block';
    } else {
        unitDisplay.style.display = 'none';
    }
}

function updateOperatorDisplay() {
    const operatorDisplay = document.getElementById('operator-display');
    if (operation) {
        let displayOp = operation;
        if (operation === '*') displayOp = '×';
        if (operation === '/') displayOp = '÷';
        operatorDisplay.textContent = displayOp;
        operatorDisplay.style.display = 'block';
    } else {
        operatorDisplay.style.display = 'none';
    }
}

function updateDatetimeDisplay() {
    const datetimeDisplay = document.getElementById('datetime-display');
    if (isEpoch && currentValue !== '0') {
        const epochValue = parseFloat(currentValue);
        const date = new Date(epochValue * 1000); // Convert seconds to milliseconds
        const formatted = date.toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        datetimeDisplay.textContent = formatted;
        datetimeDisplay.style.display = 'block';
    } else {
        datetimeDisplay.style.display = 'none';
    }
}

function updateHistory() {
    const historyLog = document.getElementById('history-log');
    historyLog.innerHTML = '';

    calculationHistory.forEach(entry => {
        const historyEntry = document.createElement('div');
        historyEntry.className = 'history-entry';
        historyEntry.textContent = entry;
        historyLog.appendChild(historyEntry);
    });

    // Auto-scroll to bottom to show most recent
    historyLog.scrollTop = historyLog.scrollHeight;

    // Save to localStorage
    saveToStorage();
}

// localStorage functions
function saveToStorage() {
    try {
        localStorage.setItem('calcHistory', JSON.stringify(calculationHistory));
    } catch (e) {
        console.error('Failed to save to localStorage:', e);
    }
}

function loadFromStorage() {
    try {
        const saved = localStorage.getItem('calcHistory');
        if (saved) {
            calculationHistory = JSON.parse(saved);
            updateHistory();
        }
    } catch (e) {
        console.error('Failed to load from localStorage:', e);
    }
}

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentValue = num;
        shouldResetDisplay = false;
    } else {
        if (currentValue === '0' && num !== '.') {
            currentValue = num;
        } else {
            // Prevent multiple decimal points
            if (num === '.' && currentValue.includes('.')) return;
            currentValue += num;
        }
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operation && !shouldResetDisplay) {
        calculate();
    }
    previousValue = currentValue;
    previousUnit = currentUnit;
    previousIsEpoch = isEpoch;
    operation = op;
    shouldResetDisplay = true;
}

function calculate() {
    if (!operation || !previousValue) return;

    let prev = parseFloat(previousValue);
    let current = parseFloat(currentValue);
    let result;

    // If both values have units, convert current to previous unit
    if (previousUnit && currentUnit && previousUnit !== currentUnit) {
        current = convertUnit(current, currentUnit, previousUnit);
    }

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    // Round to avoid floating point errors
    result = Math.round(result * 100000000) / 100000000;

    // Format operator for display
    let displayOp = operation;
    if (operation === '*') displayOp = '×';
    if (operation === '/') displayOp = '÷';

    // Add to history with units
    let historyEntry;
    if (previousUnit && currentUnit) {
        const prevLabel = unitLabels[previousUnit];
        const currLabel = unitLabels[currentUnit];
        const resultLabel = unitLabels[previousUnit];
        historyEntry = `${previousValue}${prevLabel} ${displayOp} ${currentValue}${currLabel} = ${result}${resultLabel}`;
    } else if (previousIsEpoch || isEpoch) {
        // Format datetime history
        const prevDate = previousIsEpoch ? new Date(parseFloat(previousValue) * 1000).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : previousValue;
        const currDate = isEpoch ? new Date(parseFloat(currentValue) * 1000).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : currentValue;
        const resultDate = new Date(result * 1000).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        historyEntry = `${prevDate} ${displayOp} ${currDate} = ${resultDate}`;
    } else {
        historyEntry = `${previousValue} ${displayOp} ${currentValue} = ${result}`;
    }

    calculationHistory.push(historyEntry);
    updateHistory();

    currentValue = result + '';
    // Result keeps the unit and epoch status of the first operand
    currentUnit = previousUnit;
    isEpoch = previousIsEpoch;
    operation = '';
    previousValue = '';
    previousUnit = null;
    previousIsEpoch = false;
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentValue = '0';
    previousValue = '';
    operation = '';
    shouldResetDisplay = false;
    calculationHistory = [];
    currentUnit = null;
    previousUnit = null;
    isEpoch = false;
    previousIsEpoch = false;
    updateDisplay();
    updateHistory();
}

function deleteLast() {
    if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);
    } else {
        currentValue = '0';
    }
    updateDisplay();
}

// Unit menu functions
function showUnitMenu() {
    console.log('showUnitMenu called!');
    const modal = document.getElementById('unit-modal');
    if (modal) {
        modal.classList.add('show');
        console.log('Modal opened, classes:', modal.className);
    } else {
        console.error('Modal element not found!');
    }
}

function closeUnitMenu() {
    console.log('closeUnitMenu called!');
    const modal = document.getElementById('unit-modal');
    if (modal) {
        modal.classList.remove('show');
        console.log('Modal closed');
    }
}

// Make functions globally accessible for onclick handlers
window.showUnitMenu = showUnitMenu;
window.closeUnitMenu = closeUnitMenu;

function selectUnit(unit) {
    const value = parseFloat(currentValue);

    // If there's no operation pending, this is a conversion
    if (!operation && currentUnit && currentUnit !== unit) {
        const converted = convertUnit(value, currentUnit, unit);
        currentValue = (Math.round(converted * 100000000) / 100000000) + '';

        // Add to history
        const fromLabel = unitLabels[currentUnit];
        const toLabel = unitLabels[unit];
        const historyEntry = `${value}${fromLabel} → ${currentValue}${toLabel}`;
        calculationHistory.push(historyEntry);
        updateHistory();
    }

    // Set the unit
    currentUnit = unit;
    updateDisplay();

    // Hide modal
    closeUnitMenu();
}

// DateTime functions
function useDatetime() {
    const datetimeInput = document.getElementById('datetime-input');
    const datetimeValue = datetimeInput.value;

    if (!datetimeValue) {
        alert('Please select a date and time');
        return;
    }

    // Convert datetime to epoch seconds
    const date = new Date(datetimeValue);
    const epochSeconds = Math.floor(date.getTime() / 1000);

    // If we're resetting display (after an operator), treat this as the new operand
    if (shouldResetDisplay) {
        currentValue = epochSeconds + '';
        isEpoch = true;
        currentUnit = 'seconds';
        shouldResetDisplay = false;
    } else {
        // Not in operation mode - just set the value
        currentValue = epochSeconds + '';
        isEpoch = true;
        currentUnit = 'seconds';
    }

    updateDisplay();

    // Add to history
    const formatted = date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    calculationHistory.push(`${formatted} → ${epochSeconds} (epoch)`);
    updateHistory();
}

function useNow() {
    const now = new Date();
    const epochSeconds = Math.floor(now.getTime() / 1000);

    // If we're resetting display (after an operator), treat this as the new operand
    if (shouldResetDisplay) {
        currentValue = epochSeconds + '';
        isEpoch = true;
        currentUnit = 'seconds';
        shouldResetDisplay = false;
    } else {
        // Not in operation mode - just set the value
        currentValue = epochSeconds + '';
        isEpoch = true;
        currentUnit = 'seconds';
    }

    updateDisplay();

    // Add to history
    const formatted = now.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    calculationHistory.push(`Now: ${formatted} → ${epochSeconds} (epoch)`);
    updateHistory();
}

function toEpoch() {
    // Convert current value to epoch mode (just show the epoch number)
    if (currentValue === '0' || currentValue === '') {
        alert('Please enter a value first');
        return;
    }

    // Ensure the value is treated as epoch seconds
    isEpoch = true;
    currentUnit = 'seconds';
    updateDisplay();

    calculationHistory.push(`Converted to epoch: ${currentValue}`);
    updateHistory();
}

function toDatetime() {
    // Display the current epoch value as formatted datetime in the main display
    if (currentValue === '0' || currentValue === '') {
        alert('Please enter an epoch value first');
        return;
    }

    const epochValue = parseFloat(currentValue);
    if (isNaN(epochValue)) {
        alert('Current value is not a valid number');
        return;
    }

    // Format the epoch as datetime and show it in the main display
    const date = new Date(epochValue * 1000);
    const formatted = date.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    // Store original epoch value and switch display
    currentValue = formatted;
    isEpoch = false; // Turn off epoch mode so we don't show the datetime display
    currentUnit = null;
    updateDisplay();

    calculationHistory.push(`Formatted as datetime: ${formatted}`);
    updateHistory();
}

// Make functions globally accessible
window.toEpoch = toEpoch;
window.toDatetime = toDatetime;

// ===== Conversation Cards =====
const cardGradients = [
    ['#667eea', '#764ba2'],
    ['#f093fb', '#f5576c'],
    ['#4facfe', '#00f2fe'],
    ['#43e97b', '#38f9d7'],
    ['#fa709a', '#fee140'],
    ['#a18cd1', '#fbc2eb'],
    ['#fcb69f', '#ffecd2'],
    ['#89f7fe', '#66a6ff'],
    ['#fddb92', '#d1fdff'],
    ['#a1c4fd', '#c2e9fb']
];

const conversationCards = [
    {
        emoji: '🐾',
        question: 'Als je een dier kon zijn voor een dag, welk dier kies je en waarom?',
        hint: 'De sloth wint altijd — 20 uur slapen is het ideale levensprogramma.'
    },
    {
        emoji: '😱',
        question: 'Wat is het domme ding dat je ooit gedaan hebt?',
        hint: 'We wedden dat het iets met een microwave te maken heeft.'
    },
    {
        emoji: '💰',
        question: 'Als je oneindig veel geld had, wat koop je als eerste?',
        hint: 'Een eigen frikadellen-fabriek is altijd een slimme investering.'
    },
    {
        emoji: '🎬',
        question: 'In welke film zou je graag een hoofdrol willen spelen?',
        hint: 'Niet Titanic… tenzij je een geweldig zwimmer bent.'
    },
    {
        emoji: '🦸',
        question: 'Als je een superkracht kon hebben, welke kies je?',
        hint: 'Onzichtbaarheid voor de wachtrij bij de supermarkt — ultiem nuttig.'
    },
    {
        emoji: '🧀',
        question: 'Wat is je meest absurde gewoonte?',
        hint: 'Kaas eten om 2 uur \'s nachts telt altijd mee.'
    },
    {
        emoji: '⭐',
        question: 'Als je een beroemde persoon kon zijn voor een dag, wie kies je?',
        hint: 'Jeff Bezos — maar alleen om dat pakje te bestellen dat je al 3 dagen wacht op.'
    },
    {
        emoji: '😴',
        question: 'Wat is de gekste droom die je ooit gehad hebt?',
        hint: 'Als er geen vliegende kussens bij zitten, telt het niet mee.'
    },
    {
        emoji: '👶',
        question: 'Welke rare regel moest je als kind volgen die nergens op kloote?',
        hint: '"Niet rennen in huis" — ik ken geen enkel huis waar dit ooit is uitgevoerd.'
    },
    {
        emoji: '🌍',
        question: 'Als de wereld morgen eindigt, wat doe je vandaag?',
        hint: 'Eindelijk die taart eten zonder een grammetje schuldgevoel.'
    },
    {
        emoji: '👨‍👩‍👧',
        question: 'Welke eigenschap heeft je familie die je nooit kwijt wordt?',
        hint: 'Dramatisch seinen bij het parken van de auto — universaal.'
    },
    {
        emoji: '😬',
        question: 'Wat is je meest pijnlijke herindering als kind?',
        hint: 'Tante die je voor de hele familie snapshots toont van je bad-foto\'s.'
    },
    {
        emoji: '🗺️',
        question: 'Als je een nieuw land kon uitvinden, hoe zou je het noemen?',
        hint: '"Het Koninkrijk van Geen-Maandagen" is nog steeds beschikbaar.'
    },
    {
        emoji: '📱',
        question: 'Welke app zou je nooit meer kunnen missen?',
        hint: 'Google Maps — zonder ben je letterlijk verloren in de wereld.'
    },
    {
        emoji: '🍕',
        question: 'Wat is je meest onlogische lekkerste combinatie?',
        hint: 'Kaas op een koekje met jam is nog maar het begin van de ellende.'
    },
    {
        emoji: '✨',
        question: 'Als je een talent kon magisch krijgen, welke kies je?',
        hint: 'Perfect bitterballen bakken. Sérieux. Game over voor elk feest.'
    },
    {
        emoji: '🎨',
        question: 'Wat is je meest onverwachte hobby?',
        hint: 'Etiketten lezen in de supermarkt telt spijtig genoeg niet mee.'
    },
    {
        emoji: '🏛️',
        question: 'Als je een museum kon oprichten, wat zou het over gaan?',
        hint: 'Het Museum van Verloren Sokken — hyper-realistische tentoonstellingen.'
    },
    {
        emoji: '🤞',
        question: 'Wat is de meest lege belofte die je ooit gedaan hebt?',
        hint: '"Ik check maar even snel…" duur gemiddeld 47 minuten.'
    },
    {
        emoji: '🤫',
        question: 'Welke vreemd gewoonte hebt je die niemand mag weten?',
        hint: 'Teken dit niet op — maar dit antwoord wordt opgeslagen.'
    },
    {
        emoji: '🎮',
        question: 'Als je een nieuw spel mocht uitvinden, hoe zou het werken?',
        hint: 'Wie het langst kan wachten zonder naar hun telefoon te kijken. Spoiler: niemand wint.'
    },
    {
        emoji: '😭',
        question: 'Waarover bent je onlogisch boos geworden?',
        hint: 'De TV-remote die niet werkt op de eerste try — bewezen mythe.'
    },
    {
        emoji: '📚',
        question: 'Als je een beroemd boek mocht herschrijven, welk kies je?',
        hint: 'Harry Potter, maar nu met betere kaas in de Hogwarts-kafeteria.'
    },
    {
        emoji: '🛍️',
        question: 'Was er een keer dat je iets kochts die heel useless was?',
        hint: 'Een waffle-machine die nog nooit een waffle heeft gemaakt — klassiek.'
    },
    {
        emoji: '🚀',
        question: 'Als je morgen naar een andere planeet kon verhuizen, kies je welke?',
        hint: 'Mars klinkt cool, maar er is geen stroopwafel te kopen. Deal-breaker.'
    }
];

let currentCardIndex = 0;
let isCardFlipped = false;
let tapHintShown = false;

function initCards() {
    updateCard(false);
}

function updateCard(animate) {
    const card = conversationCards[currentCardIndex];
    const colors = cardGradients[currentCardIndex % cardGradients.length];
    const gradient = `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`;
    const gradientRev = `linear-gradient(135deg, ${colors[1]} 0%, ${colors[0]} 100%)`;

    // If currently flipped, flip back first before swapping content
    const cardEl = document.getElementById('conversation-card');
    if (isCardFlipped) {
        cardEl.classList.remove('flipped');
        isCardFlipped = false;
    }

    // Small delay so flip-back animation plays before content swap
    setTimeout(() => {
        document.getElementById('card-emoji').textContent = card.emoji;
        document.getElementById('card-question').textContent = card.question;
        document.getElementById('card-hint').textContent = card.hint;
        document.getElementById('card-counter').textContent = `${currentCardIndex + 1} / ${conversationCards.length}`;

        // Apply card colours
        document.getElementById('card-front').style.background = gradient;
        document.getElementById('card-back').style.background = gradientRev;

        // Pop animation
        if (animate !== false) {
            cardEl.classList.remove('card-pop');
            void cardEl.offsetWidth; // force reflow
            cardEl.classList.add('card-pop');
        }
    }, isCardFlipped ? 350 : 0);
}

function flipCard() {
    const cardEl = document.getElementById('conversation-card');
    cardEl.classList.toggle('flipped');
    isCardFlipped = !isCardFlipped;

    // Hide tap hint after first flip
    if (!tapHintShown) {
        tapHintShown = true;
        document.getElementById('card-tap').style.display = 'none';
    }
}

function nextCard() {
    currentCardIndex = (currentCardIndex + 1) % conversationCards.length;
    updateCard();
}

function prevCard() {
    currentCardIndex = (currentCardIndex - 1 + conversationCards.length) % conversationCards.length;
    updateCard();
}

function shuffleCards() {
    // Fisher-Yates shuffle
    for (let i = conversationCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [conversationCards[i], conversationCards[j]] = [conversationCards[j], conversationCards[i]];
    }
    currentCardIndex = 0;
    updateCard();
}

// ===== Tab switching =====
function switchTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

    if (tab === 'calculator') {
        document.getElementById('tab-calc').classList.add('active');
        document.getElementById('calculator-section').classList.remove('section-hidden');
        document.getElementById('cards-section').classList.add('section-hidden');
    } else {
        document.getElementById('tab-cards').classList.add('active');
        document.getElementById('calculator-section').classList.add('section-hidden');
        document.getElementById('cards-section').classList.remove('section-hidden');
        initCards();
    }
}

// Make card + tab functions globally accessible
window.switchTab    = switchTab;
window.flipCard     = flipCard;
window.nextCard     = nextCard;
window.prevCard     = prevCard;
window.shuffleCards = shuffleCards;

// ===== Touch-swipe on cards (mobile) =====
let swipeTouchStartX = 0;
let swipeTouchStartY = 0;

document.addEventListener('touchstart', (e) => {
    const cardsSection = document.getElementById('cards-section');
    if (!cardsSection || cardsSection.classList.contains('section-hidden')) return;
    swipeTouchStartX = e.touches[0].clientX;
    swipeTouchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    const cardsSection = document.getElementById('cards-section');
    if (!cardsSection || cardsSection.classList.contains('section-hidden')) return;
    const dx = swipeTouchStartX - e.changedTouches[0].clientX;
    const dy = swipeTouchStartY - e.changedTouches[0].clientY;
    // Only count horizontal swipes (ignore scrolling)
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) nextCard();
        else prevCard();
    }
}, { passive: true });

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('unit-modal');
    if (e.target === modal) {
        closeUnitMenu();
    }
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendNumber('.');
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        appendOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        clearDisplay();
    } else if (e.key === 'Backspace') {
        e.preventDefault();
        deleteLast();
    }
});

// Refresh function
function refreshCalculator() {
    if (confirm('Clear all history and reset calculator?')) {
        localStorage.removeItem('calcHistory');
        location.reload();
    }
}

// Initialize
window.onload = function() {
    loadFromStorage();
    updateDisplay();
};
