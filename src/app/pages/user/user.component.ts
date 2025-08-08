// user.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NavbarComponent } from "../../components/basic/navbar/navbar.component";
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isSignup: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isLoading: boolean = false;
  passwordMismatch: boolean = false;
  error: string | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private platform: Platform
  ) {}

  ngOnInit() {
    if (this.platform.isBrowser) {
      this.checkAuthStatus();
    }
  }

  private async checkAuthStatus() {
    try {
      await this.userService.authStateReady();
      const currentUser = this.userService.getCurrentUser();
      if (currentUser) {
        await this.router.navigate(['/profile']);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  toggleSignup() {
    this.isSignup = !this.isSignup;
    this.resetForm();
  }

  private resetForm() {
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.passwordMismatch = false;
    this.error = null;
  }

  private validatePasswords(): boolean {
    if (!this.isSignup) return true;
    this.passwordMismatch = this.password !== this.confirmPassword;
    return !this.passwordMismatch;
  }

  async loginWithEmail() {
    if (this.isLoading) return;
    this.error = null;
    
    try {
      this.isLoading = true;
      await this.userService.signInWithEmail(this.email, this.password);
      await this.router.navigate(['/profile']);
    } catch (error: any) {
      console.error('Login error:', error);
      this.error = error.message || 'Login failed. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  async signupWithEmail() {
    if (this.isLoading || !this.validatePasswords()) return;
    this.error = null;

    try {
      this.isLoading = true;
      await this.userService.signupWithEmail(this.email, this.password);
      await this.router.navigate(['/profile']);
    } catch (error: any) {
      console.error('Signup error:', error);
      this.error = error.message || 'Signup failed. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }
  
  async signInWithGoogle() {
    if (this.isLoading) return;
    this.error = null;

    try {
      this.isLoading = true;
      await this.userService.signInWithGoogle();
      await this.router.navigate(['/profile']);
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      this.error = error.message || 'Google sign-in failed. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }
}