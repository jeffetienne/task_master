import { Component, OnInit } from '@angular/core';
import { AjoutModule } from '../model/AjoutModule';
import { ApplicationService } from '../application.service';
import { Application } from '../model/Application';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Status } from '../model/Status';
import { StatusService } from '../status.service';
import { AjoutModuleService } from '../ajout-module.service';

@Component({
  selector: 'ajout-module',
  templateUrl: './ajout-module.component.html',
  styleUrls: ['./ajout-module.component.css']
})
export class AjoutModuleComponent implements OnInit {

  applications: Application[] = [];
  statuts: Status[] = [];
  ajoutModule: AjoutModule = new AjoutModule();
  title: string;

  form = new FormGroup({
    application: new FormControl('', Validators.required),
    sommaire: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)
  });

  constructor(private applicationService: ApplicationService,
              private statusService: StatusService,
              private ajoutModuleService: AjoutModuleService) { 
    this.applicationService.getApplications()
    .subscribe(response => {
      this.applications = response.json();
    });

    this.statusService.getStatus()
    .subscribe(response => {
      this.statuts = response.json();
    });

    this.title = "Demande d'ajout d'un module"
  }

  save(){
    alert('yes')
    this.ajoutModule.demandeur = 2218;
    this.ajoutModule.date_demande = new Date();
    this.ajoutModule.status = 'cre';
    this.ajoutModule.status_by = 2218;
    this.ajoutModule.status_date = new Date();
    this.ajoutModule.cree_le = new Date();
    this.ajoutModule.cree_par = 'concepteur';
    this.ajoutModule.supprime = 2;

    console.log(this.ajoutModule);
    this.ajoutModuleService.create(this.ajoutModule)
    .subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  ngOnInit(): void {
  }

}
