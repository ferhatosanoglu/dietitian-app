import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService, UserService } from '../../../utils';
import { MatDialog, MatDialogTitle } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../models';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {

  constructor(
    private _languageService: LanguageService,
    private _userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _dialog: MatDialog
  ) { }

  users: any;
  searchText!: string;

  async ngOnInit() {

  }


}

