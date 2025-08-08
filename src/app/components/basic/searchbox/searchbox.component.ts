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

@Component({
  selector: 'app-searchbox',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css'],
})
export class SearchboxComponent {
  inputvalue: string = '';
  isLoading: boolean = false;
  showDropdown: boolean = false;
  selectedQuality: string = '720p';

  qualityOptions: string[] = [
    '144p',
    '240p',
    '360p',
    '480p',
    '720p',
    '1080p',
    '1440p',
    '2k',
    '4K',
  ];

  private api = inject(VideoService);
  private notification = inject(NotificationService);
  private router = inject(Router);

  @ViewChild('dropdownRef', { static: false }) dropdownRef!: ElementRef;
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  toggleDropdown(event?: MouseEvent) {
    event?.stopPropagation();
    this.showDropdown = !this.showDropdown;
  }

  selectQuality(quality: string) {
    this.selectedQuality = quality;
    this.showDropdown = false;
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event) {
    if (
      this.showDropdown &&
      this.dropdownRef &&
      !this.dropdownRef.nativeElement.contains(event.target)
    ) {
      this.showDropdown = false;
    }
  }

  async handlePasteOrClear() {
    if (this.inputvalue) {
      this.inputvalue = '';
      return;
    }

    try {
      const permission = await navigator.permissions?.query({
        name: 'clipboard-read' as PermissionName,
      });

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
      this.searchInput.nativeElement.focus();
    } catch (err) {
      console.error('Paste failed:', err);
      this.notification.showWarning('Clipboard access denied or not supported in this browser.', 'Paste Error');
    }
  }

  downloadVideo() {
    const trimmedInput = this.inputvalue.trim();

    if (!trimmedInput || !this.selectedQuality) {
      this.notification.showWarning('Please enter a valid URL and select a quality.', 'Missing Input');
      return;
    }

    this.isLoading = true;
    const requestId = uuidv4();

    this.api.getVideoInfo(trimmedInput, this.selectedQuality, requestId).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('[Searchbox] API response received:', response);
        this.router.navigate(['/download'], {
          state: {
            videoData: response.video_info,
            WebsocketID: response.websocket_id,
            requestId,
          },
        });
      },
      error: (error) => {
        this.isLoading = false;
        console.error('[Searchbox] API error:', error);
        this.notification.showError(
          error?.error?.message || 'Failed to fetch video information. Please try again.',
          'Download Failed'
        );
      },
    });
  }
}
