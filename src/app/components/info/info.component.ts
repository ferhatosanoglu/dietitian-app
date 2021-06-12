import { Component, OnInit, Inject } from '@angular/core';
import { Diet, Patient, Disease } from 'src/app/models';
import { DietService, DiseaseService, PatientService } from 'src/app/utils';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {


  constructor(
    private _patientService: PatientService,
    private _dietService: DietService,
    private _diseaseService: DiseaseService,
    private dialogRef: MatDialogRef<InfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  user: Patient = new Patient;
  diet: Diet = new Diet;
  disease: Disease = new Disease;
  async ngOnInit() {
    this.user = <Patient>await this._patientService.findAsync(this.data.id);
    this.diet = <Diet>await this._dietService.findAsync(this.data.DietId);
    this.disease = <Disease>await this._diseaseService.findAsync(this.data.DiseaseId);
  }
  downloadJson() {
    delete this.user.DietId;
    delete this.user.DiseaseId;
    delete this.user.id;
    delete this.diet.id;
    delete this.disease.id;
    var info = new Array();
    info.push(this.user);
    info.push(this.diet);
    info.push(this.disease);
    var sJson = JSON.stringify(info);
    var element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
    element.setAttribute('download', "userInfo.json");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click(); // simulate click
    document.body.removeChild(element);
  }

}
