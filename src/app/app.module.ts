import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { CreationCompteComponent } from './creation-compte/creation-compte.component';
import { CompteListComponent } from './compte-list/compte-list.component';
import { UsernameValidators } from './creation-compte/username.validators';
import { MustBeUnique } from './creation-compte/asyncUsername.validators';
import { IdMustBeUnique } from './creation-compte/asyncBeneficiaire.validators';
import { TaskComponent } from './task/task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AjoutModuleComponent } from './ajout-module/ajout-module.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreationCompteComponent,
    MustBeUnique,
    IdMustBeUnique,
    CompteListComponent,
    TaskComponent,
    TaskListComponent,
    AjoutModuleComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    NgbModule,
    RouterModule.forRoot([
      {
        path: '',
        component: CompteListComponent
      },
      {
        path: 'compte/create',
        component: CreationCompteComponent
      },
      {
        path: 'compte/list',
        component: CompteListComponent
      },
      {
        path: 'compte/edit/:id',
        component: CreationCompteComponent
      },
      {
        path: 'compte/edit/:id/:action',
        component: CreationCompteComponent
      },
      {
        path: 'task/create/:demande/:objet',
        component: TaskComponent
      },
      {
        path: 'task/edit/:id',
        component: TaskComponent
      },
      {
        path: 'task/edit/:id/:action',
        component: TaskComponent
      },
      {
        path: 'task/list',
        component: TaskListComponent
      },
      {
        path: 'module/create',
        component: AjoutModuleComponent
      }
    ])
  ],
  providers: [UsernameValidators, MustBeUnique, IdMustBeUnique],
  bootstrap: [AppComponent]
})
export class AppModule { }
