import { Component, OnInit } from '@angular/core';
import { BingoService } from '../services/bingo.service';
import {MaterialModule} from "../material/material.module";
import {Card, Cell} from "../models/card.model";
import {Observable} from "rxjs";

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
  card!: Card;
  isLoading$: Observable<boolean>;

  constructor(private bingoService: BingoService) {
    this.isLoading$ = this.bingoService.loading$;
  }

  ngOnInit(): void {
    this.loadCard();
  }

  loadCard(): void {
    this.bingoService.getBingoCard().subscribe(card => {
      this.card = card;
    });
  }

  generateNewCard():void {
    this.bingoService.generateBingoCard().subscribe(card => {
      this.card = card;
    });
  }

  toggleCell(cell: Cell): void {
    if (cell.clickable) {
      cell.marked = !cell.marked;
      this.bingoService.saveBingoCard(this.card);
    }
  }
}

