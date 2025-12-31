// Basic Calculator Variables
let currentValue = '0';
let previousValue = '';
let operation = '';
let shouldResetDisplay = false;
let calculationHistory = [];

// Unit conversion variables
let currentUnit = null;
let previousUnit = null;

// Unit conversion ratios (all in seconds as base)
const unitConversions = {
    seconds: 1,
    minutes: 60,
    hours: 3600,
    days: 86400,
    weeks: 604800,
    months: 2592000 // 30 days
};

const unitLabels = {
    seconds: 'sec',
    minutes: 'min',
    hours: 'hr',
    days: 'day',
    weeks: 'wk',
    months: 'mo'
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
    } else {
        historyEntry = `${previousValue} ${displayOp} ${currentValue} = ${result}`;
    }

    calculationHistory.push(historyEntry);
    updateHistory();

    currentValue = result + '';
    // Result keeps the unit of the first operand
    currentUnit = previousUnit;
    operation = '';
    previousValue = '';
    previousUnit = null;
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
    const menu = document.getElementById('unit-menu');
    menu.classList.toggle('show');
}

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

    // Hide menu
    document.getElementById('unit-menu').classList.remove('show');
}

// Close unit menu when clicking outside
document.addEventListener('click', (e) => {
    const menu = document.getElementById('unit-menu');
    const menuButton = document.querySelector('.btn-unit-menu');

    if (!menu.contains(e.target) && e.target !== menuButton) {
        menu.classList.remove('show');
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

// Initialize
window.onload = function() {
    updateDisplay();
};
