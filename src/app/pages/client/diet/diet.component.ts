import { Component, OnInit } from '@angular/core';
import { DietService } from '../../../utils';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Diet } from '../../../models';
import {
  AddDietComponent,
  DialogWindowComponent
} from '../../../components';

@Component({
  selector: 'app-diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.scss']
})
export class DietComponent implements OnInit {

  constructor(
    private _dietService: DietService,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _dialog: MatDialog
  ) { }

  diets!: Array<Diet>;
  searchText!: string;

  async ngOnInit() {
    try {
      this.diets = <Array<Diet>>await this._dietService.listAsync();
    } catch {
      this._dietService.errorNotification(Error);
    }
  }

  openAddDiet(Id = null) {
    const diologRef = this._dialog.open(AddDietComponent, {
      width: '80vw',
      data:
        Id == null
          ? null
          : this.diets.find((diet) => diet.id == Id),
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }

  async dietDelete(id: any) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the diet ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._dietService.deleteAsync({ id });
          this.diets.splice(
            this.diets.findIndex((diet) => diet.id == id),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('Diet information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));
          this._snackBar.open(notificationMessage!, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._dietService.errorNotification(error);
        }
      }
    });
  }
}
