import { Component, OnInit, Output } from '@angular/core';
import { DietService, DiseaseService, PatientService } from '../../../utils';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Diet, Disease, Patient } from '../../../models';
import {
  AddPatientComponent,
  DialogWindowComponent
} from '../../../components';
import { InfoComponent } from 'src/app/components/info/info.component';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {

  constructor(
    private _patientService: PatientService,
    private _diseaseService: DiseaseService,
    private _dietService: DietService,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _dialog: MatDialog
  ) { }

  patients!: Array<Patient>;
  diseases!: Array<Disease>;
  diets!: Array<Diet>;
  searchText!: string;

  async ngOnInit() {
    try {
      this.patients = <Array<Patient>>await this._patientService.listAsync();
      this.diets = <Array<Diet>>await this._dietService.listAsync();
      this.diseases = <Array<Disease>>await this._diseaseService.listAsync();
    } catch {
      this._patientService.errorNotification(Error);
    }
  }
  findDisease(Id: number) {
    const temp = this.diseases.find(name => name.id == Id)
    return temp?.DiseaseName
  }
  findDiet(Id: number) {
    const temp = this.diets.find(name => name.id == Id)
    return temp?.DietName
  }
  openAddPatient(Id = null) {
    const diologRef = this._dialog.open(AddPatientComponent, {
      width: '80vw',
      data:
        Id == null
          ? null
          : this.patients.find((patient) => patient.id == Id),
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }

  openInfo(Id = null) {
    const diologRef = this._dialog.open(InfoComponent, {
      width: '80vw',
      data:
        Id == null
          ? null
          : this.patients.find((patient) => patient.id == Id),
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }
  async patientDelete(id: any) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the patient ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._patientService.deleteAsync({ id });
          this.patients.splice(
            this.patients.findIndex((patient) => patient.id == id),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('Patient information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));
          this._snackBar.open(notificationMessage!, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._patientService.errorNotification(error);
        }
      }
    });
  }

}

