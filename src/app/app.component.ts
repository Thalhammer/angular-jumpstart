import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { I18NSettings } from '@app/model';
import { environment } from '@environment';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: []
})
export class AppComponent {
  constructor(private translate : TranslateService) {
    // We try to use a saved language setting, if not found or invalid
    // we fallback to the browser locale. If that is not found or not a valid lang
    // We use "en" as the default.
    // List of languages available, needs to match files in assets/i18n/*
    const valid_langs = ["en", "de"];
    // Default language for detection
    let lang = "en";

    // Try to get browser language
    let browserlang = translate.getBrowserLang();
    if(valid_langs.indexOf(browserlang) != -1) lang = browserlang;

    // Try to load stored language
    let settings = JSON.parse(localStorage.getItem(environment.ls_prefix + ".i18n")) as I18NSettings;
    if(settings) {
      if(settings.language && valid_langs.indexOf(settings.language) != -1) lang = settings.language;
    }

    translate.setDefaultLang("en");
    translate.use(lang);
  }
}