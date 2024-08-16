import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BingoCardComponent } from './bingo-card/bingo-card.component';
import { OptionsManagerComponent } from './options-manager/options-manager.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {BingoService} from "./services/bingo.service";
import {OptionsManagerRoutingModule} from "./options-manager/options-manager-routing.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTableModule,
    HomeComponent,
    BingoCardComponent,
    OptionsManagerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    BingoService,
  ]
})
export class AppComponent {
  title = 'bingo';
}
