import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  inject
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../basic/navbar/navbar.component';
import { FooterComponent } from '../../basic/footer/footer.component';
import { NotificationService } from '../../../services/notification.service';
import { environment } from '../../../../environments/environment';
import { DownloadpagecontentComponent } from "../../basic/downloadpagecontent/downloadpagecontent.component";

@Component({
  selector: 'app-downloadpage',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, DownloadpagecontentComponent],
  templateUrl: './downloadpage.component.html',
  styleUrls: ['./downloadpage.component.css'],
})
export class DownloadpageComponent implements OnInit, OnDestroy {
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  videoData: any = null;
  requestId: string = '';
  websocketID: string = '';
  errorMessage: string | null = null;

  downloadButtonText: string = 'Preparing For Download';
  downloadUrl: string | null = null;
  downloadFileName: string = 'video.mp4';

  progressPercent: number = 0;
  showProgress: boolean = false;

  private ws: WebSocket | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // First try to get state from the current navigation
      const nav = this.router.getCurrentNavigation();
      const state = nav?.extras?.state || history.state || {};

      this.videoData = state.videoData;
      this.requestId = state.requestId;
      this.websocketID = state.WebsocketID;

      if (!this.videoData || !this.requestId || !this.websocketID) {
        this.errorMessage = 'No video data available. Please go back and try again.';
        this.notificationService.showError(this.errorMessage);
        return;
      }

      this.connectWebSocket();
    } else {
      // On server side, avoid browser APIs
      this.videoData = null;
      this.requestId = '';
      this.websocketID = '';
      this.errorMessage = 'Video data is only available in browser runtime.';
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.ws?.close();
    }
  }

  handleDownload(): void {
    if (!this.downloadUrl) {
      this.notificationService.showError('Download URL is missing.');
      return;
    }

    if (isPlatformBrowser(this.platformId)) {
      const anchor = document.createElement('a');
      anchor.href = this.downloadUrl;
      anchor.download = this.downloadFileName;
      anchor.target = '_blank';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }
  }

  private connectWebSocket(): void {
    const wsUrl = `${environment.wsBaseUrl}/${this.websocketID}`;
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      this.showProgress = true;
      this.downloadButtonText = 'Preparing For Download';
      console.log('[WebSocket] Connected');
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('[WebSocket] Message:', data);

        if (data.status === 'error') {
          const msg = data.message || 'An unknown error occurred during download.';
          this.downloadButtonText = 'Error';
          this.errorMessage = msg;
          this.notificationService.showError(msg);
          return;
        }

        if (data.status === 'completed' || data.message?.toLowerCase().includes('complete')) {
          this.progressPercent = 100;
          this.downloadButtonText = 'Download Video';
          this.showProgress = false;
          return;
        }

        if (data.event === 'download_result' && data.payload?.download_url) {
          this.downloadUrl = `${environment.baseUrl}${data.payload?.download_url}`;
          this.downloadFileName = data.payload.file_name || 'video.mp4';
          this.downloadButtonText = 'Save To Device';
          this.showProgress = false;
          return;
        }

        if (typeof data.progress === 'number') {
          this.progressPercent = data.progress;
          this.downloadButtonText = `${data.message || 'Downloading'} ${Math.floor(data.progress)}%`;
        }
      } catch (err) {
        console.error('[WebSocket] Parse error:', err);
        this.notificationService.showError('Invalid message received from server.');
      }
    };

    this.ws.onerror = (err) => {
      console.error('[WebSocket] Error:', err);
      this.downloadButtonText = 'Error';
      this.errorMessage = 'WebSocket connection failed.';
      this.notificationService.showError(this.errorMessage);
    };

    this.ws.onclose = () => {
      console.log('[WebSocket] Disconnected');
      if (this.progressPercent < 100) {
        this.downloadButtonText = 'Disconnected';
        this.notificationService.showWarning('WebSocket connection closed before completion.');
      }
    };
  }
}
