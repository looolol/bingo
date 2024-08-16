import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BingoCardComponent} from "./bingo-card.component";

const routes: Routes = [
  { path: '', component: BingoCardComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BingoCardRoutingModule { }
