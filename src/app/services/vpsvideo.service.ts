import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private http = inject(HttpClient);

  private baseUrl = 'https://prodl.site'; 
  
  // private baseUrl = 'http://localhost:8080'; 

  getVideoInfo(url: string, quality: string, requestId: string): Observable<any> {
    const payload = { url, quality, request_id: requestId };
    console.log('[API] Sending POST request to /api/getvideo with payload:', payload);
    return this.http.post(`${this.baseUrl}/api/getvideo`, payload);
  }
}
