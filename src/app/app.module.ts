import { NgModule } from '@angular/core';
import { MatModule } from './utils';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/layouts/client/header/header.component';
import {
} from './components';
import {
  HomepageComponent
} from './pages';
import { AdminComponent } from './pages/admin/admin.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HeaderComponent,
    HomepageComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatModule,
    MatSnackBarModule,
    Ng2SearchPipeModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
