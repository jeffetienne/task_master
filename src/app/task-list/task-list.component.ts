import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../model/task';
import { LogModification } from '../model/LogModification';
import { LogModificationService } from '../log-modification.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  title: string;
  tasks: Task[] = [];
  tasksToDisplay: Task[] = [];
  task: Task = new Task();

  constructor(private taskService: TaskService,
    private logModificationService: LogModificationService) {
    this.title = 'Liste des taches'

    this.taskService.getTasks()
      .subscribe(response => {
        this.tasks = response.json();
      });
  }

  ngOnInit(): void {
  }

  completer(id: number) {
    if (id) {
      this.taskService.getTask(id.toString())
        .subscribe(response => {
          this.task = response.json();
          if (this.task) {
            if (this.task.status !== 'com' && this.task.status !== 'ann') {
              if (!confirm('Avez-vous vraiment complété cette tache?')) return;

              let status_log = this.task.status;
              let date_log = this.task.status_date;
              let reason_log = this.task.status_reason;

              this.task.status = 'com';
              this.task.status_date = new Date();
              this.task.status_by = 2218;
              this.task.status_reason = prompt('Prière de saisir la raison!!!');
              this.taskService.update(id, this.task)
                .subscribe(response => {
                  this.insert_log('status', status_log, this.task.status);
                  this.insert_log('status_by', this.task.status_by, '2218');
                  this.insert_log('status_date', date_log, this.task.status_date);
                  this.insert_log('status_reason', reason_log, this.task.status_reason);
                });
            } else {
              if (this.task.status === 'ann')
                alert('Vous ne pouvez pas compléter cette tache. Car elle a été annulée par ' + this.task.status_by + ' le ' + this.task.status_date);
              if (this.task.status === 'com')
                alert('Cette tache a été complétée par ' + this.task.status_by + ' le ' + this.task.status_date);
            }
          }
        })

    }
  }

  annuler(id: number) {
    if (id) {
      this.taskService.getTask(id.toString())
        .subscribe(response => {
          this.task = response.json();
          if (this.task) {
            if (this.task.status !== 'com' && this.task.status !== 'ann') {
              if (!confirm('Voulez-vous vraiment annuler cette tache?')) return;

              let status_log = this.task.status;
              let date_log = this.task.status_date;
              let reason_log = this.task.status_reason;

              this.task.status = 'ann';
              this.task.status_date = new Date();
              this.task.status_by = 2218;
              this.task.status_reason = prompt('Prière de saisir la raison!!!');
              this.taskService.update(id, this.task)
                .subscribe(response => {
                  this.insert_log('status', status_log, this.task.status);
                  this.insert_log('status_by', this.task.status_by, '2218');
                  this.insert_log('status_date', date_log, this.task.status_date);
                  this.insert_log('status_reason', reason_log, this.task.status_reason);
                });
            } else {
              if (this.task.status === 'com')
                alert('Vous ne pouvez pas annuler cette tache. Car elle a été complétée par ' + this.task.status_by + ' le ' + this.task.status_date);
              if (this.task.status === 'ann')
                alert('Cette tache a été annulée par ' + this.task.status_by + ' le ' + this.task.status_date);
            }
          }
        })

    }
  }

  insert_log(champ, ancienne, nouvelle) {
    let log: LogModification = new LogModification();
    log.table_modifiee = 'tache';
    log.modifie_par = this.task.modifie_par;
    log.modifie_le = this.task.modifie_le;
    log.ligne_modifiee = this.task.Id;
    log.ancienne_valeur = ancienne;
    log.nouvelle_valeur = nouvelle;
    log.champ_modifie = champ;
    this.logModificationService.create(log)
      .subscribe(response => {
        console.log(response);
      });
  }

}
