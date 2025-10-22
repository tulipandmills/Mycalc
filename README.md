# Calculator App

A modern, web-based calculator with two main features:
- **Basic Math Calculator**: Standard arithmetic operations
- **Time Calculator**: Add or subtract time units (days, hours, minutes)

## Features

### Basic Math Calculator
- Addition, subtraction, multiplication, and division
- Decimal number support
- Keyboard support for quick calculations
- **Calculation history log** - keeps track of all calculations with newest at bottom
- Classic green/gray display with dark gray digits
- Clear function clears both display and history
- Delete function for correcting entries

### Time Calculator
- Add or subtract time units using Earlier/Later buttons
- Flexible unit selection: minutes, hours, days, weeks, months, years
- "Use Current Time" button for quick access to the current date/time
- Simple value input with unit selector
- Visual display of the calculated result

## How to Use

### Basic Math Calculator
1. Open `index.html` in your web browser
2. The calculator defaults to the "Basic Math" tab
3. Click numbers and operators to perform calculations
4. Press "=" to see the result - the calculation is logged in the history area
5. Previous calculations appear in the history log (newest at bottom)
6. Use "C" to clear both display and history
7. Use "⌫" to delete the last digit

**Keyboard Shortcuts:**
- Numbers: 0-9
- Operators: +, -, *, /
- Calculate: Enter or =
- Clear: Escape or C
- Delete: Backspace

### Time Calculator
1. Switch to the "Time Calculator" tab
2. Click "Use Current Time" or manually select a start date and time
3. Enter a value and select a unit (minutes, hours, days, weeks, months, years)
4. Click "Later" to add time or "Earlier" to subtract time
5. The result shows the new date/time and updates the start time
6. You can continue clicking Earlier/Later to keep adjusting

## Examples

**Basic Math:**
- 25 + 17 = 42
- 100 / 4 = 25
- 3.14 * 2 = 6.28

**Time Calculations:**
- Current time + 1 day (Later) = Tomorrow at the same time
- January 1, 2025 10:00 AM + 5 days (Later) = January 6, 2025 10:00 AM
- January 1, 2025 + 2 weeks (Later) = January 15, 2025
- Meeting at 2:00 PM - 45 minutes (Earlier) = 1:15 PM
- Current date + 6 months (Later) = Six months from now

## Technical Details

- Built with vanilla HTML, CSS, and JavaScript
- No dependencies or frameworks required
- Fully responsive design
- Works in all modern web browsers

## Files

- `index.html` - Main HTML structure
- `calculator.js` - Calculator logic and functionality
- `styles.css` - Styling and layout
- `README.md` - This file

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## License

Open source - feel free to use and modify as needed.
