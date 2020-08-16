export const CommandGroup = {
  name: 'command-group',
  model: {
    "id:uuid": {pk: true},
    "name:string": {},
    "projectId:string": {},
    "scripts:obj[]": []
  },

};
