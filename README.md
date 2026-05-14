# input-number

A web component that provides a sanitized, numeric-only text input, solving the common limitations of standard HTML inputs.

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

## Demo
https://code4fukui.github.io/input-number/

## Why `input-number`?

Standard HTML inputs like `<input type="number">` or `<input pattern="[0-9]*">` have drawbacks. They often allow users to type non-numeric characters, ignore the `maxlength` attribute, and provide a poor user experience for validation. This component solves these problems by providing real-time, character-by-character validation and sanitization.

## Features
- **Strictly Numeric:** Only allows digits `0-9` to be entered.
- **Automatic Sanitization:** Converts full-width Japanese numbers (０-９) to standard half-width digits. Strips any non-numeric characters from pasted content.
- **Real-time Validation:** Prevents invalid characters from being typed, rather than waiting for form submission.
- **Visual Feedback:** Highlights required fields that are empty and displays a temporary tooltip on invalid input attempts.
- **Multi-line Support:** Renders as a multi-line `<textarea>` when the `rows` attribute is present.
- **Mobile-Friendly:** Sets `inputmode="numeric"` to show the numeric keypad on mobile devices.
- **Standard Attributes:** Supports common input attributes like `maxlength`, `placeholder`, `required`, and `value`.

## Usage

### 1. Import the component
Load the component using a script tag in your HTML.
```html
<script type="module" src="https://code4fukui.github.io/input-number/input-number.js"></script>
```

### 2. Use it in your HTML
Use the `<input-number>` tag with standard attributes.

```html
<!-- Simple numeric input with a max length -->
<input-number id="zip-code" maxlength="7"></input-number>

<!-- A required, multi-line input -->
<input-number id="id-list" rows="4" maxlength="200" placeholder="Enter numeric IDs, one per line..." required></input-number>
```

### 3. Get the value
Listen for the `onchange` event or access the `.value` property to get the clean, numeric string.

```html
<script type="module">
  const zipCodeInput = document.getElementById('zip-code');
  zipCodeInput.onchange = () => {
    console.log(zipCodeInput.value); // e.g., "1234567"
  };
</script>
```

## Attributes
- `value`: The initial value of the input.
- `maxlength`: The maximum number of characters allowed.
- `placeholder`: The placeholder text to display when the input is empty.
- `rows`: If set to a value greater than 1, the component will render as a multi-line `<textarea>`.
- `required`: A boolean attribute that makes the input mandatory. Empty required inputs will have a visual highlight.

## Programmatic Usage
You can also create and configure an `InputNumber` instance using JavaScript.
```javascript
import { InputNumber } from "https://code4fukui.github.io/input-number/input-number.js";

const parentElement = document.getElementById("my-container");

// Create a multi-line required input
const multiLineInput = new InputNumber({ rows: 8, required: "required" });
parentElement.appendChild(multiLineInput);

// Create a single-line input with a default value
const