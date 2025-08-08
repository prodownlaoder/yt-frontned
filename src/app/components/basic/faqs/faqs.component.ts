import { CommonModule } from '@angular/common';
import { Component ,HostListener } from '@angular/core';

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.css'
})
export class FaqsComponent {
  openIndex: number | null = null;

  toggle(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }

  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.faq-container')) {
      this.openIndex = null;
    }
  }

  faqs = [
    {
      question: 'How to download YouTube videos?',
      answer: 'Paste the YouTube URL in our downloader, choose quality, and hit download. It’s that simple on SocialClip.'
    },
    {
      question: 'Is it legal to use a YouTube video downloader?',
      answer: 'Downloading videos for personal use may be allowed in some regions. Always follow YouTube’s terms and local laws.'
    },
    {
      question: 'Can I use the YouTube video downloader on mobile devices?',
      answer: 'Yes, SocialClip works smoothly on both Android and iOS devices with any modern browser.'
    },
    {
      question: 'Do I need to install any software to use the YouTube downloader?',
      answer: 'No installation needed! SocialClip is 100% web-based and runs in your browser without software or plugins.'
    },
    {
      question: 'Is your YouTube video downloader free to use?',
      answer: 'Yes, SocialClip is completely free with no hidden fees, no download limits, and no account needed.'
    },
    {
      question: 'Is the YouTube Video Downloader safe?',
      answer: 'Yes, SocialClip doesn’t store any personal data. Your privacy is our top priority.'
    },
    {
      question: 'What formats can I download from YouTube?',
      answer: 'Currently, we support MP4 format. More formats like MP3, WebM, etc. are coming soon!'
    },
    {
      question: 'Are there any limits on the number of videos I can download?',
      answer: 'No limits! You can download as many videos as you want using SocialClip.'
    },
    {
      question: 'How long does it take to download a YouTube video?',
      answer: 'Download time depends on video length, internet speed, and server load. We optimize everything for speed.'
    },
    {
      question: 'Can I convert YouTube videos to text or subtitles?',
      answer: 'Not directly, but tools like Clipto Transcription can help with converting video to text or subtitles.'
    }
  ];
}

