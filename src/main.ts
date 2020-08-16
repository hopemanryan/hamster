import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { nSQL } from "@nano-sql/core";

import { AppModule } from './app/app.module';
import { AppConfig } from './environments/environment';
import {ProjectTable} from "./tables/project.table";
import {CommandGroup} from "./tables/command-group.table";

if (AppConfig.production) {
  enableProdMode();
}

const resolved = new Promise((resolve) => {
  return nSQL().createDatabase({
    id: 'git-projects',
    mode: "PERM",
    tables:[
      ProjectTable,
      CommandGroup
    ],
  })
    .then(() => resolve())
    .catch(e =>{
      console.log(e);
      return resolve()
    })
})


platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    preserveWhitespaces: false
  })
  .catch(err => console.error(err));
