import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly defaultTimeout = 5000;
  private readonly position = 'toast-top-right';

  constructor(private toastr: ToastrService) {}

  private getToastConfig(toastClass: string): Partial<IndividualConfig> {
    return {
      timeOut: this.defaultTimeout,
      positionClass: this.position,
      closeButton: true,
      progressBar: true,
      toastClass,
    };
  }

  showSuccess(message: string, title: string = 'Success') {
    this.toastr.success(message, title, this.getToastConfig('custom-toast-success'));
  }

  showError(message: string, title: string = 'Error') {
    this.toastr.error(message, title, this.getToastConfig('custom-toast-error'));
  }

  showWarning(message: string, title: string = 'Warning') {
    this.toastr.warning(message, title, this.getToastConfig('custom-toast-warning'));
  }

  showInfo(message: string, title: string = 'Info') {
    this.toastr.info(message, title, this.getToastConfig('custom-toast-info'));
  }
}
