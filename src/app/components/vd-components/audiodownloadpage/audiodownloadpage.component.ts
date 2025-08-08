import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../basic/navbar/navbar.component';
import { FooterComponent } from '../../basic/footer/footer.component';
import { NotificationService } from '../../../services/notification.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-audiodownloadpage',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, CommonModule],
  templateUrl: './audiodownloadpage.component.html',
  styleUrl: './audiodownloadpage.component.css'
})
export class AudiodownloadpageComponent implements OnInit, OnDestroy {
  private notificationService = inject(NotificationService);

  audioData: any = null;
  requestId: string = '';
  websocketID: string = '';
  errorMessage: string | null = null;

  downloadButtonText: string = 'Preparing For Audio Download';
  downloadUrl: string | null = null;
  downloadFileName: string = 'audio.mp3';

  progressPercent: number = 0;
  showProgress: boolean = false;

  private ws: WebSocket | null = null;

  ngOnInit(): void {
    const { audioData, requestId, WebsocketID } = history.state;

    if (!audioData || !requestId || !WebsocketID) {
      this.errorMessage = 'No audio data available. Please go back and try again.';
      this.notificationService.showError(this.errorMessage);
      return;
    }

    this.audioData = audioData;
    this.requestId = requestId;
    this.websocketID = WebsocketID;

    this.connectWebSocket();
  }

  ngOnDestroy(): void {
    this.ws?.close();
  }

  handleDownload(): void {
    if (!this.downloadUrl) {
      this.notificationService.showError('Download URL is missing for the audio file.');
      return;
    }

    const anchor = document.createElement('a');
    anchor.href = this.downloadUrl;
    anchor.download = this.downloadFileName;
    anchor.target = '_blank';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  private connectWebSocket(): void {
    const wsUrl = `${environment.wsBaseUrl}/${this.websocketID}`;
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      this.showProgress = true;
      this.downloadButtonText = 'Preparing For Audio Download';
      console.log('[WebSocket] Connected');
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('[WebSocket] Message:', data);

        // Handle audio download error
        if (data.status === 'error') {
          const msg = data.message || 'An unknown error occurred during audio download.';
          this.downloadButtonText = 'Error';
          this.errorMessage = msg;
          this.notificationService.showError(msg);
          return;
        }

        // Handle audio download completed
        if (data.status === 'completed' || data.message?.toLowerCase().includes('complete')) {
          this.progressPercent = 100;
          this.downloadButtonText = 'Download Audio';
          this.showProgress = false;
          return;
        }

        // Handle final audio download URL
        if (data.event === 'download_result' && data.payload?.download_url) {
          this.downloadUrl = `${environment.baseUrl}${data.payload?.download_url}`;
          this.downloadFileName = data.payload.file_name || 'audio.mp3';
          this.downloadButtonText = 'Download Audio';
          this.showProgress = false;
          return;
        }

        // Handle progress updates
        if (typeof data.progress === 'number') {
          this.progressPercent = data.progress;
          this.downloadButtonText = `${data.message || 'Downloading Audio'} ${Math.floor(data.progress)}%`;
        }
      } catch (err) {
        console.error('[WebSocket] Parse error:', err);
        this.notificationService.showError('Invalid message received from server during audio download.');
      }
    };

    this.ws.onerror = (err) => {
      console.error('[WebSocket] Error:', err);
      this.downloadButtonText = 'Error';
      this.errorMessage = 'WebSocket connection failed during audio download.';
      this.notificationService.showError(this.errorMessage);
    };

    this.ws.onclose = () => {
      console.log('[WebSocket] Disconnected');
      if (this.progressPercent < 100) {
        this.downloadButtonText = 'Disconnected';
        this.notificationService.showWarning('WebSocket connection closed before audio download completion.');
      }
    };
  }
}
