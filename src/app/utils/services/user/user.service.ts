import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private _apiFetchService: ApiFetchService,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _router: Router
  ) { }
  async listAsync() {
    return await this._apiFetchService.requestAsync(
      'GET',
      'Users',
      null!,
      true
    );
  }
  async login(_user: any) {
    const users: any = await this._apiFetchService.requestAsync(
      'Get',
      'Users',
      null!
    )
    users.forEach((user: { Username: any; Password: any; id: any; }) => {
      if (user.Username == _user.Username && user.Password == _user.Password) {
        this._router.navigate([
          'home',
          user.id
        ]);
      }
    });
  }

  async deleteAsync(values: any) {
    return await this._apiFetchService.requestAsync(
      'DELETE',
      'Users',
      values,
      true
    );
  }

  async findAsync(Id: any) {
    return await this._apiFetchService.requestAsync(
      'GET',
      `Users/${Id}`,
      null!
    );
  }

  async insertAsync(values: object) {
    return await this._apiFetchService.requestAsync(
      'POST',
      'Users',
      values
    );
  }

  errorNotification(error: { status: any; }) {
    let errorMessage: string;
    switch (error.status) {
      case 400:
        this._translateService
          .get('Your active password does not match !')
          .subscribe(value => (errorMessage = value));
        break;
      case 401:
        this._translateService
          .get('Unauthorized transaction !')
          .subscribe(value => (errorMessage = value));
        break;
      case 409:
        this._translateService
          .get('Such an user is already registered in the system !')
          .subscribe((value) => (errorMessage = value));
        break;
      case 417:
        this._translateService
          .get('Please enter correct category information !')
          .subscribe((value) => (errorMessage = value));
        break;
      case 404:
        this._translateService
          .get('No user record found in the system !')
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
