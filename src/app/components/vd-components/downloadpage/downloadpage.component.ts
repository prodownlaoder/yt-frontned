import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../basic/navbar/navbar.component';
import { FooterComponent } from '../../basic/footer/footer.component';

@Component({
  selector: 'app-downloadpage',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent],
  templateUrl: './downloadpage.component.html',
  styleUrls: ['./downloadpage.component.css'],
})
export class DownloadpageComponent implements OnInit, OnDestroy {
  videoData: any = null;
  requestId: string = '';
  websocketID : string = '';
  errorMessage: string | null = null;
  downloadButtonText: string = 'Download';

  ws: WebSocket | null = null;
  progressPercent: number = 0;
  progressMessage: string = '';
  showProgress: boolean = false;

  ngOnInit(): void {
    const { videoData, requestId , WebsocketID } = history.state;

    if (!videoData || !requestId) {
      this.errorMessage = 'No video data available. Please go back and try again.';
      return;
    }

    this.videoData = videoData;
    this.requestId = requestId;
    this.websocketID = WebsocketID;
    this.connectWebSocket();
  }

  ngOnDestroy(): void {
    this.ws?.close();
  }

  HandelDownload(): void {
    console.log('[DownloadPage] Manual download button pressed.');
    // Trigger download if needed (not required if download starts on connect)
  }

  connectWebSocket(): void {
    const wsUrl = `wss://prodl.site/ws/${this.websocketID}`;

    // const wsUrl = `ws://localhost:8080/ws/${this.websocketID}`;

    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      this.showProgress = true;
      this.downloadButtonText = 'Starting...';
      console.log('[WebSocket] Connected');
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('[WebSocket] Message:', data);

      if (data.progress !== undefined) {
        this.progressPercent = data.progress;
        this.downloadButtonText = `Downloading ${data.progress}%`;
      }

      if (data.message) {
        this.progressMessage = data.message;
      }

      if (data.progress >= 100 || data.message?.toLowerCase().includes('done')) {
        this.downloadButtonText = 'Completed';
        setTimeout(() => {
          this.showProgress = false;
        }, 3000);
      }
    };

    this.ws.onerror = (err) => {
      console.error('[WebSocket] Error:', err);
      this.downloadButtonText = 'Error';
      this.errorMessage = 'WebSocket connection failed.';
    };

    this.ws.onclose = () => {
      console.log('[WebSocket] Disconnected');
      if (this.progressPercent < 100) {
        this.downloadButtonText = 'Disconnected';
      }
    };
  }
}
