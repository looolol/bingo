import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {BingoCardComponent} from "./bingo-card/bingo-card.component";
import {OptionsManagerComponent} from "./options-manager/options-manager.component";

export const routes: Routes = [
  { path: 'options-manager', component: OptionsManagerComponent },
  { path: 'bingo-card', component: BingoCardComponent },
  { path: '', component: HomeComponent },
];
