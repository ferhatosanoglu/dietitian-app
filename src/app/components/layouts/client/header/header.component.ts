import { Component, OnInit } from '@angular/core';
import { DoctorService, LanguageService } from '../../../../utils';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from 'src/app/models';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor(
    private _languageService: LanguageService,
    private _doctorService: DoctorService,
    private _dialog: MatDialog,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }
  Id = this._activatedRoute.snapshot.paramMap.get('id');
  doctor: Doctor = new Doctor;
  lang: string =
    this._languageService.getLanguage() == 'en'
      ? 'us'
      : this._languageService.getLanguage() || 'tr';
  async ngOnInit() {
    this.doctor = <Doctor>await this._doctorService.findAsync(this.Id);
    console.log(this.doctor);
  }

  setLang(lang: string) {
    this.lang = lang == 'en' ? 'us' : lang;
    this._languageService.setLanguage(lang);
  }
}
