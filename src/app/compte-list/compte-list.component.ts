import { Component, OnInit } from '@angular/core';
import { RoleService } from '../role.service';
import { CompteService } from '../compte.service';
import { UniteService } from '../unite.service';
import { StatusService } from '../status.service';
import { Compte } from '../model/Compte';
import { Role } from '../model/Role';
import { Unite } from '../model/Unite';
import { LogModificationService } from '../log-modification.service';
import { LogModification } from '../model/LogModification';

@Component({
  selector: 'compte-list',
  templateUrl: './compte-list.component.html',
  styleUrls: ['./compte-list.component.css']
})
export class CompteListComponent implements OnInit {

  title: string;
  comptes: Compte[] = [];
  comptesToDisplay: Compte[] = [];
  compte: Compte = new Compte();
  role: Role = new Role();
  unite: Unite = new Unite();

  constructor(private roleService: RoleService,
    private uniteService: UniteService,
    private compteService: CompteService,
    private statusService: StatusService,
    private logModificationService: LogModificationService) {

    this.compteService.getComptes()
      .subscribe(response => {
        this.comptes = response.json();
      });

    this.title = 'Liste des demandes de création de compte'
  }

  ngOnInit(): void {
  }

  delete(id: number) {
    if (id) {
      this.compteService.getCompte(id)
        .subscribe(response => {
          this.compte = response.json();
          if (this.compte) {
            if (this.compte.status === 'cre'
              || this.compte.status === 'ann'
              || this.compte.status === 'rej') {

              if (!confirm('Voulez-vous vraiment supprimer cette demande?')) return;

              this.compte.supprime = 1;
              this.compte.supprime_le = new Date();
              this.compte.supprime_par = 'concepteur';
              this.compte.supprime_raison = prompt('Prière de saisir la raison!!!');
              this.compteService.update(id, this.compte)
                .subscribe(response => {
                  this.insert_log('supprime', this.compte.supprime.toString(), '1');
                }, error => {
                  console.log(error);
                });
            } else {
              if (this.compte.status === 'apv') {
                alert('Vous ne pouvez pas supprimer cette demande. Car elle a été approuvée par ' + this.compte.status_by + ' le ' + this.compte.status_date);
              }
            }

          }
        })

    }
  }

  annuler(id: number) {
    if (id) {
      this.compteService.getCompte(id)
        .subscribe(response => {
          this.compte = response.json();
          if (this.compte) {
            if (this.compte.status === 'cre') {
              if (!confirm('Voulez-vous vraiment annuler cette demande?')) return;

              let status_log = this.compte.status;
              let date_log = this.compte.status_date;
              let reason_log = this.compte.status_reason;

              this.compte.status = 'ann';
              this.compte.status_date = new Date();
              this.compte.status_by = 2218;
              this.compte.status_reason = prompt('Prière de saisir la raison!!!');
              this.compteService.update(id, this.compte)
                .subscribe(response => {
                  this.insert_log('status', status_log, this.compte.status);
                  this.insert_log('status_by', this.compte.status_by, '2218');
                  this.insert_log('status_date', date_log, this.compte.status_date);
                  this.insert_log('status_reason', reason_log, this.compte.status_reason);
                });
            } else {
              alert('Vous ne pouvez pas annuler cette demande. Car elle a été '
                + this.compte.Status.name + 'e par ' + this.compte.status_by
                + ' le ' + this.compte.status_date);
            }
          }
        })

    }
  }

  rejeter(id: number) {
    if (id) {
      this.compteService.getCompte(id)
        .subscribe(response => {
          this.compte = response.json();
          if (this.compte) {
            if (this.compte.status === 'cre') {
              if (!confirm('Voulez-vous vraiment rejeter cette demande?')) return;

              let status_log = this.compte.status;
              let date_log = this.compte.status_date;
              let reason_log = this.compte.status_reason;

              this.compte.status = 'rej';
              this.compte.status_date = new Date();
              this.compte.status_by = 2218;
              this.compte.status_reason = prompt('Prière de saisir la raison!!!');
              this.compteService.update(id, this.compte)
                .subscribe(response => {
                  this.insert_log('status', status_log, this.compte.status);
                  this.insert_log('status_by', this.compte.status_by, '2218');
                  this.insert_log('status_date', date_log, this.compte.status_date);
                  this.insert_log('status_reason', reason_log, this.compte.status_reason);
                });
            } else {
              alert('Vous ne pouvez pas rejeter cette demande. Car elle a été '
                + this.compte.Status.name + 'e par ' + this.compte.status_by
                + ' le ' + this.compte.status_date);
            }
          }
        })

    }
  }

  insert_log(champ, ancienne, nouvelle) {
    let log: LogModification = new LogModification();
    log.table_modifiee = 'creation_compte';
    log.modifie_par = this.compte.modifie_par;
    log.modifie_le = this.compte.modifie_le;
    log.ligne_modifiee = this.compte.Id;
    log.ancienne_valeur = ancienne;
    log.nouvelle_valeur = nouvelle;
    log.champ_modifie = champ;
    this.logModificationService.create(log)
      .subscribe(response => {
        console.log(response);
      });
  }

}
