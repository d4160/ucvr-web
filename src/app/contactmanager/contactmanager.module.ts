import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactmanagerRoutingModule } from './contactmanager-routing.module';

import { MaterialModule } from '../shared/material.module';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContactmanagerAppComponent } from './contactmanager-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { NotesComponent } from './components/notes/notes.component';
import { NewContactDialogComponent } from './components/new-contact-dialog/new-contact-dialog.component';

import { PlayfabService } from '../shared/playfab.service';

@NgModule({
  declarations: [
    ContactmanagerAppComponent,
    ToolbarComponent,
    MainContentComponent,
    SidenavComponent,
    NotesComponent,
    NewContactDialogComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ContactmanagerRoutingModule,
    MaterialModule,
    FlexModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService,
    PlayfabService
  ]
})
export class ContactmanagerModule { }
