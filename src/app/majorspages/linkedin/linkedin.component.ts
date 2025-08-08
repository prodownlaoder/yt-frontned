import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/basic/navbar/navbar.component";
import { MainhomeComponent } from "../../components/basic/mainhome/mainhome.component";
import { FooterComponent } from '../../components/basic/footer/footer.component';

@Component({
  selector: 'app-linkedin',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, MainhomeComponent],
  templateUrl: './linkedin.component.html',
  styleUrl: './linkedin.component.css'
})
export class LinkedinComponent {

}
