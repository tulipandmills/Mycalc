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

function adjustTime(direction) {
    const startDatetime = document.getElementById('start-datetime').value;

    if (!startDatetime) {
        alert('Please select a start date and time');
        return;
    }

    const value = parseInt(document.getElementById('time-value').value) || 1;
    const unit = document.getElementById('time-unit').value;

    const startDate = new Date(startDatetime);
    const resultDate = new Date(startDate);

    // Determine multiplier based on direction
    const multiplier = direction === 'later' ? 1 : -1;
    const adjustValue = value * multiplier;

    // Adjust based on unit
    switch (unit) {
        case 'minutes':
            resultDate.setMinutes(resultDate.getMinutes() + adjustValue);
            break;
        case 'hours':
            resultDate.setHours(resultDate.getHours() + adjustValue);
            break;
        case 'days':
            resultDate.setDate(resultDate.getDate() + adjustValue);
            break;
        case 'weeks':
            resultDate.setDate(resultDate.getDate() + (adjustValue * 7));
            break;
        case 'months':
            resultDate.setMonth(resultDate.getMonth() + adjustValue);
            break;
        case 'years':
            resultDate.setFullYear(resultDate.getFullYear() + adjustValue);
            break;
    }

    // Update the start datetime input with the new result
    const year = resultDate.getFullYear();
    const month = String(resultDate.getMonth() + 1).padStart(2, '0');
    const day = String(resultDate.getDate()).padStart(2, '0');
    const hours = String(resultDate.getHours()).padStart(2, '0');
    const minutes = String(resultDate.getMinutes()).padStart(2, '0');
    const dateTimeString = `${year}-${month}-${day}T${hours}:${minutes}`;
    document.getElementById('start-datetime').value = dateTimeString;

    // Format the result for display
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };

    const formattedResult = resultDate.toLocaleString('en-US', options);

    // Calculate differences from original
    const diffMs = resultDate - startDate;
    const absDiffMs = Math.abs(diffMs);
    const diffDays = Math.floor(absDiffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((absDiffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((absDiffMs % (1000 * 60 * 60)) / (1000 * 60));

    const directionText = direction === 'later' ? '+' : '-';
    const diffText = `(${directionText}${value} ${unit})`;

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
