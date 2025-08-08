import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/basic/navbar/navbar.component";
import { MainhomeComponent } from "../../components/basic/mainhome/mainhome.component";
import { FooterComponent } from "../../components/basic/footer/footer.component";

@Component({
  selector: 'app-reddit',
  standalone: true,
  imports: [NavbarComponent, MainhomeComponent, FooterComponent],
  templateUrl: './reddit.component.html',
  styleUrl: './reddit.component.css'
})
export class RedditComponent {

}
