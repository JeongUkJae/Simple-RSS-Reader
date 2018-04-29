const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const open = require("open");

const path = require("path");
const url = require("url");

const ipcModule = require("./ipc");
const db = require("./db");

let mainWindow = null;

function createWindow(callback = undefined) {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: "hiddenInset",
    icon: "./logo.png"
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : url.format({
          pathname: path.join(__dirname, "../public/index.html"),
          protocol: "file:",
          slashes: true
        })
  );

  mainWindow.on("closed", function() {
    mainWindow = null;
  });

  mainWindow.webContents.on("new-window", function(event, url) {
    event.preventDefault();
    open(url);
  });

  callback ? ipcModule.register(callback) : ipcModule.register();
}

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", function() {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on("open-url", async function(event, url) {
  if (!mainWindow) {
    createWindow(() => {
      ipcModule.addFeed(url, mainWindow);
    });
  } else {
    ipcModule.addFeed(url, mainWindow);
  }
});
