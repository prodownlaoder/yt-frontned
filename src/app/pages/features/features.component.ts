import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/basic/navbar/navbar.component";
import { FooterComponent } from "../../components/basic/footer/footer.component";

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
export class FeaturesComponent {

}
