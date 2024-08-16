import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'bingo-card', loadChildren: () => import('./bingo-card/bingo-card.module').then(m => m.BingoCardModule) },
  { path: 'options-manager', loadChildren: () => import('./options-manager/options-manager.module').then(m => m.OptionsManagerModule) },
];
