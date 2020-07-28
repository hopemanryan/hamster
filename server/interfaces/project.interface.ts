export interface IProject {
  id: string,
  projectName: string,
  version: string | number,
  scripts: Array<IProjectScript>,
  projectPath: string
}

export interface IProjectScript {
  keyword:string,
  cmd: string
}
