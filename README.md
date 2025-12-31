# Calculator App

A modern, web-based calculator with basic arithmetic operations, unit conversion for time units, and epoch/datetime calculations.

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
- Support for time units: **seconds, minutes, hours, days, weeks, months, years**
- **Unit assignment**: Click "🕐 Units" button and select a unit to assign it to the current value
- **Unit conversion**: With a value and unit set, click Units and select a different unit to convert
- **Unit-aware arithmetic**: Perform calculations with different units (e.g., 123 seconds + 2 minutes)
- **Auto-conversion**: When adding/subtracting values with different units, they're automatically converted
- Unit indicator shows in the top-left of the display

### Epoch/DateTime Features
- **DateTime Input**: Select any date and time to convert to epoch seconds
- **"Now" button**: Instantly get current time as epoch seconds
- **Dual Display**: Shows both epoch seconds (main display) and formatted datetime (bottom-left)
- **DateTime Arithmetic**: Add time units to datetimes (e.g., "Tomorrow 13:00 + 5 hours")
- **Mixed Calculations**: Combine epoch times with time units in calculations
- Epoch values displayed as Unix timestamps (seconds since Jan 1, 1970)

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

### DateTime and Epoch

**Using DateTime Input:**
1. Click the datetime input field
2. Select a date and time (e.g., "Jan 2, 2025 13:00:00")
3. Click "Use DateTime" button
4. The epoch seconds appear in the main display
5. Formatted datetime appears in the bottom-left of the display

**Using "Now" Button:**
1. Click the "Now" button
2. Current time is converted to epoch seconds
3. Both epoch and formatted time are displayed

**DateTime Arithmetic Examples:**
1. **Tomorrow 13:00 + 5 hours:**
   - Select tomorrow at 13:00 in datetime input
   - Click "Use DateTime"
   - Enter `5`, select "hours" unit
   - Click "+" then "="
   - Result shows tomorrow at 18:00 (in epoch + formatted)

2. **2 days from now:**
   - Click "Now"
   - Enter `2`, select "days" unit
   - Click "+" then "="
   - Shows date/time 2 days in the future

3. **Time between dates:**
   - Enter first datetime, click "Use DateTime"
   - Click "-"
   - Enter second datetime, click "Use DateTime"
   - Click "=" to get difference in seconds

## Examples

**Basic Math:**
- 25 + 17 = 42
- 100 / 4 = 25
- 3.14 * 2 = 6.28

**Unit Conversions:**
- 120sec → 2min
- 2hr → 120min
- 1wk → 7day
- 2yr → 730day

**Unit Arithmetic:**
- 30sec + 2min = 150sec
- 1hr + 30min = 90min
- 2day - 12hr = 36hr
- 1yr + 6mo = 547day

**DateTime Examples:**
- Jan 1, 2025 13:00 → 1735740000 (epoch)
- Now + 5hr = Future datetime
- Tomorrow 13:00 + 2days = 3 days from now at 13:00
- Epoch 1735740000 + 3600sec = +1 hour

## Technical Details

- Built with vanilla HTML, CSS, and JavaScript
- No dependencies or frameworks required
- Fully responsive design (works on all screen sizes)
- Works in all modern web browsers
- Unit conversions use seconds as base unit for accuracy
- Epoch times stored as Unix timestamps (seconds since Jan 1, 1970 UTC)
- DateTime display uses browser's local timezone

## Files

- `index.html` - Main HTML structure
- `calculator.js` - Calculator logic, unit conversion, and datetime functionality
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
