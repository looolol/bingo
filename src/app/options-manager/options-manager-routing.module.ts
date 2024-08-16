import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OptionsManagerComponent} from "./options-manager.component";

export const routes: Routes = [
  { path: '', component: OptionsManagerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OptionsManagerRoutingModule { }
