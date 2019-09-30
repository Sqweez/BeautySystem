import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BrMaskerModule } from 'brmasker-ionic-3';
import {NgxMaskIonicModule} from 'ngx-mask-ionic'

import { IonicModule } from '@ionic/angular';

import { RegisterPage } from './register.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    NgxMaskIonicModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    BrMaskerModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
