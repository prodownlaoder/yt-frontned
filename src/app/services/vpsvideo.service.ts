import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private http = inject(HttpClient);

  private baseUrl = environment.baseUrl;

  getVideoInfo(url: string, quality: string, requestId: string): Observable<any> {
    const payload = { url, quality, request_id: requestId };
    console.log('[API] Sending POST request to /api/getvideo with payload:', payload);
    return this.http.post(`${this.baseUrl}/api/getvideo`, payload);
  }
}
