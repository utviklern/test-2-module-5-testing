import { displayMessage, setupFormHandler } from '../src/app';  // Import the setupFormHandler

describe('Form integration tests', () => {
  // Set up the DOM structure before each test
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="container">
        <form id="userForm">
          <label for="username">Username:</label>
          <input type="text" id="username" required>
          <label for="age">Age:</label>
          <input type="number" id="age" required>
          <button type="submit">Submit</button>
        </form>
        <div id="output"></div>
      </div>
    `;
    // Attach event listeners after the DOM is set up
    setupFormHandler();
  });

  // Test displayMessage function
  it('should update the DOM when displayMessage is called', () => {
    displayMessage('Test message', 'success');
    const output = document.getElementById('output');
    expect(output.textContent).toBe('Test message');  // Check if the text content is correct
    expect(output.className).toBe('success');  // Check if the className is correctly set
  });

  // Test form submission with empty fields
  it('should show error if fields are empty on form submission', () => {
    const form = document.getElementById('userForm');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    const output = document.getElementById('output');
    expect(output.textContent).toBe('Please fill in all fields.');
    expect(output.className).toBe('error');
  });

  // Test form submission with age less than 18
  it('should show error if age is less than 18 on form submission', () => {
    document.getElementById('username').value = 'JohnDoe';
    document.getElementById('age').value = '17';
    const form = document.getElementById('userForm');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    const output = document.getElementById('output');
    expect(output.textContent).toBe('You must be at least 18 years old.');
    expect(output.className).toBe('error');
  });

  // Test valid form submission
  it('should display welcome message for valid input on form submission', () => {
    document.getElementById('username').value = 'JohnDoe';
    document.getElementById('age').value = '25';
    const form = document.getElementById('userForm');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    const output = document.getElementById('output');
    expect(output.textContent).toBe('Welcome, JohnDoe!');
    expect(output.className).toBe('success');
  });
});
