import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(private toastr: ToastrService) {}

  showError(message: string, title: string = 'Error') {
    this.toastr.error(message, title, {
      positionClass: 'toast-top-right',  // Position at the top-left corner
      timeOut: 5000,                   // Display for 5 seconds
      closeButton: true,               // Optional: Adds a close button
      progressBar: true,               // Optional: Show progress bar
      toastClass: 'custom-toast-error' // Custom class for error toasts
    });
  }

  showWarning(message: string, title: string = 'Warning') {
    this.toastr.warning(message, title, {
      positionClass: 'toast-top-right',
      timeOut: 5000,
      closeButton: true,
      progressBar: true,
      toastClass: 'custom-toast-warning'
    });
  }

  showSuccess(message: string, title: string = 'Success') {
    this.toastr.success(message, title, {
      positionClass: 'toast-top-right',
      timeOut: 5000,
      closeButton: true,
      progressBar: true,
      toastClass: 'custom-toast-success'
    });
  }

  showInfo(message: string, title: string = 'Info') {
    this.toastr.info(message, title, {
      positionClass: 'toast-top-right',
      timeOut: 5000,
      closeButton: true,
      progressBar: true,
      toastClass: 'custom-toast-info'
    });
  }
}
