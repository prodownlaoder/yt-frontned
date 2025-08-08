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
  selectedQuality: string = '';

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
  private router = inject(Router);

  @ViewChild('dropdownRef', { static: false }) dropdownRef!: ElementRef;

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

  downloadVideo() {
    if (!this.inputvalue.trim() || !this.selectedQuality) {
      alert('Please enter a URL and select a quality');
      return;
    }

    this.isLoading = true;
    const requestId = uuidv4();
    const url = this.inputvalue.trim();

    this.api.getVideoInfo(url, this.selectedQuality, requestId).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('[Home] API response received:', response);
        this.router.navigate(['/download'], {
          state: {
            videoData: response.video_info,
            WebsocketID : response.websocket_id,
            requestId,
          },
        });
      },
      error: (error) => {
        this.isLoading = false;
        console.error('[Home] API error:', error);
        alert('Failed to fetch video information. Please try again.');
      },
    });
  }
}
