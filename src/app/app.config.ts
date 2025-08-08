import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule, provideHttpClient } from '@angular/common/http'; // Import HttpClientModule and provideHttpClient
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideClientHydration(),
    provideToastr(),
    provideFirebaseApp(() => initializeApp({
      "projectId": "soocialclip",
      "appId": "1:488920090571:web:5fd936ef6b8079b433184e",
      "storageBucket": "soocialclip.appspot.com",
      "apiKey": "AIzaSyAKY5CiI5UVnEU0yV84cf8t-jLIANRluNU",
      "authDomain": "soocialclip.firebaseapp.com",
      "messagingSenderId": "488920090571",
      "measurementId": "G-4ZRMWXZLCE"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideHttpClient() // Use `provideHttpClient()` to register the HttpClientModule
  ]
};
