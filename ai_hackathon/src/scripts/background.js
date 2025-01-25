chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      setTimeout(() => {
        // console.log("HMM");
        chrome.tabs.sendMessage(tabId, { action: 'showExtension' });
      }, 3000);
    }
  });