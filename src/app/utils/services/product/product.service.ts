import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private _apiFetchService: ApiFetchService,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _router: Router
  ) { }

  async addProduct(values: object) {
    return await this._apiFetchService.requestAsync(
      'POST',
      'Wallet',
      values
    );
  }

  async listAsync() {
    return await this._apiFetchService.requestAsync(
      'GET',
      'Wallet',
      null!
    );
  }
  async confirmProduct(value: any) {
    await this._apiFetchService.requestAsync(
      'DELETE',
      `Wallet/${value.id}`,
      value
    );
    value.State = true;
    return await this._apiFetchService.requestAsync(
      'POST',
      `Wallet`,
      value
    );
  }
}