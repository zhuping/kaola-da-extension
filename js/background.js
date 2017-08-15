chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.windows.create({
    url: 'popup.html?' + tab.id,
    type: 'popup',
    width: 800,
    height: 600
  });
});
