"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalCtrl = void 0;
var os = require("os");
var base_ctrl_1 = require("./base.ctrl");
var PersonalCtrl = /** @class */ (function (_super) {
    __extends(PersonalCtrl, _super);
    function PersonalCtrl(ipcMain, win) {
        var _this = _super.call(this, ipcMain, win) || this;
        _this.ipcMain = ipcMain;
        _this.win = win;
        _this.initListeners();
        return _this;
    }
    PersonalCtrl.prototype.initListeners = function () {
        var _this = this;
        this.ipcMain.on('getUserName', function () {
            var username = os.userInfo().username;
            _this.win.webContents.send('sendUserName', username);
        });
    };
    return PersonalCtrl;
}(base_ctrl_1.BaseCtrl));
exports.PersonalCtrl = PersonalCtrl;
//# sourceMappingURL=info.ctrl.js.map