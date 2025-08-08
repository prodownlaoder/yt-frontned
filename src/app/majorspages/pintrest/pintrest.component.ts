import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/basic/navbar/navbar.component";
import { MainhomeComponent } from "../../components/basic/mainhome/mainhome.component";
import { FooterComponent } from "../../components/basic/footer/footer.component";

@Component({
  selector: 'app-pintrest',
  standalone: true,
  imports: [NavbarComponent, MainhomeComponent, FooterComponent],
  templateUrl: './pintrest.component.html',
  styleUrl: './pintrest.component.css'
})
export class PintrestComponent {

}
