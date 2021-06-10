import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Doctor } from 'src/app/models';
import { DoctorService } from 'src/app/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _doctorService: DoctorService,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
  ) { }
  _model: Doctor = new Doctor();

  ngOnInit(): void {
  }
  onLogin(loginForm: NgForm) {
    if (loginForm.valid) {
      this._doctorService.login(loginForm.value);
    } else {
      let errorMessage: string;
      this._translateService
        .get('Please fill in the required fields')
        .subscribe((value) => (errorMessage = value));
      this._snackBar.open(errorMessage!, 'X', {
        duration: 3000,
        panelClass: 'notification__error',
      });
    }
  }
}

