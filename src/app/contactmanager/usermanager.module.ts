import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsermanagerRoutingModule } from './usermanager-routing.module';

import { MaterialModule } from '../shared/material.module';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsermanagerAppComponent } from './usermanager-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './components/users/users.component';
import { ChangeRoleDialogComponent } from './components/change-role-dialog/change-role-dialog.component';

import { PlayfabService } from '../shared/playfab.service';

@NgModule({
  declarations: [
    UsermanagerAppComponent,
    ToolbarComponent,
    MainContentComponent,
    SidenavComponent,
    UsersComponent,
    ChangeRoleDialogComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    UsermanagerRoutingModule,
    MaterialModule,
    FlexModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PlayfabService
  ]
})
export class UsermanagerModule { }
