import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BingoCardComponent } from './bingo-card/bingo-card.component';
import { OptionsManagerComponent } from './options-manager/options-manager.component';
import { MaterialModule } from './material/material.module';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MaterialModule,
    HomeComponent,
    BingoCardComponent,
    OptionsManagerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
  ]
})
export class AppComponent {
  title = 'bingo';
}
