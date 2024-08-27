let color = '#e8453c';
chrome.runtime.onInstalled.addListener(() => {
  console.log('Adlink IPC AutoCheck Plugin');
  chrome.storage.sync.set({ color });
});
