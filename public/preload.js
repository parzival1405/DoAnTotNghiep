const { dialog,BrowserWindow } = require('@electron/remote');
window.electron = {};
window.electron.dialog = dialog;
window.electron.BrowserWindow = BrowserWindow;