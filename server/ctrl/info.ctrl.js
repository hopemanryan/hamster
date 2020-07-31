"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalCtrl = void 0;
var os = require("os");
exports.PersonalCtrl = function (ipcMain, win) {
    ipcMain.on('getUserName', function () {
        var username = os.userInfo().username;
        win.webContents.send('sendUserName', username);
    });
};
//# sourceMappingURL=info.ctrl.js.map