import { Component, OnInit, Inject } from '@angular/core';
import { Diet } from '../../models';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DietService } from '../../utils';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-diet',
  templateUrl: './add-diet.component.html',
  styleUrls: ['./add-diet.component.scss'],
})
export class AddDietComponent implements OnInit {
  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _dietService: DietService,
    public _router: Router,
    private dialogRef: MatDialogRef<AddDietComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  _model: Diet = new Diet();
  _dietRenew: boolean = false;
  _action!: Function;
  disableButton: boolean = false;
  async ngOnInit() {
    if (this.data?.id != null) {
      try {
        this._model = this.data;
      } catch (error) {
        this._dietService.errorNotification(error);
      }
      this._action = this.updateActionAsync;
    } else {
      this._dietRenew = false;
      this._action = this.insertActionAsync;
    }
  }
  async onSave(dietForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };
    if (dietForm.valid) {
      this._translateService
        .get('Diet registration completed')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(dietForm))) return;
      this.dialogRef.close(this._dietRenew);
    } else {
      this._translateService
        .get('Please fill in the required fields')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__error';
    }
    this._snackBar.open(notification.message, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: notification.panelClass,
    });
  }
  async insertActionAsync(dietForm: NgForm) {
    try {
      this.disableButton = true;
      await this._dietService.insertAsync(dietForm.value);
      dietForm.resetForm();
      this._dietRenew = true;
      return true;
    } catch (error) {
      this.disableButton = false;
      this._dietService.errorNotification(error);
      return false;
    }
  }
  async updateActionAsync(dietForm: NgForm) {
    try {
      await this._dietService.updateAsync(
        Object.assign(dietForm.value, {
          id: this.data.id,
        })
      );
      return true;
    } catch (error) {
      this._dietService.errorNotification(error);
      return false;
    }
  }
}