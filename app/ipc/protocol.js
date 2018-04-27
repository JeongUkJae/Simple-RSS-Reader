module.exports = () => {
  var { app, ipcMain } = require("electron");

  ipcMain.on('on-register-protocol', (event, arg) => {
    app.setAsDefaultProtocolClient('feed')
  })
};
