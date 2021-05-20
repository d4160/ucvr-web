import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoRoutingModule } from './demo-routing.module';

import { MaterialModule } from '../shared/material.module';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { ButtonsComponent } from './buttons/buttons.component';
import { FlexboxComponent } from './flexbox/flexbox.component';

@NgModule({
  declarations: [ButtonsComponent, FlexboxComponent],
  imports: [
    CommonModule,
    DemoRoutingModule,
    MaterialModule,
    FlexModule,
    FormsModule
  ]
})
export class DemoModule { }
