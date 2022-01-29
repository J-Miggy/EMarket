import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserdirectionPageRoutingModule } from './userdirection-routing.module';

import { UserdirectionPage } from './userdirection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserdirectionPageRoutingModule
  ],
  declarations: [UserdirectionPage]
})
export class UserdirectionPageModule {}
