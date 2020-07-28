import * as fs from 'fs-extra'
import {ErrorsEnum} from "./enums/errors.enum";
import {IProject} from "./interfaces/project.interface";
export async function getProjectInfo(projectPath: string): Promise<any> {
    const fileList = await fs.readdir(projectPath);
    if(!fileList.includes('.git')) {
      throw Error(ErrorsEnum.NOT_GIT_PATH)
    }
    const packageJsonFileRaw = await fs.readFile(projectPath+ '/package.json', 'utf-8');
    const packageJsonParsed: any = JSON.parse(packageJsonFileRaw)
    const response: IProject = {
      id: '' + uuidv4(),
      projectName: packageJsonParsed.name,
      version: packageJsonParsed.version,
      scripts: [],
      projectPath
    };

    if(packageJsonParsed.scripts) {
      for(const script in packageJsonParsed.scripts) {
        response.scripts.push({
          keyword: script,
          cmd: packageJsonParsed.scripts[script]
        })
      }
    }

    return response;


}
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
