function createCognitiveBiasNotification(bias, sentence) {
  // Create notification container
  const notification = document.createElement('div');
  notification.className = `
    fixed right-4 top-4 z-[1000] w-96 bg-white 
    border border-gray-200 rounded-lg shadow-lg 
    transform transition-all duration-300 ease-in-out 
    translate-x-0 opacity-100 p-4
  `;

  // Notification content
  notification.innerHTML = `
    <div class="flex justify-between items-start mb-3">
      <div>
        <h3 class="text-lg font-semibold text-red-600">Cognitive Bias Detected!</h3>
        <p class="text-sm text-gray-600 mt-1">${bias}</p>
      </div>
      <button id="close-notification" class="text-gray-400 hover:text-gray-600">✕</button>
    </div>
    
    <div class="mb-3">
      <p class="text-sm text-gray-700 italic">"${sentence}"</p>
    </div>
    
    <div class="flex justify-end">
      <button id="expand-details" class="
        text-sm text-blue-600 hover:text-blue-800 
        transition-colors font-medium
      ">
        Explain Bias
      </button>
    </div>
    
    <div id="bias-details" class="hidden mt-3 pt-3 border-t border-gray-200">
      <p class="text-sm text-gray-700"></p>
    </div>
  `;

  // Bias database (expand as needed)
  const biasDetails = {
    'Confirmation Bias': 'The tendency to search for, interpret, and favor information that confirms existing beliefs.',
    'Anchoring Bias': 'Relying too heavily on the first piece of information encountered when making decisions.',
    'Availability Heuristic': 'Overestimating the likelihood of events based on how easily examples come to mind.'
  };

  // Close button functionality
  const closeButton = notification.querySelector('#close-notification');
  closeButton.addEventListener('click', () => {
    notification.classList.add('translate-x-full', 'opacity-0');
    setTimeout(() => document.body.removeChild(notification), 300);
  });

  // Expand details functionality
  const expandButton = notification.querySelector('#expand-details');
  const detailsContainer = notification.querySelector('#bias-details');
  const detailsText = detailsContainer.querySelector('p');

  expandButton.addEventListener('click', () => {
    if (detailsContainer.classList.contains('hidden')) {
      detailsText.textContent = biasDetails[bias] || 'No detailed explanation available.';
      detailsContainer.classList.remove('hidden');
      expandButton.textContent = 'Hide Details';
    } else {
      detailsContainer.classList.add('hidden');
      expandButton.textContent = 'Explain Bias';
    }
  });

  // Add to document
  document.body.appendChild(notification);
}

// Chrome extension message listener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'showExtension') {
    const biases = [
      'Confirmation Bias', 
      'Anchoring Bias', 
      'Availability Heuristic'
    ];

    const randomBias = biases[Math.floor(Math.random() * biases.length)];
    createCognitiveBiasNotification(
      randomBias, 
      'This is an example sentence demonstrating a potential cognitive bias.'
    );
  }
});