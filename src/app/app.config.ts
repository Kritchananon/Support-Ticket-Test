// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  
  // Main pages with lazy loading
  { 
    path: 'new-ticket', 
    loadComponent: () => import('./pages/new-ticket/new-ticket.component')
      .then(m => m.NewTicketComponent) 
  },
  { 
    path: 'all-tickets', 
    loadComponent: () => import('./pages/all-tickets/all-tickets.component')
      .then(m => m.AllTicketsComponent) 
  },
  
  // Report routes - redirect to dashboard for now (until components are created)
  { path: 'reports/weekly', redirectTo: '/dashboard' },
  { path: 'reports/monthly', redirectTo: '/dashboard' },
  { path: 'reports/export', redirectTo: '/dashboard' },
  
  // Settings routes - redirect to dashboard for now (until components are created)
  { path: 'settings/general', redirectTo: '/dashboard' },
  { path: 'settings/users', redirectTo: '/dashboard' },
  { path: 'settings/project', redirectTo: '/dashboard' },
  { path: 'settings/categories', redirectTo: '/dashboard' },
  
  // Wildcard route
  { path: '**', redirectTo: '/dashboard' }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};