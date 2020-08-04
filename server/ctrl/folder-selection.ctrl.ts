import {dialog, IpcMain} from 'electron'
import BrowserWindow = Electron.BrowserWindow;
import {IProject} from "../interfaces/project.interface";
import {getProjectInfo} from "../projectParser";
import {BaseCtrl} from "./base.ctrl";

export class  FsSCtrl  extends BaseCtrl{
  constructor(private  ipcMain: IpcMain, private win: BrowserWindow) {
    super(ipcMain, win);
    this.initListeners()

  }


  async  getFolderPath() {
    const result = await dialog.showOpenDialog(this.win, {
      properties: ['openDirectory']
    });
    const filePath = result.filePaths[0];
    if (!filePath) {
      return;
    }
    return filePath

  }


  initListeners() {
    this.ipcMain.on('openFolderSelector', async (event, path) => {
      const directory = await this.getFolderPath();
      if (!directory) {
        return;
      }
      try {
        const projectInfo: IProject = await getProjectInfo(directory);
        this.win.webContents.send('folderPathResponse', projectInfo);

      } catch (e) {
        console.error(e);
        this.win.webContents.send('ErrorCode', e)
      }
    });


    this.ipcMain.on('syncSingleProject', async (event, req: IProject) => {
      const projectInfo: IProject = await getProjectInfo(req.projectPath);
      this.win.webContents.send('syncSingleDone', {data: {...projectInfo, id: req.id}})
    });
  }

}




