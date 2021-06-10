import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService, LanguageService } from '../../utils';
import { MatDialog, MatDialogTitle } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Doctor } from '../../models';
import {
  AddDoctorComponent,
  DialogWindowComponent
} from '../../components';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private _languageService: LanguageService,
    private _doctorService: DoctorService,
    private _activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _dialog: MatDialog
  ) { }

  doctors!: Array<Doctor>;
  searchText!: string;

  async ngOnInit() {
    try {
      this.doctors = <Array<Doctor>>await this._doctorService.listAsync();
    } catch {
      this._doctorService.errorNotification(Error);
    }
  }
  openAddDoctor(Id = null) {
    const diologRef = this._dialog.open(AddDoctorComponent, {
      width: '80vw',
      data:
        Id == null
          ? null
          : this.doctors.find((doctor) => doctor.id == Id),
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }
  async doctorDelete(id: any) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the doctor ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._doctorService.deleteAsync({ id });
          this.doctors.splice(
            this.doctors.findIndex((doctor) => doctor.id == id),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('Doctor information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));
          this._snackBar.open(notificationMessage!, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._doctorService.errorNotification(error);
        }
      }
    });
  }

}