import { Component } from '@angular/core';
import { MainhomeComponent } from "../../components/basic/mainhome/mainhome.component";
import { NavbarComponent } from "../../components/basic/navbar/navbar.component";
import { FooterComponent } from '../../components/basic/footer/footer.component';

@Component({
  selector: 'app-dailymotion',
  standalone: true,
  imports: [MainhomeComponent, NavbarComponent , FooterComponent],
  templateUrl: './dailymotion.component.html',
  styleUrl: './dailymotion.component.css'
})
export class DailymotionComponent {

}
