chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      setTimeout(() => {
        chrome.tabs.sendMessage(tabId, { action: 'showExtension' });
      }, 3000);
    }
  });