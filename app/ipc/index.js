var { ipcMain } = require("electron");
var ipcProtocol = require("./protocol");

module.exports = () => {
  ipcMain.on("on-ready", (event, arg) => {
    ipcProtocol();

    if (!app.isDefaultProtocolClient("feed")) {
      event.sender.send("ask-register-protocol");
    }
  });
};
