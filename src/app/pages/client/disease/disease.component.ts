import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService, DiseaseService } from '../../../utils';
import { MatDialog, MatDialogTitle } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Disease } from '../../../models';
import {
  AddDiseaseComponent,
  DialogWindowComponent
} from '../../../components';

@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrls: ['./disease.component.scss']
})
export class DiseaseComponent implements OnInit {

  constructor(
    private _languageService: LanguageService,
    private _diseaseService: DiseaseService,
    private _activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _dialog: MatDialog
  ) { }

  diseases!: Array<Disease>;
  searchText!: string;

  async ngOnInit() {
    try {
      this.diseases = <Array<Disease>>await this._diseaseService.listAsync();
    } catch {
      this._diseaseService.errorNotification(Error);
    }
  }
  openAddDisease(Id = null) {
    const diologRef = this._dialog.open(AddDiseaseComponent, {
      width: '40vw',
      data:
        Id == null
          ? null
          : this.diseases.find((disease) => disease.id == Id),
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }

  async diseaseDelete(id: any) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the disease ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._diseaseService.deleteAsync({ id });
          this.diseases.splice(
            this.diseases.findIndex((disease) => disease.id == id),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('Disease information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));
          this._snackBar.open(notificationMessage!, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._diseaseService.errorNotification(error);
        }
      }
    });
  }
}
