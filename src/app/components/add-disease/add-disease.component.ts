import { Component, OnInit, Inject } from '@angular/core';
import { Disease } from '../../models';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DiseaseService } from '../../utils';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-disease',
  templateUrl: './add-disease.component.html',
  styleUrls: ['./add-disease.component.scss']
})
export class AddDiseaseComponent implements OnInit {

  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _diseaseService: DiseaseService,
    public _router: Router,
    private dialogRef: MatDialogRef<AddDiseaseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  _model: Disease = new Disease();
  _diseaseRenew: boolean = false;
  _action!: Function;
  async ngOnInit() {
    if (this.data?.id != null) {
      try {
        this._model = this.data;
      } catch (error) {
        this._diseaseService.errorNotification(error);
      }
      this._action = this.updateActionAsync;
    } else {
      this._diseaseRenew = false;
      this._action = this.insertActionAsync;
    }
  }
  async onSave(diseaseForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };
    if (diseaseForm.valid) {
      this._translateService
        .get('Patient registration completed')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(diseaseForm))) return;
      this.dialogRef.close(this._diseaseRenew);
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
  async insertActionAsync(diseaseForm: NgForm) {
    try {
      await this._diseaseService.insertAsync(diseaseForm.value);
      diseaseForm.resetForm();
      this._diseaseRenew = true;
      return true;
    } catch (error) {
      this._diseaseService.errorNotification(error);
      return false;
    }
  }
  async updateActionAsync(dietForm: NgForm) {
    try {
      await this._diseaseService.updateAsync(
        Object.assign(dietForm.value, {
          id: this.data.id,
        })
      );
      return true;
    } catch (error) {
      this._diseaseService.errorNotification(error);
      return false;
    }
  }
}
