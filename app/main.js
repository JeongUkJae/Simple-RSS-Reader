const { app, BrowserWindow } = require('electron');

const isDev = require('electron-is-dev');
const path = require('path');
const url = require('url');

let mainWindow = null

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600, titleBarStyle: 'hiddenInset'})

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : url.format({
    pathname: path.join(__dirname, '../public/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

