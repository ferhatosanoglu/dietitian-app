import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(
    private _apiFetchService: ApiFetchService,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService
  ) { }
  async listAsync() {
    return await this._apiFetchService.requestAsync(
      'GET',
      'patient',
      null!,
      true
    );
  }

  async deleteAsync(values: any) {
    return await this._apiFetchService.requestAsync(
      'DELETE',
      `patient/${values.id}`,
      null!,
      true
    );
  }

  async findAsync(Id: any) {
    return await this._apiFetchService.requestAsync(
      'GET',
      `patient/${Id}`,
      null!
    );
  }
  async updateAsync(values: any) {
    return await this._apiFetchService.requestAsync(
      'PUT',
      `patient/${values.id}`,
      values,
      true
    );
  }

  async insertAsync(values: any) {
    return await this._apiFetchService.requestAsync(
      'POST',
      'patient',
      values
    );
  }

  errorNotification(error: any) {
    let errorMessage: string;
    switch (error.status) {
      case 417:
        this._translateService
          .get('Please enter correct patient information !')
          .subscribe((value) => (errorMessage = value));
        break;
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
