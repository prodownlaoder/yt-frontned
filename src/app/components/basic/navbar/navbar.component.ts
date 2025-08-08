import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone:true,
  imports:[CommonModule , FormsModule , RouterModule]
})
export class NavbarComponent {
  isMenuOpen = false;
  isVideoDownloaderOpen = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    // Optional: Add body overflow control
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : 'auto';
  }

  toggleVideoDownloader() {
    this.isVideoDownloaderOpen = !this.isVideoDownloaderOpen;
  }

  redirectToUserId() {
    // Implement your redirection logic here
    this.router.navigate(['/user']);
  }

  // Optional: Close menu when route changes
  ngOnInit() {
    this.router.events.subscribe(() => {
      this.isMenuOpen = false;
      this.isVideoDownloaderOpen = false;
    });
  }
}