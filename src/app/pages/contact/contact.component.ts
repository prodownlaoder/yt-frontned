import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/basic/navbar/navbar.component";
import { FeaturesComponent } from "../features/features.component";
import { FooterComponent } from "../../components/basic/footer/footer.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmailService } from '../../services/email.service';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NavbarComponent,  FooterComponent, CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  message: string = '';
  showSuccessMessage = false;
  showFailureMessage = false;

  constructor(private emailService: EmailService) {}

  onSubmit() {
    if (this.name && this.email && this.message) {
      this.emailService.sendEmail(this.name, this.email, this.message).then(
        () => {
          this.showSuccessMessage = true;
          this.showFailureMessage = false;
          // Hide success message after 5 seconds
          setTimeout(() => this.showSuccessMessage = false, 5000);
          this.name = '';
          this.email = '';
          this.message = '';
        },
        () => {
          this.showFailureMessage = true;
          this.showSuccessMessage = false;
          // Hide failure message after 5 seconds
          setTimeout(() => this.showFailureMessage = false, 5000);
        }
      );
    } else {
      alert('Please fill in all fields.');
    }
  }
}
