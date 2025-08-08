import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/basic/navbar/navbar.component";
import { MainhomeComponent } from "../../components/basic/mainhome/mainhome.component";
import { FooterComponent } from "../../components/basic/footer/footer.component";

@Component({
  selector: 'app-vimeo',
  standalone: true,
  imports: [NavbarComponent, MainhomeComponent, FooterComponent],
  templateUrl: './vimeo.component.html',
  styleUrl: './vimeo.component.css'
})
export class VimeoComponent {

}
