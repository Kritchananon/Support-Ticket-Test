// src/app/pages/new-ticket/new-ticket.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <div class="breadcrumb-container">
        <nav aria-label="breadcrumb" class="breadcrumb-nav">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <span>{{ languageService.translate('sidebar.newTicket') }}</span>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              <i class="bi bi-chevron-right"></i>
              <span>{{ languageService.translate('sidebar.newTicket') }}</span>
            </li>
          </ol>
        </nav>
      </div>
      
      <div class="content-card">
        <h2>{{ languageService.translate('sidebar.newTicket') }}</h2>
        <p>หน้านี้ยังอยู่ระหว่างการพัฒนา</p>
        <p>This page is under development</p>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      padding: 0;
    }
    
    .breadcrumb-container {
      margin-bottom: 20px;
    }
    
    .breadcrumb-nav {
      background: #ffffff;
      border: 1px solid #ececec;
      border-radius: 8px;
      padding: 11px 12px;
      height: 38px;
      display: flex;
      align-items: center;
    }
    
    .breadcrumb {
      margin: 0;
      padding: 0;
      background: transparent;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    .breadcrumb-item {
      font-family: 'Noto Sans Thai';
      font-size: 14px;
      font-weight: 500;
      line-height: 100%;
      color: #737373;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    .breadcrumb-item.active {
      color: #000000;
    }
    
    .content-card {
      background: #ffffff;
      border-radius: 12px;
      padding: 40px;
      text-align: center;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
    }
    
    .content-card h2 {
      font-family: 'Noto Sans Thai';
      font-weight: 600;
      font-size: 24px;
      color: #000000;
      margin-bottom: 20px;
    }
    
    .content-card p {
      font-family: 'Noto Sans Thai';
      font-size: 16px;
      color: #6c757d;
      margin-bottom: 10px;
    }
  `]
})
export class NewTicketComponent {
  public languageService = inject(LanguageService);
}