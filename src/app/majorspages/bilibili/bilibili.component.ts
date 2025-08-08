import { Component } from '@angular/core';
import { MainhomeComponent } from "../../components/basic/mainhome/mainhome.component";
import { NavbarComponent } from "../../components/basic/navbar/navbar.component";
import { FooterComponent } from "../../components/basic/footer/footer.component";

@Component({
  selector: 'app-bilibili',
  standalone: true,
  imports: [MainhomeComponent, NavbarComponent, FooterComponent],
  templateUrl: './bilibili.component.html',
  styleUrl: './bilibili.component.css'
})
export class BilibiliComponent {

}
