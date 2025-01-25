// Create a method to inject and show the extension popup
function injectExtensionPopup() {
    // Create a modal container
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.zIndex = '9999';
    modal.style.width = '380px';
    modal.style.maxHeight = '600px';
    modal.style.backgroundColor = 'white';
    modal.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    modal.style.borderRadius = '8px';
    modal.style.padding = '20px';
    modal.style.overflow = 'auto';
  
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.onclick = () => modal.remove();
  
    // Create overlay to dim background
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    overlay.style.zIndex = '9998';
  
    // Inject bias analysis content (simplified version)
    modal.innerHTML = `
      <h2>Cognitive Bias Analysis</h2>
      <div style="text-align: center; fontSize: 48px; color: red;">75</div>
      <p>Potential cognitive biases detected in this content.</p>
    `;
  
    modal.appendChild(closeButton);
    
    // Add overlay and modal to body
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
  
    // Remove overlay when modal is closed
    closeButton.addEventListener('click', () => {
      overlay.remove();
      modal.remove();
    });
  }
  
  // Listen for message to show extension
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'showExtension') {
      injectExtensionPopup();
      console.log('Extension triggered after 3 seconds');
    }
  });