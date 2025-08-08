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
  websocketID: string = '';
  errorMessage: string | null = null;
  downloadButtonText: string = 'Preparing For Download';

  ws: WebSocket | null = null;
  progressPercent: number = 0;
  showProgress: boolean = false;

  ngOnInit(): void {
    const { videoData, requestId, WebsocketID } = history.state;

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
    // const wsUrl = `wss://prodl.site/ws/${this.websocketID}`;
    const wsUrl = `ws://localhost:8080/ws/${this.websocketID}`;

    this.ws = new WebSocket(wsUrl);

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('[WebSocket] Message:', data);

      if (data.message && data.progress !== undefined) {
        // Show message + progress together
        this.downloadButtonText = `${data.message}  ${data.progress.toFixed(1)}%`;
        this.progressPercent = data.progress;
      }

      // Optional: hide progress after 100%
      if (data.progress >= 100 || data.message?.toLowerCase().includes('done')) {
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



