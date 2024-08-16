import { NgModule } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";

const ngModules = [
  CommonModule,
  MatToolbarModule,
  MatListModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatCardModule,
];

@NgModule({
  declarations: [],
  imports: [...ngModules],
  exports: [...ngModules],
})
export class MaterialModule { }
