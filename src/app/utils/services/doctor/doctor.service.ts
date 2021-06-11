import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';

@Injectable({
  providedIn: 'root'
})

export class DoctorService {

  constructor(
    private _apiFetchService: ApiFetchService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService
  ) { }
  async findAsync(Id: any) {
    return await this._apiFetchService.requestAsync(
      'GET',
      `doctor/${Id}`,
      null!
    );
  }

  async login(doctor: any) {
    try {
      const respone: any = await this._apiFetchService.requestAsync(
        'GET',
        `doctor?TC=${doctor.TC}`,
        null!
      );
      if (respone[0].Password == doctor.Password) {
        this._router.navigateByUrl(`${respone[0].id}/patient`);
      } else {
        let errorMessage: string;
        this._translateService
          .get('Your active password does not match !')
          .subscribe((value) => (errorMessage = value));
        this._snackBar.open(errorMessage!, 'X', {
          duration: 3000,
          panelClass: 'notification__error',
        });
      }
      return respone;
    } catch (error) {
      let errorMessage: string;
      switch (error.status) {
        case 417:
          this._translateService
            .get('Please enter correct user information !')
            .subscribe((value) => (errorMessage = value));
          break;
        default:
          this._translateService
            .get(
              'No such user found !'
            )
            .subscribe((value) => (errorMessage = value));
          break;
      }
      this._snackBar.open(errorMessage!, 'X', {
        duration: 3000,
        panelClass: 'notification__error',
      });
    }
  }
  async listAsync() {
    return await this._apiFetchService.requestAsync(
      'GET',
      'doctor',
      null!,
      true
    );
  }

  async deleteAsync(values: any) {
    return await this._apiFetchService.requestAsync(
      'DELETE',
      `doctor/${values.id}`,
      null!,
      true
    );
  }

  async updateAsync(values: any) {
    return await this._apiFetchService.requestAsync(
      'PUT',
      `doctor/${values.id}`,
      values,
      true
    );
  }

  async insertAsync(values: any) {
    return await this._apiFetchService.requestAsync(
      'POST',
      'doctor',
      values
    );
  }
  errorNotification(error: any) {
    let errorMessage: string;
    switch (error.status) {
      default:
        this._translateService
          .get(
            'Server error occurred, please try again later If the error persists, we ask you to report this to the authorities'
          )
          .subscribe((value) => (errorMessage = value));
        break;
    }
    this._snackBar.open(errorMessage!, 'X', {
      duration: 4000,
      panelClass: 'notification__error',
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }
}
