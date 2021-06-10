import { Component, OnInit, Inject } from '@angular/core';
import { Doctor } from '../../models';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DoctorService } from '../../utils';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent implements OnInit {

  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _doctorService: DoctorService,
    public _router: Router,
    private dialogRef: MatDialogRef<AddDoctorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  _model: Doctor = new Doctor();
  _patientRenew: boolean = false;
  _action!: Function;
  async ngOnInit() {
    if (this.data?.id != null) {
      try {
        this._model = this.data;
      } catch (error) {
        this._doctorService.errorNotification(error);
      }
      this._action = this.updateActionAsync;
    } else {
      this._patientRenew = false;
      this._action = this.insertActionAsync;
    }
  }

  async onSave(doctorForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };
    if (doctorForm.valid) {
      this._translateService
        .get('Doctor registration completed')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(doctorForm))) return;
      this.dialogRef.close(this._patientRenew);
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

  async insertActionAsync(doctorForm: NgForm) {
    try {
      await this._doctorService.insertAsync(doctorForm.value);
      doctorForm.resetForm();
      this._patientRenew = true;
      return true;
    } catch (error) {
      this._doctorService.errorNotification(error);
      return false;
    }
  }

  async updateActionAsync(patientForm: NgForm) {
    try {
      await this._doctorService.updateAsync(
        Object.assign(patientForm.value, {
          id: this.data.id,
        })
      );
      return true;
    } catch (error) {
      this._doctorService.errorNotification(error);
      return false;
    }
  }
}
