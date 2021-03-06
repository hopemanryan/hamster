import 'reflect-metadata';
import '../polyfills';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';

import {AppRoutingModule} from './app-routing.module';

// NG Translate
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {HomeModule} from './home/home.module';
import {DetailModule} from './detail/detail.module';

import {AppComponent} from './app.component';
import {
  NzAvatarModule,
  NzDividerModule,
  NzIconModule,
  NzLayoutModule,
  NzMenuModule, NzMessageService, NzNotificationService,
  NzPageHeaderModule,
  NzStepsModule,
  NzTagModule, NzToolTipModule
} from "ng-zorro-antd";
import {SideNavComponent} from './layout/side-nav/side-nav.component';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, SideNavComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    DetailModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NzLayoutModule,
    NzPageHeaderModule,
    NzMenuModule,
    NzIconModule,
    NzTagModule,
    BrowserAnimationsModule,
    NzDividerModule,
    NzAvatarModule,
    NzToolTipModule

  ],
  providers: [NzNotificationService, NzMessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
