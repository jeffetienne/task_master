import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { RoleService } from '../role.service';
import { Role } from '../model/Role';
import { UniteService } from '../unite.service';
import { Unite } from '../model/Unite';
import { Compte } from '../model/Compte';
import { CompteService } from '../compte.service';
import { Status } from '../model/Status';
import { StatusService } from '../status.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LogModificationService } from '../log-modification.service';
import { LogModification } from '../model/LogModification';
import { UsernameValidators } from './username.validators';
import { mustBeUnique } from './asyncUsername.validators';
import { idMustBeUnique } from './asyncBeneficiaire.validators';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'creation-compte',
  templateUrl: './creation-compte.component.html',
  styleUrls: ['./creation-compte.component.css']
})
export class CreationCompteComponent implements OnInit {

  form = new FormGroup({
    id_beneficiaire: new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$")
    ], idMustBeUnique(this.compteService)),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern("^(?=.*[a-zA-Z])[a-zA-Z0-9]+$"),
      UsernameValidators.cannotContainSpace,
      UsernameValidators.cannotStartWithNumber
    ], mustBeUnique(this.compteService)),
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    role: new FormControl('', Validators.required),
    unite: new FormControl('', Validators.required),
    forme_par: new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$")
    ]),
    status: new FormControl('', Validators.required)
  });

  roles: Role[] = [];
  unites: Unite[] = [];
  statuts: Status[] = [];
  role: Role = new Role();
  unite: Unite = new Unite();
  statut: Status = new Status();
  compte: Compte = new Compte();
  compteInDb: Compte;
  compteToSave: Compte = new Compte();
  title: string;
  textButton: string;
  id: number;
  action: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService,
    private uniteService: UniteService,
    private compteService: CompteService,
    private statusService: StatusService,
    private logModificationService: LogModificationService) {

    this.compte.status = 'cre';
    roleService.getRoles().subscribe(response => {
      this.roles = response.json();
    });

    uniteService.getUnites().subscribe(response => {
      this.unites = response.json();
    });

    this.statusService.getStatus().subscribe(response => {
      this.statuts = response.json();
    });

    this.title = 'Nouvelle demande de création de compte';
    this.textButton = 'Sauvegarder'

    this.id = +this.route.snapshot.paramMap.get('id');
    this.action = this.route.snapshot.paramMap.get('action');
    if (this.id) this.compteService
      .getCompte(this.id)
      .subscribe(response => {
        this.title = 'Modifier cette demande'
        this.textButton = "Modifier"
        if(this.action){
          if(this.action === 'approuver')
          this.title = 'Approuver cette demande'
          this.textButton = "Approuver"
        }
        this.compte = response.json();
        this.compteInDb = response.json();
      });
  }

  ngOnInit(): void {
  }

  save() {
    if (this.id) {
      this.compte.Id = +this.id;
      this.compte.modifie_par = 'concepteur';
      this.compte.modifie_le = new Date();

      if (this.action) {
        if (this.action === 'approuver') {
          this.compte.status = 'apv';
          this.compte.status_by = 2218;
          this.compte.status_date = new Date();
          this.compte.status_reason = 'good';
        }
      }

      this.compteService.update(+this.id, this.compte)
        .subscribe(response => {
          if (this.action) {
            if (this.action === 'approuver') {
              this.router.navigate(['/task/create', this.id, 'compte']);
            }
          }
          //this.router.navigate(['/compte/list']);
        }, err => {
          console.log(err);
        });

      if (this.compte.id_beneficiaire !== this.compteInDb.id_beneficiaire
        || this.compte.username !== this.compteInDb.username
        || this.compte.firstname !== this.compteInDb.firstname
        || this.compte.lastname !== this.compteInDb.lastname
        || this.compte.role !== this.compteInDb.role
        || this.compte.unite !== this.compteInDb.unite
        || this.compte.forme_par !== this.compteInDb.forme_par
        || this.compte.status !== this.compteInDb.status) {

        let log: LogModification = new LogModification();
        log.table_modifiee = 'creation_compte';
        log.modifie_par = this.compte.modifie_par;
        log.modifie_le = this.compte.modifie_le;
        log.ligne_modifiee = this.compte.Id;

        if (this.compte.id_beneficiaire !== this.compteInDb.id_beneficiaire) {

          log.ancienne_valeur = this.compteInDb.id_beneficiaire.toString();
          log.nouvelle_valeur = this.compte.id_beneficiaire.toString();
          log.champ_modifie = 'id_beneficiaire';
          this.logModificationService.create(log)
            .subscribe(response => {
              console.log(response);
            });
        }

        if (this.compte.username !== this.compteInDb.username) {
          log.ancienne_valeur = this.compteInDb.username.toString();
          log.nouvelle_valeur = this.compte.username.toString();
          log.champ_modifie = 'username';
          this.logModificationService.create(log)
            .subscribe(response => {
              console.log(response);
            });
        }

        if (this.compte.firstname !== this.compteInDb.firstname) {
          log.ancienne_valeur = this.compteInDb.firstname.toString();
          log.nouvelle_valeur = this.compte.firstname.toString();
          log.champ_modifie = 'firstname';
          this.logModificationService.create(log)
            .subscribe(response => {
              console.log(response);
            });
        }

        if (this.compte.lastname !== this.compteInDb.lastname) {
          log.ancienne_valeur = this.compteInDb.lastname.toString();
          log.nouvelle_valeur = this.compte.lastname.toString();
          log.champ_modifie = 'lastname';
          this.logModificationService.create(log)
            .subscribe(response => {
              console.log(response);
            });
        }

        if (this.compte.role !== this.compteInDb.role) {
          log.ancienne_valeur = this.compteInDb.role.toString();
          log.nouvelle_valeur = this.compte.role.toString();
          log.champ_modifie = 'role';
          this.logModificationService.create(log)
            .subscribe(response => {
              console.log(response);
            });
        }

        if (this.compte.unite !== this.compteInDb.unite) {
          log.ancienne_valeur = this.compteInDb.unite.toString();
          log.nouvelle_valeur = this.compte.unite.toString();
          log.champ_modifie = 'unite';
          this.logModificationService.create(log)
            .subscribe(response => {
              console.log(response);
            });
        }

        if (this.compte.forme_par !== this.compteInDb.forme_par) {
          log.ancienne_valeur = this.compteInDb.forme_par.toString();
          log.nouvelle_valeur = this.compte.forme_par.toString();
          log.champ_modifie = 'forme_par';
          this.logModificationService.create(log)
            .subscribe(response => {
              console.log(response);
            });
        }

        if (this.compte.status !== this.compteInDb.status) {
          log.ancienne_valeur = this.compteInDb.status;
          log.nouvelle_valeur = this.compte.status;
          log.champ_modifie = 'status';
          this.logModificationService.create(log)
            .subscribe(response => {
              console.log(response);
            });
        }
      }
    }
    else {
      this.compte.demandeur = 2016;
      this.compte.date_demande = new Date();
      this.compte.status_by = 2016;
      this.compte.status_date = new Date();
      this.compte.cree_par = 'Concepteur';
      this.compte.cree_le = new Date();

      this.compteService.create(this.compte)
        .subscribe(response => {
          this.router.navigate(['/compte/list']);
        }, err => {
          console.log(err);
        });
        
    }
    
  }

  getUnite($event) {
    this.uniteService.getUnite($event.target.value)
      .subscribe(response => {
        this.unite = response.json();
      });
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
}
