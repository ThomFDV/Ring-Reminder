import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DateViewComponent} from './core/components/date-view/date-view.component';

const routes: Routes = [
  {
    path: '',
    component: DateViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
