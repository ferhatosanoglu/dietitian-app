import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private translate: TranslateService) { }

  setLanguage(language: string) {
    localStorage.setItem('language', language);
    this.translate.use(language);
  }

  getLanguage() {
    return localStorage.getItem('language');
  }
}
