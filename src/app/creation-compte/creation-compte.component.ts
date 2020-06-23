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
      Validators.pattern("^[1-9]*$")
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    unite: new FormControl('', Validators.required),
    forme_par: new FormControl('', Validators.required),
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

  constructor(private route: ActivatedRoute,
    private router: Router,
    private roleService: RoleService,
    private uniteService: UniteService,
    private compteService: CompteService,
    private statusService: StatusService,
    private logModificationService: LogModificationService) {

    this.compte.status = 8;
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
    if (this.id) this.compteService
      .getCompte(this.id)
      .subscribe(response => {
        this.title = 'Modifier cette demande'
        this.textButton = "Modifier"
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
      this.compteService.update(+this.id, this.compte)
        .subscribe(response => {
          console.log(response);
        });

      if (this.compte.id_beneficiaire !== this.compteInDb.id_beneficiaire
        || this.compte.username !== this.compteInDb.username
        || this.compte.firstname !== this.compteInDb.firstname
        || this.compte.lastname !== this.compteInDb.lastname
        || this.compte.role !== this.compteInDb.role
        || this.compte.unite !== this.compteInDb.unite
        || this.compte.forme_par !== this.compteInDb.forme_par) {

        let log: LogModification = new LogModification();
        log.table_modifiee = 'creation_compte';
        log.modifie_par = this.compte.modifie_par;
        log.modifie_le = this.compte.modifie_le;

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
        /*
        this.logModificationService.create(log)
        .subscribe(response => {
          console.log(response);
        });//*/
      }
      /*
    let compteInDb: Compte;

    this.compteService.getCompte(this.id)
      .subscribe(response => {
        compteInDb = response.json();
        if (this.compte.beneficiaire !== this.compteInDb.beneficiaire
          || compte.username !== compteInDb.username
          || compte.firstname !== compteInDb.firstname
          || compte.lastname !== compteInDb.lastname
          || compte.role !== compteInDb.role
          || compte.unite !== compteInDb.unite
          || compte.forme_par !== compteInDb.forme_par) {

          let log: LogModification = new LogModification();
          log.table_modifiee = 'creation_compte';
          log.ancienne_valeur = compteInDb.beneficiaire.toString();
          log.nouvelle_valeur = compte.beneficiaire.toString();
          log.modifie_par = compte.modifie_par;
          log.modifie_le = compte.modifie_le;

          if (compte.beneficiaire !== compteInDb.beneficiaire) {
            log.champ_modifie = 'id_beneficiaire';
          }

          if (compte.username !== compteInDb.username) {
            log.champ_modifie = 'username';
          }

          if (compte.firstname !== compteInDb.firstname) {
            log.champ_modifie = 'firstname';
          }

          if (compte.lastname !== compteInDb.lastname) {
            log.champ_modifie = 'lastname';
          }

          if (compte.role !== compteInDb.role) {
            log.champ_modifie = 'role';
          }

          if (compte.unite !== compteInDb.unite) {
            log.champ_modifie = 'unite';
          }

          if (compte.forme_par !== compteInDb.forme_par) {
            log.champ_modifie = 'forme_par';
          }         
        }
      });//*/
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
          console.log(response);
        });
    }
    this.router.navigate(['/compte/list']);
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
