import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/basic/navbar/navbar.component";
import { MainhomeComponent } from "../../components/basic/mainhome/mainhome.component";
import { FooterComponent } from '../../components/basic/footer/footer.component';

@Component({
  selector: 'app-rumble',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,MainhomeComponent],
  templateUrl: './rumble.component.html',
  styleUrl: './rumble.component.css'
})
export class RumbleComponent {

}
