import { Component, OnInit } from '@angular/core';
import { RoleService } from '../role.service';
import { CompteService } from '../compte.service';
import { UniteService } from '../unite.service';
import { StatusService } from '../status.service';
import { Compte } from '../model/Compte';
import { Role } from '../model/Role';
import { Unite } from '../model/Unite';

@Component({
  selector: 'compte-list',
  templateUrl: './compte-list.component.html',
  styleUrls: ['./compte-list.component.css']
})
export class CompteListComponent implements OnInit {

  title: string;
  comptes: Compte[] = [];
  comptesToDisplay: Compte[] = [];
  role: Role = new Role();
  unite: Unite = new Unite();

  constructor(private roleService: RoleService,
    private uniteService: UniteService,
    private compteService: CompteService,
    private statusService: StatusService) {

    this.compteService.getComptes()
      .subscribe(response => {
        this.comptes = response.json();

        this.comptes.forEach(compte => {
          this.roleService.getRole(compte.role)
            .subscribe(response => {
              compte.role_ref = response.json();
            });

          this.uniteService.getUnite(compte.unite)
            .subscribe(response => {
              compte.unite_ref = response.json();
            });

          this.statusService.getStatusById(compte.status)
            .subscribe(response => {
              compte.status_ref = response.json()
              this.comptesToDisplay.push(compte);
            });
        });
      });

    this.title = 'Liste des demandes de création de compte'
  }

  ngOnInit(): void {
  }

  delete(id: number) {

  }

}
