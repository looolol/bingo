import { NgModule } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";

const ngModules = [
  MatInputModule,
  MatButtonModule,
];

@NgModule({
  declarations: [],
  imports: [ngModules],
  exports: [ngModules],
})
export class MaterialModule { }
