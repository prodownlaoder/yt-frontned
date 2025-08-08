import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from "../../components/basic/navbar/navbar.component";
import { UserProfile, UserService } from '../../services/user.service';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: UserProfile | null = null;
  isLoading = true;
  private readonly RELOAD_KEY = 'profile_page_loaded';

  constructor(
    private userService: UserService,
    private router: Router,
    private platform: Platform
  ) {}

  ngOnInit() {
    if (this.platform.isBrowser) {
      this.handleInitialization();
    }
  }

  private async handleInitialization() {
    const hasReloaded = localStorage.getItem(this.RELOAD_KEY);
    
    if (!hasReloaded) {
      // Set the flag before reloading to prevent loop
      localStorage.setItem(this.RELOAD_KEY, 'true');
      window.location.reload();
      return;
    }

    // Clear the reload flag after successful initialization
    localStorage.removeItem(this.RELOAD_KEY);
    await this.initializeUser();
  }

  private async initializeUser() {
    try {
      await this.userService.authStateReady();
      this.user = this.userService.getCurrentUser();
      
      if (!this.user) {
        await this.router.navigate(['/user']);
      }
    } catch (error) {
      console.error('Error initializing user:', error);
      await this.router.navigate(['/user']);
    } finally {
      this.isLoading = false;
    }
  }

  async logout() {
    try {
      await this.userService.logout();
      await this.router.navigate(['/user']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}