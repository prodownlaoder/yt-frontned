import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  inject
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { VideoService } from '../../../services/vpsvideo.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { FeaturesComponent } from "../../../pages/features/features.component";
import { HomecontentComponent } from "../homecontent/homecontent.component";
import { FaqsComponent } from "../faqs/faqs.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-audiobox',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FeaturesComponent, HomecontentComponent, FaqsComponent, FooterComponent],
  templateUrl: './audiobox.component.html',
  styleUrl: './audiobox.component.css'
})
export class AudioboxComponent {
 inputvalue: string = '';
  isLoading: boolean = false;

  private api = inject(VideoService);
  private notification = inject(NotificationService);
  private router = inject(Router);

  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef<HTMLInputElement>;



  // Called from template on paste button - kept same logic but improved error handling
  async handlePasteOrClear() {
    if (this.inputvalue) {
      this.inputvalue = '';
      // return focus to input after clearing so mobile doesn't jump
      this.focusInputSafe();
      return;
    }

    try {
      // Try clipboard permission (may be unsupported on some browsers)
      const permission = await (navigator as any).permissions?.query?.({
        name: 'clipboard-read' as PermissionName,
      }).catch(() => null);

      if (permission && permission.state === 'denied') {
        this.notification.showWarning('Please allow clipboard access to paste.', 'Clipboard Permission Denied');
        return;
      }

      const text = await navigator.clipboard.readText();
      if (!text) {
        this.notification.showWarning('Clipboard is empty or unsupported.', 'Paste Failed');
        return;
      }

      this.inputvalue = text;
      this.focusInputSafe();
    } catch (err) {
      console.error('Paste failed:', err);
      this.notification.showWarning('Clipboard access denied or not supported in this browser.', 'Paste Error');
    }
  }

  private focusInputSafe() {
    // Focus the input but wrapped in requestAnimationFrame to avoid layout jump on some mobiles
    requestAnimationFrame(() => {
      try {
        this.searchInput?.nativeElement?.focus();
        // also set selection to end
        const el = this.searchInput?.nativeElement;
        if (el && typeof el.setSelectionRange === 'function') {
          const len = el.value?.length || 0;
          el.setSelectionRange(len, len);
        }
      } catch (e) {
        // ignore focus errors on unsupported environments
      }
    });
  }

  downloadVideo() {
  const trimmedInput = this.inputvalue.trim();

  if (!trimmedInput) {
    this.notification.showWarning('Please enter a valid URL.', 'Missing Input');
    return;
  }

  this.isLoading = true;
  const requestId = uuidv4();

  this.api.getAudioInfo(trimmedInput, requestId).subscribe({
    next: (response) => {
      this.isLoading = false;
      console.log('[Audiobox] API response received:', response);

      // ✅ Make sure state keys match AudiodownloadpageComponent expectations
      this.router.navigate(['/mp3download'], {
        state: {
          audioData: response.audio_info,        
          WebsocketID: response.websocket_id,
          requestId: requestId  
        }
      });
    },
    error: (error) => {
      this.isLoading = false;
      console.error('[Audiobox] API error:', error);
      this.notification.showError(
        error?.error?.message || 'Failed to fetch audio information. Please try again.',
        'Download Failed'
      );
    }
  });
}


}
