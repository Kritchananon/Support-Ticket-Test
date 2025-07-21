// src/app/core/services/language.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Translation {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('th');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();
  
  private translations: { [lang: string]: Translation } = {};
  private isLoaded = false;
  
  constructor() {
    this.loadTranslations();
  }

  private async loadTranslations() {
    try {
      // Load Thai translations
      const thResponse = await fetch('/assets/i18n/th.json');
      this.translations['th'] = await thResponse.json();
      
      // Load English translations
      const enResponse = await fetch('/assets/i18n/en.json');
      this.translations['en'] = await enResponse.json();
      
      this.isLoaded = true;
    } catch (error) {
      console.error('Error loading translations:', error);
      // Set default translations if loading fails
      this.translations = {
        'th': { 
          'sidebar': {
            'logo': 'Support Ticket',
            'dashboard': 'แดชบอร์ด',
            'newTicket': 'สร้างตั๋วใหม่',
            'allTickets': 'ตั๋วทั้งหมด',
            'report': 'รายงาน',
            'settings': 'ตั้งค่า'
          },
          'navbar': {
            'thai': 'ไทย',
            'english': 'อังกฤษ',
            'profile': 'โปรไฟล์ของฉัน',
            'settings': 'ตั้งค่า',
            'logout': 'ออกจากระบบ'
          },
          'dashboard': {
            'title': 'แดชบอร์ด',
            'totalTickets': 'ตั๋วทั้งหมด',
            'newTickets': 'ตั๋วใหม่',
            'inProgress': 'กำลังดำเนินการ',
            'completed': 'เสร็จสิ้น',
            'dailyChart': 'รายงานรายวัน',
            'categoryChart': 'แบ่งตามหมวดหมู่'
          }
        },
        'en': { 
          'sidebar': {
            'logo': 'Support Ticket',
            'dashboard': 'Dashboard',
            'newTicket': 'New Ticket',
            'allTickets': 'All Tickets',
            'report': 'Report',
            'settings': 'Settings'
          },
          'navbar': {
            'thai': 'Thai',
            'english': 'English',
            'profile': 'My Profile',
            'settings': 'Settings',
            'logout': 'Logout'
          },
          'dashboard': {
            'title': 'Dashboard',
            'totalTickets': 'Total Tickets',
            'newTickets': 'New Tickets',
            'inProgress': 'In Progress',
            'completed': 'Completed',
            'dailyChart': 'Daily Report',
            'categoryChart': 'Category Breakdown'
          }
        }
      };
      this.isLoaded = true;
    }
  }

  public setLanguage(lang: string): void {
    this.currentLanguageSubject.next(lang);
  }

  public getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  public translate(key: string): string {
    if (!this.isLoaded) {
      return key; // Return key if translations not loaded yet
    }
    
    const lang = this.getCurrentLanguage();
    const keys = key.split('.');
    let value: any = this.translations[lang];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    // Ensure we return a string
    if (typeof value === 'string') {
      return value;
    }
    
    return key; // Return key as fallback
  }
}