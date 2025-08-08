import { Injectable } from '@angular/core';

import emailjs from 'emailjs-com';
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() {}

  sendEmail(name: string, email: string, message: string): Promise<void> {
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
    };

    return emailjs.send('service_zu4v3gs', 'template_kqarc4r', templateParams, 'ninc_eNv2mzRN4dFP')
      .then(response => {
        console.log('Email sent successfully', response);
      })
      .catch(error => {
        console.error('Error sending email', error);
        throw error; 
      });
  }
}
