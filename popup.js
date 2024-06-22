document.getElementById('show-window').addEventListener('click', () => {
    chrome.scripting.executeScript({
      target: { tabId: chrome.tabs.TAB_ID_NONE },
      function: createFloatingWindow
    });
  });
  