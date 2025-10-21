// Basic Calculator Variables
let currentValue = '0';
let previousValue = '';
let operation = '';
let shouldResetDisplay = false;

// Tab Switching
function switchTab(tabName) {
    const basicCalc = document.getElementById('basic-calc');
    const timeCalc = document.getElementById('time-calc');
    const tabButtons = document.querySelectorAll('.tab-button');

    if (tabName === 'basic') {
        basicCalc.classList.add('active');
        timeCalc.classList.remove('active');
        tabButtons[0].classList.add('active');
        tabButtons[1].classList.remove('active');
    } else {
        timeCalc.classList.add('active');
        basicCalc.classList.remove('active');
        tabButtons[1].classList.add('active');
        tabButtons[0].classList.remove('active');
    }
}

// Basic Calculator Functions
function updateDisplay() {
    const display = document.getElementById('display');
    display.value = currentValue;
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
    operation = op;
    shouldResetDisplay = true;
}

function calculate() {
    if (!operation || !previousValue) return;

    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    let result;

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
    currentValue = Math.round(result * 100000000) / 100000000 + '';
    operation = '';
    previousValue = '';
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentValue = '0';
    previousValue = '';
    operation = '';
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);
    } else {
        currentValue = '0';
    }
    updateDisplay();
}

// Keyboard support for basic calculator
document.addEventListener('keydown', (e) => {
    const basicCalc = document.getElementById('basic-calc');
    if (!basicCalc.classList.contains('active')) return;

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

// Time Calculator Functions
function setCurrentTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const dateTimeString = `${year}-${month}-${day}T${hours}:${minutes}`;
    document.getElementById('start-datetime').value = dateTimeString;
}

function modifyTime(unit, change) {
    const input = document.getElementById(`${unit}-input`);
    const currentVal = parseInt(input.value) || 0;
    input.value = currentVal + change;
}

function calculateTime() {
    const startDatetime = document.getElementById('start-datetime').value;

    if (!startDatetime) {
        alert('Please select a start date and time');
        return;
    }

    const startDate = new Date(startDatetime);
    const days = parseInt(document.getElementById('days-input').value) || 0;
    const hours = parseInt(document.getElementById('hours-input').value) || 0;
    const minutes = parseInt(document.getElementById('minutes-input').value) || 0;

    // Calculate new date
    const resultDate = new Date(startDate);
    resultDate.setDate(resultDate.getDate() + days);
    resultDate.setHours(resultDate.getHours() + hours);
    resultDate.setMinutes(resultDate.getMinutes() + minutes);

    // Format the result
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };

    const formattedResult = resultDate.toLocaleDateString('en-US', options);

    // Calculate differences
    const diffMs = resultDate - startDate;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    let diffText = '';
    if (diffMs >= 0) {
        diffText = `(+${diffDays} days, ${diffHours} hours, ${diffMinutes} minutes)`;
    } else {
        diffText = `(${diffDays} days, ${diffHours} hours, ${diffMinutes} minutes)`;
    }

    document.getElementById('time-result-display').innerHTML = `
        <strong>${formattedResult}</strong>
        <br>
        <small>${diffText}</small>
    `;
}

// Initialize
window.onload = function() {
    updateDisplay();
    setCurrentTime();
};
