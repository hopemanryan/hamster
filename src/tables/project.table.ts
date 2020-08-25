export const ProjectTable = {
  name: 'projects',
  model: {
    "id:uuid": {pk: true},
    "projectName:string": {},
    "version:string": {},
    "projectPath:string": {},
    "scripts:obj[]": [],
    "appRequirements:obj[]" : [],
    "gitCommits:obj[]": [],
    "readMe:string": {},
  },

};
