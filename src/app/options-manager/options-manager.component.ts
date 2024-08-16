import {Component, OnInit, ViewChild} from '@angular/core';
import { BingoService } from '../services/bingo.service';
import {FormsModule} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MaterialModule} from "../material/material.module";

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
  displayedColumns: string[] = ['option', 'actions'];
  options: string[] = [];
  filteredOptions = new MatTableDataSource<string>([]);
  searchTerm: string = '';
  newOption: string = '';
  isSortedAscending: boolean = true;
  isLoading$!: Observable<boolean>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private bingoService: BingoService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.isLoading$ = this.bingoService.loading$;
    this.loadOptions();
  }

  loadOptions(): void {
    this.bingoService.getOptions().subscribe(options => {
      this.options = options;
      this.applyFilter();
      this.filteredOptions.paginator = this.paginator;
    });
  }

  addOption(): void {
    if (!this.newOption.trim()) {
      return;
    }
    this.bingoService.addOption(this.newOption.trim()).subscribe(() => {
      this.loadOptions(); // Refresh options after adding
      this.newOption = '';
    });
  }

  removeOption(option: string): void {
    this.bingoService.removeOption(option).subscribe(() => {
      this.loadOptions(); // Refresh options after removing
    });
  }

  applyFilter(): void {
    this.filteredOptions.data = this.options.filter(option =>
      option.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    // this.filteredOptions.filterPredicate = (data: string, filter: string) => {
    //   return data.toLowerCase().includes(filter.trim().toLowerCase());
    // };
    // this.filteredOptions.filter = this.searchTerm.trim().toLowerCase();
  }

  reverseSort(): void {
    this.isSortedAscending = !this.isSortedAscending;
    this.options = this.options.sort((a, b) => {
      return this.isSortedAscending ? a.localeCompare(b) : b.localeCompare(a);
    });
    this.applyFilter();
    // const sortedData = this.isSortedAscending
    //   ? this.filteredOptions.data.sort()
    //   : this.filteredOptions.data.sort().reverse();
    // this.filteredOptions.data = [...sortedData]; // Trigger change detection
  }

}
