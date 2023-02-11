const { app, BrowserWindow } = require("electron");
const path = require("path");
require('@electron/remote/main').initialize()
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      //   preload: path.join(__dirname, 'preload.js')
      nodeIntegration: false,
      contextIsolation:true,

    },
  });
  win.maximize();
  win.loadURL("http://localhost:3000");
}

// require("electron-reload")(__dirname,{
//   electron:path.join(__dirname, 'node_modules', '.bin', 'electron')
// })

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
