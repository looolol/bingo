import { Component, OnInit } from '@angular/core';
import { BingoService } from '../services/bingo.service';
import {MaterialModule} from "../material/material.module";
import {Card} from "../models/card.model";

@Component({
  selector: 'app-bingo-card',
  standalone: true,
  imports: [
    MaterialModule,
  ],
  templateUrl: './bingo-card.component.html',
  styleUrls: ['./bingo-card.component.scss']
})
export class BingoCardComponent implements OnInit {
  card: Card | null = null;

  constructor(private bingoService: BingoService) { }

  ngOnInit(): void {
    this.bingoService.getBingoCard().subscribe(card => {
      this.card = card;
      this.bingoService.saveBingoCard(card); // Save the generated card to local storage
    });
  }
}

