import { NgModule } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import { MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDialogModule} from "@angular/material/dialog";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatGridListModule} from "@angular/material/grid-list";

const ngModules = [
  CommonModule,
  MatToolbarModule,
  MatListModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatCardModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatPaginatorModule,
  MatGridListModule,
];

@NgModule({
  declarations: [],
  imports: [...ngModules],
  exports: [...ngModules],
})
export class MaterialModule { }
