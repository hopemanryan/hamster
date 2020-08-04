"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildMenu = void 0;
exports.BuildMenu = function (win, Menu) {
    var menuTemplate = [
        {
            label: 'Actions',
            submenu: [
                {
                    label: 'Refresh All Projects',
                    click: function () { return win.webContents.send('InitRefreshAll'); }
                }
            ]
        }
    ];
    var template = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(template);
};
//# sourceMappingURL=menu.js.map