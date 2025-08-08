import { Component } from '@angular/core';
import { SearchboxComponent } from "../searchbox/searchbox.component";
import { RouterModule  , Router} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mainhome',
  standalone: true,
  imports: [RouterModule, CommonModule,  SearchboxComponent],
  templateUrl: './mainhome.component.html',
  styleUrl: './mainhome.component.css'
})
export class MainhomeComponent {

}
