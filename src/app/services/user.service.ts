// user.service.ts
import { Injectable } from '@angular/core';
import { 
  Auth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<UserProfile | null>(null);
  user$ = this.userSubject.asObservable();
  private authStateReady$ = new BehaviorSubject<boolean>(false);

  constructor(private auth: Auth) {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        const userProfile: UserProfile = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email?.split('@')[0] || 'User'
        };
        this.userSubject.next(userProfile);
      } else {
        this.userSubject.next(null);
      }
      this.authStateReady$.next(true);
    });
  }

  async authStateReady(): Promise<void> {
    return new Promise((resolve) => {
      let subscription: any;
      subscription = this.authStateReady$.subscribe(ready => {
        if (ready) {
          subscription.unsubscribe(); 
          resolve();
        }
      });
    });
  }
  
  async signInWithEmail(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  async signupWithEmail(email: string, password: string): Promise<void> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (error: any) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  async signInWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(this.auth, provider);
    } catch (error: any) {
      console.error('Google sign in error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  getCurrentUser(): UserProfile | null {
    return this.userSubject.getValue();
  }
}