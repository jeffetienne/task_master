import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { idMustBeUnique } from '../creation-compte/asyncBeneficiaire.validators';
import { UsernameValidators } from '../creation-compte/username.validators';
import { mustBeUnique } from '../creation-compte/asyncUsername.validators';
import { ObjetService } from '../objet.service';
import { Objet } from '../model/objet_demande';
import { Router, ActivatedRoute } from '@angular/router';
import { PriorityService } from '../priority.service';
import { StatusService } from '../status.service';
import { Priority } from '../model/priority';
import { Status } from '../model/Status';
import { DeadlineValidators } from './deadline.validators';
import { TaskService } from '../task.service';
import { LogModification } from '../model/LogModification';
import { LogModificationService } from '../log-modification.service';

@Component({
  selector: 'task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  form = new FormGroup({
    objet: new FormControl('',
      Validators.required),
    demande: new FormControl('',
      Validators.required),
    assign_to: new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$")
    ]),
    deadline: new FormControl('', [
      Validators.required,
      DeadlineValidators.mustBePosteriorToToday
    ]),
    priority: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)
  });

  task: Task = new Task();
  taksInDb: Task = new Task();

  title: string;
  actionButton: string;
  demande: string;
  objet: string;
  objets: Objet[] = [];
  priorities: Priority[] = [];
  status: Status[] = [];
  id: number;
  action: string;
  isDisabled: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private objetService: ObjetService,
    private priorityService: PriorityService,
    private statusService: StatusService,
    private taskService: TaskService,
    private logModificationService: LogModificationService) {
    this.title = "Creation d'une tache"
    this.isDisabled = true;
    this.demande = this.route.snapshot.paramMap.get('demande');
    this.task.demande = +this.demande;

    this.objet = this.route.snapshot.paramMap.get('objet');
    this.task.objet = this.objet;

    this.objetService.getObjets()
      .subscribe(response => {
        this.objets = response.json();
      });

    this.priorityService.getPriorities()
      .subscribe(response => {
        this.priorities = response.json();
        console.log(this.priorities);
      });

    this.statusService.getStatus()
      .subscribe(response => {
        this.status = response.json();
      });

    this.task.status = 'cre';

    this.id = +this.route.snapshot.paramMap.get('id');
    this.action = this.route.snapshot.paramMap.get('action');

    if (this.id) {
      this.taskService.getTask(this.id.toString())
        .subscribe(tache => {
          console.log(tache.json());
          this.task = tache.json();
          this.taksInDb = tache.json();

          this.title = 'Modifier cette tache';
          this.actionButton = 'Modifier';
        });
    }
  }

  ngOnInit(): void {
  }

  save() {
    if (this.id) {
      this.task.Id = this.id;
      this.task.modifie_le = new Date();
      this.task.modifie_par = 'concepteur';

      this.taskService.update(this.id, this.task)
        .subscribe(response => {
          if (this.task.assign_to !== this.taksInDb.assign_to
            || this.task.deadline !== this.taksInDb.deadline
            || this.task.priority !== this.taksInDb.priority) {
            let log: LogModification = new LogModification();
            log.table_modifiee = 'tache';
            log.modifie_par = this.task.modifie_par;
            log.modifie_le = this.task.modifie_le;
            log.ligne_modifiee = this.task.Id;

            if (this.task.assign_to !== this.taksInDb.assign_to) {
              log.champ_modifie = 'assign_to';
              log.ancienne_valeur = this.taksInDb.assign_to.toString();
              log.nouvelle_valeur = this.task.assign_to.toString();

              this.logModificationService.create(log)
                .subscribe(response => {
                  console.log(response);
                }, error => {
                  console.log(error);
                });
            }

            if (this.task.deadline !== this.taksInDb.deadline) {
              log.champ_modifie = 'deadline';
              log.ancienne_valeur = this.taksInDb.deadline.toString();
              log.nouvelle_valeur = this.task.deadline.toString();

              this.logModificationService.create(log)
                .subscribe(response => {
                  console.log(response);
                }, error => {
                  console.log(error);
                });
            }

            if (this.task.priority !== this.taksInDb.priority) {
              log.champ_modifie = 'priority';
              log.ancienne_valeur = this.taksInDb.priority.toString();
              log.nouvelle_valeur = this.task.priority.toString();

              this.logModificationService.create(log)
                .subscribe(response => {
                  console.log(response);
                }, error => {
                  console.log(error);
                });
            }
          }
          this.router.navigate(['/task/list']);
        }, error => {
          console.log(error);
        })
    } else {
      this.task.status_by = 2016;
      this.task.status_date = new Date();
      this.task.assign_date = new Date();
      this.task.cree_par = 'Concepteur';
      this.task.cree_le = new Date();
      this.taskService.create(this.task)
        .subscribe(response => {
          console.log(response.json());
          this.router.navigate(['/task/list']);
        }, err => {
          console.log(err);
        });
    }
  }

}
