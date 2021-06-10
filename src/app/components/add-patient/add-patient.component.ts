import { Component, OnInit, Inject } from '@angular/core';
import { Patient, Disease, Diet } from '../../models';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientService, DiseaseService, DietService } from '../../utils';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss'],
})
export class AddPatientComponent implements OnInit {
  constructor(
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar,
    private _patientService: PatientService,
    private _diseaseService: DiseaseService,
    private _dietService: DietService,
    public _router: Router,
    private dialogRef: MatDialogRef<AddPatientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  _model: Patient = new Patient();
  diseases!: Array<Disease>;
  diets!: Array<Diet>;
  _patientRenew: boolean = false;
  _action!: Function;
  async ngOnInit() {
    if (this.data?.id != null) {
      try {
        this._model = this.data;
      } catch (error) {
        this._patientService.errorNotification(error);
      }
      this._action = this.updateActionAsync;
    } else {
      this._patientRenew = false;
      this._action = this.insertActionAsync;
    }
    try {
      this.diseases = <Array<Disease>>await this._diseaseService.listAsync();
    } catch {
      this._diseaseService.errorNotification(Error);
    }
    try {
      this.diets = <Array<Diet>>await this._dietService.listAsync();
    } catch {
      this._dietService.errorNotification(Error);
    }
  }

  async onSave(patientForm: NgForm) {
    let notification: any = {
      message: '',
      panelClass: '',
    };
    if (patientForm.valid) {
      this._translateService
        .get('Patient registration completed')
        .subscribe((value) => (notification.message = value));
      notification.panelClass = 'notification__success';
      if (!(await this._action(patientForm))) return;
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

  async insertActionAsync(patientForm: NgForm) {
    try {
      await this._patientService.insertAsync(patientForm.value);
      patientForm.resetForm();
      this._patientRenew = true;
      return true;
    } catch (error) {
      this._patientService.errorNotification(error);
      return false;
    }
  }

  async updateActionAsync(patientForm: NgForm) {
    try {
      await this._patientService.updateAsync(
        Object.assign(patientForm.value, {
          id: this.data.id,
        })
      );
      return true;
    } catch (error) {
      this._patientService.errorNotification(error);
      return false;
    }
  }
}