import { Component, OnInit } from '@angular/core';
import { BingoService } from '../services/bingo.service';
import {MaterialModule} from "../material/material.module";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-options-manager',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
  ],
  providers: [
    BingoService
  ],
  templateUrl: './options-manager.component.html',
  styleUrls: ['./options-manager.component.scss']
})
export class OptionsManagerComponent implements OnInit {
  newOption: string = '';
  options: string[] = [];

  constructor(private bingoService: BingoService) {}

  ngOnInit(): void {
    this.loadOptions();
  }

  loadOptions(): void {
    this.bingoService.getOptions().subscribe(options => {
      this.options = options;
    });
  }

  addOption(): void {
    if (this.newOption.trim()) {
      this.bingoService.addOption(this.newOption.trim()).subscribe(() => {
        this.newOption = '';
        this.loadOptions(); // Refresh options after adding
      });
    }
  }

  removeOption(option: string): void {
    this.bingoService.removeOption(option).subscribe(() => {
      this.loadOptions(); // Refresh options after removing
    });
  }
}
