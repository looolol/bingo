import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {MaterialModule} from "../material/material.module";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MaterialModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}
