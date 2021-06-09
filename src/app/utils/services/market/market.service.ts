import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(
    private _apiFetchService: ApiFetchService,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _router: Router
  ) { }

  async listAsync() {
    return await this._apiFetchService.requestAsync(
      'GET',
      'Markets',
      null!
    );
  }
  async buy(id: number, Amount: number) {
    const product: any = await this._apiFetchService.requestAsync(
      'GET',
      `Markets/${id}`,
      null!
    );
  }
}
