import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/basic/navbar/navbar.component";
import { MainhomeComponent } from "../../components/basic/mainhome/mainhome.component";
import { FooterComponent } from "../../components/basic/footer/footer.component";
import { LoaderComponent } from "../../components/basic/loader/loader.component";
import { Meta, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HomecontentComponent } from "../../components/basic/homecontent/homecontent.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, MainhomeComponent, FooterComponent, HttpClientModule, HomecontentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private titleService: Title, private metaService: Meta ,  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Free Online Video Downloader for Social Media 2024');
    this.metaService.updateTag({ name: 'description', content: 'Download videos from social media platforms with SocialClip. Your free video downloader for 2024.' });
  }

 
}
