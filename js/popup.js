var tabId = parseInt(window.location.search.substring(1));
var filters = {
  urls: ['*://rev.da.netease.com/__dam.gif?*'],
  tabId: tabId
}

function addListeners() {
  chrome.webRequest.onBeforeRequest.addListener(handleEvent, filters, ['requestBody']);
  chrome.webRequest.onSendHeaders.addListener(handleEvent, filters, ['requestHeaders']);
  chrome.webRequest.onBeforeRedirect.addListener(handleEvent, filters, ['responseHeaders']);
  chrome.webRequest.onCompleted.addListener(handleEvent, filters, ['responseHeaders']);
  chrome.webRequest.onErrorOccurred.addListener(handleEvent, filters);
}

function removeListeners() {
  chrome.webRequest.onBeforeRequest.removeListener(handleEvent);
  chrome.webRequest.onSendHeaders.removeListener(handleEvent);
  chrome.webRequest.onBeforeRedirect.removeListener(handleEvent);
  chrome.webRequest.onCompleted.removeListener(handleEvent);
  chrome.webRequest.onErrorOccurred.removeListener(handleEvent);
}

function handleEvent(details) {
  var tr = $('tr[id="req-]' + details.requestId + '"]');
  if (tr.length === 0) {
    tr = $('<tr>').attr('id', 'req-' + details.requestId);
    $('#table-container tbody').append(tr);
  }

  if (details.responseHeaders) {
    $('<td>').text(getUrlParam(details.url, 'title')).appendTo(tr);
    $('<td>').text(getUrlParam(details.url, 'ec')).appendTo(tr);
    $('<td>').text(getUrlParam(details.url, 'ea')).appendTo(tr);
    $('<td>').text(getUrlParam(details.url, 'el')).appendTo(tr);
    $('<td>').text(details.statusLine).appendTo(tr);
    // $('<td>').text(details.url).appendTo(tr);
  }
}

function getUrlParam(url, name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = url.split('?')[1].match(reg);
  if (r != null) return decodeURIComponent(decodeURIComponent(r[2]));
  return null;
}

$(function() {
  addListeners();
  $('button#clear').click(clearContent);
  $('button#close').click(closeWindow);
  $('button#toggle').click(toggleCapture);
});

function clearContent() {
  $('#table-container tbody').empty();
}

function closeWindow() {
  window.close();
}

function toggleCapture(e) {
  var type = $(e.currentTarget).html();

  if (type === 'Pause') {
    removeListeners();
    $(e.currentTarget).html('Resume');
  } else if (type === 'Resume') {
    addListeners();
    $(e.currentTarget).html('Pause');
  }
}