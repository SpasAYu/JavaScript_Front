import '../css/style.css'
import javascriptLogo from '../javascript.svg'
import viteLogo from '/vite.svg'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

// Save resume content to localStorage
function saveContent() {
  const editableElements = document.querySelectorAll('.editable');
  const content = {};
  
  editableElements.forEach((element, index) => {
    content[`element-${index}`] = element.innerHTML;
  });
  
  localStorage.setItem('resumeContent', JSON.stringify(content));
}

// Load resume content from localStorage
function loadContent() {
  const savedContent = localStorage.getItem('resumeContent');
  if (savedContent) {
    const content = JSON.parse(savedContent);
    const editableElements = document.querySelectorAll('.editable');
    
    editableElements.forEach((element, index) => {
      if (content[`element-${index}`]) {
        element.innerHTML = content[`element-${index}`];
      }
    });
  }
}

// Add Material Wave effect
function createRipple(event) {
  const button = event.currentTarget;
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.className = 'ripple';
  
  button.appendChild(ripple);
  
  ripple.addEventListener('animationend', () => {
    ripple.remove();
  });
}

// Handle PDF download
function downloadPDF() {
  window.print();
}

// Add highlight animation to edited elements
function addHighlightAnimation(element) {
  element.classList.add('highlight');
  element.addEventListener('animationend', () => {
    element.classList.remove('highlight');
  }, { once: true });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Load saved content
  loadContent();
  
  // Add event listeners for editable elements
  const editableElements = document.querySelectorAll('.editable');
  editableElements.forEach(element => {
    element.addEventListener('blur', () => {
      saveContent();
      addHighlightAnimation(element);
    });
    
    // Save on Enter key press
    element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        element.blur();
      }
    });
  });
  
  // Add download button functionality
  const downloadBtn = document.getElementById('downloadBtn');
  downloadBtn.addEventListener('click', (e) => {
    createRipple(e);
    downloadPDF();
  });
  
  // Add ripple effect to all interactive elements
  const interactiveElements = document.querySelectorAll('button, .editable');
  interactiveElements.forEach(element => {
    if (element.tagName === 'BUTTON') {
      element.addEventListener('click', createRipple);
    }
  });
});
