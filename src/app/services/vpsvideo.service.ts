import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.baseUrl;

  /**
   * Fetches video information for a given URL and quality.
   */
  getVideoInfo(url: string, quality: string, requestId: string): Observable<any> {
    const payload = { url, quality, request_id: requestId };
    console.debug('[VideoService] Sending POST request → /api/getvideo', payload);
    return this.http.post(`${this.baseUrl}/api/getvideo`, payload);
  }

  /**
   * Fetches audio information for a given URL.
   */
  getAudioInfo(url: string, requestId: string): Observable<any> {
    const payload = { url, request_id: requestId };
    console.debug('[VideoService] Sending POST request → /api/getaudio', payload);
    return this.http.post(`${this.baseUrl}/api/getaudio`, payload);
  }
}
