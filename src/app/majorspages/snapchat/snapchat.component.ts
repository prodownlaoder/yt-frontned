import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/basic/navbar/navbar.component";
import { MainhomeComponent } from "../../components/basic/mainhome/mainhome.component";
import { FooterComponent } from "../../components/basic/footer/footer.component";

@Component({
  selector: 'app-snapchat',
  standalone: true,
  imports: [NavbarComponent, MainhomeComponent, FooterComponent],
  templateUrl: './snapchat.component.html',
  styleUrl: './snapchat.component.css'
})
export class SnapchatComponent {

}
