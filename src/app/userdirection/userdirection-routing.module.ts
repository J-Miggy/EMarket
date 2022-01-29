import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserdirectionPage } from './userdirection.page';

const routes: Routes = [
  {
    path: '',
    component: UserdirectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserdirectionPageRoutingModule {}
