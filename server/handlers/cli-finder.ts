const util = require('util');
const exec = util.promisify(require('child_process').exec);

import * as parser from 'xml2json'
import * as  jp from 'jsonpath'

export class CliFinder  {
  systemOs: 'mac' | 'win32'|  'linux'
  constructor(private os:  NodeJS.Platform) {
    switch (os) {
      case "darwin":
        this.systemOs = 'mac';
        break
      case "win32":
        this.systemOs = "win32";
        break;
      default:
        this.systemOs ="linux";
        break;
    }
  }

  public async findOptions() {
    switch (this.systemOs) {
      case "win32":
        return this.findWindowsOptions();
      case "mac":
        return await this.findMacOptions();
      default :
        return this.findLinuxOptions();
    }
  }

  private findWindowsOptions() {
      return [
        {
          name: 'CMD',
          val: 'cmd.exe'
        },
        {
          name: 'Powershell',
          val: 'powershell.exe'
        }
      ]
  }

  private async findMacOptions() {
    const options = [
      {
        name: 'Terminal',
        val: 'Terminal'
      }
    ];
    const optionsFormMacAppCheck = await this.runMacAppCheck();
    for (const op of optionsFormMacAppCheck) {
      options.push({name: op, val:  op})
    }
    return options;

  }

  private  async runMacAppCheck(): Promise<Array<string>> {
    const cliOptions = ['iTerm', 'Hyper', 'Terminator']
    const { stdout, stderr } = await exec('system_profiler -xml  SPApplicationsDataType' );
    const profile: any = parser.toJson(stdout.toString(), { object: true })

    return jp
      .query(profile, 'plist.array.dict.array[1].dict[*].string[0]')
      .filter(item => cliOptions.indexOf(item) > -1);



  }
  private findLinuxOptions() {

  }






}
