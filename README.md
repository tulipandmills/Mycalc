# Calculator App

A modern, web-based calculator with basic arithmetic operations and unit conversion for time units (seconds, minutes, hours, days, weeks, months).

## Live Demo

Try it out here: [https://tulipandmills.github.io/Mycalc/](https://tulipandmills.github.io/Mycalc/)

## Features

### Basic Math Calculator
- Addition, subtraction, multiplication, and division
- Decimal number support
- Keyboard support for quick calculations
- **Calculation history log** - keeps track of all calculations with newest at bottom
- Classic green/gray display with dark gray digits
- Clear function clears both display and history
- Delete function for correcting entries

### Unit Conversion
- Support for time units: seconds, minutes, hours, days, weeks, months
- **Unit assignment**: Click "🕐 Units" button and select a unit to assign it to the current value
- **Unit conversion**: With a value and unit set, click Units and select a different unit to convert
- **Unit-aware arithmetic**: Perform calculations with different units (e.g., 123 seconds + 2 minutes)
- **Auto-conversion**: When adding/subtracting values with different units, they're automatically converted
- Unit indicator shows in the top-left of the display

## How to Use

### Basic Calculator
1. Open `index.html` in your web browser or visit the live demo
2. Click numbers and operators to perform calculations
3. Press "=" to see the result - the calculation is logged in the history area
4. Previous calculations appear in the history log (newest at bottom)
5. Use "C" to clear both display and history
6. Use "⌫" to delete the last digit

**Keyboard Shortcuts:**
- Numbers: 0-9
- Operators: +, -, *, /
- Calculate: Enter or =
- Clear: Escape or C
- Delete: Backspace

### Unit Conversion

**Assigning a Unit:**
1. Enter a number (e.g., 123)
2. Click the "🕐 Units" button
3. Select a unit from the menu (e.g., "sec" for seconds)
4. The unit label appears in the display

**Converting Between Units:**
1. Enter a value with a unit (e.g., 120 seconds)
2. Click "🕐 Units" and select a different unit (e.g., "min")
3. The value converts automatically (120 sec → 2 min)
4. Conversion is logged in history

**Arithmetic with Units:**
1. Enter a value and assign a unit (e.g., 123 seconds)
2. Click an operator (e.g., +)
3. Enter another value and assign a different unit (e.g., 2 minutes)
4. Press "=" to calculate
5. Result is shown in the first unit (e.g., 123sec + 2min = 243sec)

## Examples

**Basic Math:**
- 25 + 17 = 42
- 100 / 4 = 25
- 3.14 * 2 = 6.28

**Unit Conversions:**
- 120sec → 2min
- 2hr → 120min
- 1wk → 7day

**Unit Arithmetic:**
- 30sec + 2min = 150sec
- 1hr + 30min = 90min
- 2day - 12hr = 36hr

## Technical Details

- Built with vanilla HTML, CSS, and JavaScript
- No dependencies or frameworks required
- Fully responsive design (works on all screen sizes)
- Works in all modern web browsers
- Unit conversions use seconds as base unit for accuracy

## Files

- `index.html` - Main HTML structure
- `calculator.js` - Calculator logic and unit conversion functionality
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
