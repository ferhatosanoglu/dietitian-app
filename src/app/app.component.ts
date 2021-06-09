import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './utils';
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'Dietitian App';
  constructor(
    private _translate: TranslateService,
    private _languageService: LanguageService,
  ) {
    _translate.addLangs(['tr', 'en']);
    _translate.setDefaultLang('tr');
    if (_languageService.getLanguage()) {
      _translate.use(localStorage.getItem('language')!);
    }
  }
}
