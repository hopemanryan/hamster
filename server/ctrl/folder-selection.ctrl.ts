import {dialog, ipcMain, IpcMain} from 'electron'
import BrowserWindow = Electron.BrowserWindow;
import {IProject} from "../interfaces/project.interface";
import {getProjectInfo} from "../projectParser";
export const  FolderSelectCtrl =  (ipcMain: IpcMain, win: BrowserWindow) => {

  ipcMain.on('openFolderSelector', async (event, path) => {
    const result = await dialog.showOpenDialog(win, {
      properties: ['openDirectory']
    });

    const filePath = result.filePaths[0];
    if (!filePath) {
      return;
    }
    try {
      const projectInfo: IProject = await getProjectInfo(filePath)
      win.webContents.send('folderPathResponse', projectInfo);

    } catch (e) {
      console.error(e)
      win.webContents.send('ErrorCode', e)
    }


  });

};
