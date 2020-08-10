export interface IProject {
  id: string,
  projectName: string,
  version: string | number,
  scripts: Array<IProjectScript>,
  projectPath: string
  appRequirements? : IAppReq[],
  gitCommits: any[]
}

export interface IProjectScript {
  keyword:string,
  cmd: string
}

export interface IAppReq {
  name: string,
  version: string
}
