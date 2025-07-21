// src/app/pages/dashboard/dashboard.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../core/services/language.service';

interface DashboardStats {
  totalTickets: number;
  newTickets: number;
  inProgress: number;
  completed: number;
}

interface ChartData {
  label: string;
  value: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public languageService = inject(LanguageService);
  
  selectedMonth = '2';  // February
  selectedYear = '2025';
  
  dashboardStats: DashboardStats = {
    totalTickets: 240,
    newTickets: 20,
    inProgress: 20,
    completed: 210
  };

  monthlyData: ChartData[] = [];
  categoryData: ChartData[] = [];

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    // Simulate loading dashboard data
    this.monthlyData = [
      { label: 'Jan', value: 80 },
      { label: 'Feb', value: 65 },
      { label: 'Mar', value: 70 },
      { label: 'Apr', value: 55 },
      { label: 'May', value: 75 },
      { label: 'Jun', value: 60 },
      { label: 'Jul', value: 70 },
      { label: 'Aug', value: 65 },
      { label: 'Sep', value: 80 },
      { label: 'Oct', value: 85 },
      { label: 'Nov', value: 75 },
      { label: 'Dec', value: 70 }
    ];

    this.categoryData = [
      { label: 'บันทึกข้อมูลไม่ได้', value: 40 },
      { label: 'ระบบล้ม/ใช้งานไม่ได้', value: 25 },
      { label: 'ปัญหาเจอบัค', value: 20 },
      { label: 'อื่นๆ', value: 15 }
    ];
  }

  updateChart() {
    // Update chart data based on selected month/year
    console.log('Updating chart for:', this.selectedMonth, this.selectedYear);
    // Implement chart update logic here
  }

  getMonthTranslation(month: number): string {
    const months = {
      1: 'มกราคม', 2: 'กุมภาพันธ์', 3: 'มีนาคม', 4: 'เมษายน',
      5: 'พฤษภาคม', 6: 'มิถุนายน', 7: 'กรกฎาคม', 8: 'สิงหาคม',
      9: 'กันยายน', 10: 'ตุลาคม', 11: 'พฤศจิกายน', 12: 'ธันวาคม'
    };
    
    if (this.languageService.getCurrentLanguage() === 'en') {
      const englishMonths = {
        1: 'January', 2: 'February', 3: 'March', 4: 'April',
        5: 'May', 6: 'June', 7: 'July', 8: 'August',
        9: 'September', 10: 'October', 11: 'November', 12: 'December'
      };
      return englishMonths[month as keyof typeof englishMonths] || '';
    }
    
    return months[month as keyof typeof months] || '';
  }
}