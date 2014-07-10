
    chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({'url': 'http://localhost:8888/extension/index.html#'}, function(tab) {
    // Tab opened.
  });
});