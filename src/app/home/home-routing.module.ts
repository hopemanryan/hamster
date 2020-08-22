import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home.component';

const routes: Routes = [
  {
    path: 'app',
    component: HomeComponent,
    children: [
      {
        path: 'project/:id',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        loadChildren: () => import('../project/project.module').then(p => p.ProjectModule)
      },
      {
        path: 'settings',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        loadChildren: () => import('../settings/settings.module').then(s => s.SettingsModule)
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
