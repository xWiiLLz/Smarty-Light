import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LightbulbControllerComponent }  from './lightbulb-controller.component';
const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'controller/:id', component: LightbulbControllerComponent },
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}