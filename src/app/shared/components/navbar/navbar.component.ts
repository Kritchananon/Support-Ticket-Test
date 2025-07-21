// src/app/shared/components/navbar/navbar.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public languageService = inject(LanguageService);

  changeLanguage(lang: string) {
    this.languageService.setLanguage(lang);
  }

  getCurrentLanguageFlag(): string {
    const lang = this.languageService.getCurrentLanguage();
    return `/assets/images/${lang}-flag.png`;
  }

  getCurrentLanguageLabel(): string {
    const lang = this.languageService.getCurrentLanguage();
    return lang === 'th' ? 'ไทย' : 'EN';
  }
}