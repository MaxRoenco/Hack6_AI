const biasScore = 72; // Example bias score value

const getBiasStyle = () => {
  if (biasScore > 70) {
    return "background-color: red; color: white;";
  }
  if (biasScore > 40) {
    return "background-color: yellow; color: black;";
  }
  return "background-color: green; color: white;";
};


function createCognitiveBiasNotification(bias, sentence) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    right: -400px;  /* Start off-screen */
    top: 16px;
    z-index: 99999;
    width: 500px;
    background: linear-gradient(135deg, #ffffff, #f4f4f4);
    border: 1px solid #e0e0e0;
    border-radius: 16px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
    padding: 20px;
    transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;

  const buttonLinkStyle = `
  text-decoration: none;
  min-height: 60px;
  width: 200px; 
  background: #f0f2f5; 
  border: 1px solid #e9ecef;
  padding: 10px; 
  border-radius: 8px; 
  color: #333; 
  font-weight: 700; 
  font-size: 14px;
  cursor: pointer;
  display: flex;
  text-align: center;
  transition: all 0.2s ease;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  outline: none;
  &:hover {
    background: #e6e8eb;
    box-shadow: 0 4px 6px rgba(0,0,0,0.15);
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(1px);
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  }
`;

  notification.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
      <div>
        <h3 style="color: #ff4d4f; font-size: 18px; margin: 0; font-weight: 600;">Cognitive Bias Detected</h3>
        <p style="color: #667085; font-size: 14px; margin-top: 5px;">${bias}</p>
      </div>
      <button id="close-btn" style="
        background: none; 
        border: none; 
        color: #667085; 
        font-size: 20px; 
        cursor: pointer; 
        padding: 0;
        transition: transform 0.2s;
      ">✕</button>
    </div>

    <div 
    style="
      text-align: center; 
      font-size: 6rem; 
      font-weight: 900; 
      padding: 1rem; 
      border-radius: 0.5rem; 
      line-height: 1;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      " id="biasDiv">
    </div>
    
    <div style="
      background: #f9fafb; 
      padding: 12px; 
      border-radius: 8px; 
      margin-bottom: 15px;
      border: 1px solid #e9ecef;
      font-style: italic;
      color: #333;
    ">
      "${sentence}"
    </div>
    
    <div style="width: 100%; gap: 10px; display: flex; align-items:center; justify-content: center">
      <button id="expand-btn" style="${buttonLinkStyle}">
        Check more Detailes
      </button>

      <a href="http://localhost:5173" style="${buttonLinkStyle}">
        Check Our Website
      </a>
    </div>
    
    <div id="details" style="display: none; margin-top: 15px; color: #667085; font-size: 14px;"></div>
  `;

  const biasDetails = {
    'Confirmation Bias': 'You unconsciously seek information that confirms existing beliefs, while dismissing contradictory evidence.',
    'Anchoring Bias': 'Your first piece of information dramatically influences subsequent decisions, creating a psychological anchor.',
    'Availability Heuristic': 'Recent or memorable events disproportionately influence your risk assessment and judgment.'
  };

  const closeBtn = notification.querySelector('#close-btn');
  const expandBtn = notification.querySelector('#expand-btn');
  const detailsDiv = notification.querySelector('#details');
  const biasDiv = notification.querySelector("#biasDiv");

  // Ensure biasDiv exists before setting style
  if (biasDiv) {
    biasDiv.style.backgroundColor = biasScore > 70 ? 'red' : (biasScore > 40 ? 'yellow' : 'green');
    biasDiv.style.color = biasScore > 40 ? 'black' : 'white';
    biasDiv.textContent = biasScore;
  }

  // Sliding in animation
  setTimeout(() => {
    notification.style.right = '16px';
  }, 50);

  closeBtn.addEventListener('click', () => {
    notification.style.right = '-400px';
    setTimeout(() => document.body.removeChild(notification), 400);
  });

  expandBtn.addEventListener('click', () => {
    if (detailsDiv.style.display === 'none') {
      detailsDiv.textContent = biasDetails[bias] || 'No details available.';
      detailsDiv.style.display = 'block';
      expandBtn.textContent = 'Hide Details';
    } else {
      detailsDiv.style.display = 'none';
      expandBtn.textContent = 'Check more Detailes';
    }
  });

  // Removed the checkDetailsBtn event listener
  // The link will now simply navigate to localhost:1573

  closeBtn.addEventListener('mouseover', (e) => {
    e.target.style.transform = 'rotate(90deg)';
  });

  closeBtn.addEventListener('mouseout', (e) => {
    e.target.style.transform = 'rotate(0deg)';
  });

  document.body.appendChild(notification);
}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  if (request.action === 'showExtension') {
    console.log("HMM");
    const biases = ['Confirmation Bias', 'Anchoring Bias', 'Availability Heuristic'];
    const randomBias = biases[Math.floor(Math.random() * biases.length)];
    createCognitiveBiasNotification(
      randomBias, 
      'This is an example sentence demonstrating a potential cognitive bias.'
    );
  }
});