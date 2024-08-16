import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'bingo-card', loadComponent: () => import('./bingo-card/bingo-card.component').then(m => m.BingoCardComponent) },
  { path: 'options-manager', loadComponent: () => import('./options-manager/options-manager.component').then(m => m.OptionsManagerComponent) },
];
