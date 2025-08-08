import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/basic/navbar/navbar.component";
import { DownloadapkComponent } from "../../components/basic/downloadapk/downloadapk.component";
import { FooterComponent } from "../../components/basic/footer/footer.component";

@Component({
  selector: 'app-downloadapp',
  standalone: true,
  imports: [NavbarComponent, DownloadapkComponent, FooterComponent],
  templateUrl: './downloadapp.component.html',
  styleUrl: './downloadapp.component.css'
})
export class DownloadappComponent {

}
