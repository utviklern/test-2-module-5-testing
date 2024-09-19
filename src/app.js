export function displayMessage(message, type) {
  const output = document.getElementById('output');
  output.textContent = message;
  output.className = type;
}
// Function to attach event listeners
export function setupFormHandler() {
  const form = document.getElementById('userForm');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const age = document.getElementById('age').value;
    if (!username || !age) {
      displayMessage('Please fill in all fields.', 'error');
return; }
    if (parseInt(age, 10) < 18) {
      displayMessage('You must be at least 18 years old.', 'error');
} else {
      displayMessage(`Welcome, ${username}!`, 'success');
    }
}); }
// Call the function when the DOM is loaded in the actual app, and hide from testing
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', setupFormHandler);
}