import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { Diet, Patient, Disease } from 'src/app/models';
import { DietService, DiseaseService, PatientService } from 'src/app/utils';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as JsonToXML from "js2xmlparser";
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
    private changeDetector: ChangeDetectorRef,
    private _diseaseService: DiseaseService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  user: Patient = new Patient;
  diet: Diet = new Diet;
  disease: Disease = new Disease;
  state: boolean = true;

  async ngOnInit() {
    this.user = <Patient>await this._patientService.findAsync(this.data.id);
    this.diet = <Diet>await this._dietService.findAsync(this.data.DietId);
    this.disease = <Disease>await this._diseaseService.findAsync(this.data.DiseaseId);
  }

  change() {
    delete this.user.DietId;
    delete this.user.DiseaseId;
    delete this.user.id;
    delete this.diet.id;
    delete this.disease.id;
    var info = new Array();
    if (this.state)
      info.push(this.user, this.disease, this.diet);
    else
      info.push(this.diet, this.user, this.disease);
    return info;
  }

  downloadJson() {
    var info = this.change()
    var sJson = JSON.stringify(info);
    var element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
    element.setAttribute('download', "userInfo.json");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click(); // simulate click
    document.body.removeChild(element);
  }

  downloadXml() {
    var info = this.change();
    var xml = JsonToXML.parse("person", info);
    var element = document.createElement('a');
    element.setAttribute('href', "data:text/xml;charset=UTF-8," + encodeURIComponent(xml));
    element.setAttribute('download', "userInfo.html");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click(); // simulate click
    document.body.removeChild(element);
  }

  async convert() {
    this.state = !this.state;
    this.changeDetector.detectChanges();
  }
}
