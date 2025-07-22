// src/app/pages/dashboard/dashboard.component.ts
import { Component, OnInit, inject, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../core/services/language.service';
import { Chart, ChartConfiguration, registerables, ChartOptions } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

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
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  public languageService = inject(LanguageService);
  
  @ViewChild('monthlyChart', { static: false }) monthlyChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('categoryChart', { static: false }) categoryChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChart', { static: false }) pieChartRef!: ElementRef<HTMLCanvasElement>;
  
  selectedMonth = '2';  // February
  selectedYear = '2025';
  selectedCategoryYear = '2025';
  
  private monthlyChart?: Chart;
  private categoryChart?: Chart;
  private pieChart?: Chart;
  
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
    
    // Subscribe to language changes and update charts
    this.languageService.currentLanguage$.subscribe(lang => {
      // Wait for translation to load then update charts
      setTimeout(() => {
        this.updateChartsLanguage();
      }, 100);
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initCharts();
    }, 100);
  }

  loadDashboardData() {
    // Monthly data for area chart
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

    // Category data for pie chart - use translation keys
    this.categoryData = [
      { label: 'dashboard.categories.dataEntry', value: 40 },
      { label: 'dashboard.categories.systemDown', value: 25 },
      { label: 'dashboard.categories.bugIssue', value: 20 },
      { label: 'dashboard.categories.others', value: 15 }
    ];
  }

  initCharts() {
    this.createMonthlyChart();
    this.createCategoryChart();
    this.createPieChart();
  }

  createMonthlyChart() {
    if (!this.monthlyChartRef?.nativeElement) return;

    const ctx = this.monthlyChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    // Generate sample data for 31 days
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const newTicketData = days.map(() => Math.floor(Math.random() * 50) + 20);
    const completedData = days.map(() => Math.floor(Math.random() * 40) + 30);

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: days,
        datasets: [
          {
            label: 'New Ticket',
            data: newTicketData,
            borderColor: '#FFC107',
            backgroundColor: 'rgba(255, 193, 7, 0.5)',
            fill: true,
            tension: 0.4
          },
          {
            label: 'Complete',
            data: completedData,
            borderColor: '#28A745',
            backgroundColor: 'rgba(40, 167, 69, 0.5)',
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
        },
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            display: true,
            grid: {
              display: false
            },
            ticks: {
              color: '#737373',
              font: {
                family: 'Noto Sans Thai',
                size: 14
              }
            }
          },
          y: {
            display: true,
            grid: {
              color: '#ECECEC',
              display: true
            },
            ticks: {
              color: '#737373',
              font: {
                family: 'Noto Sans Thai',
                size: 14
              },
              stepSize: 20
            },
            min: 0,
            max: 100
          }
        }
      }
    };

    this.monthlyChart = new Chart(ctx, config);
  }

  createCategoryChart() {
    if (!this.categoryChartRef?.nativeElement) return;

    const ctx = this.categoryChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    // Get month labels based on current language
    const monthLabels = this.getMonthLabels();
    
    // Generate sample data for each category
    const generateMonthlyData = () => monthLabels.map(() => Math.floor(Math.random() * 40) + 10);

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: monthLabels,
        datasets: [
          {
            label: this.languageService.translate('dashboard.categories.dataEntry'),
            data: generateMonthlyData(),
            borderColor: '#1FBCD5',
            backgroundColor: 'rgba(31, 188, 213, 0.1)',
            tension: 0.4
          },
          {
            label: this.languageService.translate('dashboard.categories.systemDown'),
            data: generateMonthlyData(),
            borderColor: '#DC3545',
            backgroundColor: 'rgba(220, 53, 69, 0.1)',
            tension: 0.4
          },
          {
            label: this.languageService.translate('dashboard.categories.bugIssue'),
            data: generateMonthlyData(),
            borderColor: '#5873F8',
            backgroundColor: 'rgba(88, 115, 248, 0.1)',
            tension: 0.4
          },
          {
            label: this.languageService.translate('dashboard.categories.others'),
            data: generateMonthlyData(),
            borderColor: '#6C757D',
            backgroundColor: 'rgba(108, 117, 125, 0.1)',
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
        },
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            display: true,
            grid: {
              display: false
            },
            ticks: {
              color: '#737373',
              font: {
                family: 'Noto Sans Thai',
                size: 14
              }
            }
          },
          y: {
            display: true,
            grid: {
              color: '#ECECEC',
              display: true
            },
            ticks: {
              color: '#737373',
              font: {
                family: 'Noto Sans Thai',
                size: 14
              },
              stepSize: 20
            },
            min: 0,
            max: 100
          }
        }
      }
    };

    this.categoryChart = new Chart(ctx, config);
  }

  createPieChart() {
    if (!this.pieChartRef?.nativeElement) return;

    const ctx = this.pieChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    // Set canvas size explicitly to maintain aspect ratio
    this.pieChartRef.nativeElement.width = 220;
    this.pieChartRef.nativeElement.height = 220;

    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: {
        labels: this.categoryData.map(item => this.languageService.translate(item.label)),
        datasets: [
          {
            data: this.categoryData.map(item => item.value),
            backgroundColor: [
              '#33C5DD',
              '#DC3545',
              '#5873F8',
              '#6C757D'
            ],
            borderWidth: 2,
            borderColor: '#ffffff'
          }
        ]
      },
      options: {
        responsive: false,
        maintainAspectRatio: true,
        aspectRatio: 1,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = this.languageService.translate(this.categoryData[context.dataIndex].label);
                const value = context.parsed;
                const dataset = context.dataset.data;
                const total = (dataset as number[]).reduce((a: number, b: number) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        }
      } as ChartOptions<'doughnut'>
    };

    this.pieChart = new Chart(ctx, config);
  }

  updateChart() {
    console.log('Updating chart for:', this.selectedMonth, this.selectedYear);
    
    // Update monthly chart data based on selected month/year
    if (this.monthlyChart) {
      // Generate new data for the selected month
      const days = this.getDaysInMonth(parseInt(this.selectedMonth), parseInt(this.selectedYear));
      const dayLabels = Array.from({ length: days }, (_, i) => i + 1);
      const newTicketData = dayLabels.map(() => Math.floor(Math.random() * 50) + 20);
      const completedData = dayLabels.map(() => Math.floor(Math.random() * 40) + 30);
      
      this.monthlyChart.data.labels = dayLabels;
      this.monthlyChart.data.datasets[0].data = newTicketData;
      this.monthlyChart.data.datasets[1].data = completedData;
      this.monthlyChart.update();
    }
  }

  updateCategoryChart() {
    console.log('Updating category chart for:', this.selectedCategoryYear);
    
    // Update category chart data based on selected year
    if (this.categoryChart) {
      const monthLabels = this.getMonthLabels();
      const generateMonthlyData = () => monthLabels.map(() => Math.floor(Math.random() * 40) + 10);
      
      this.categoryChart.data.labels = monthLabels;
      this.categoryChart.data.datasets.forEach(dataset => {
        dataset.data = generateMonthlyData();
      });
      this.categoryChart.update();
    }
  }

  updateChartsLanguage() {
    // Destroy existing charts and recreate with new language
    if (this.monthlyChart) {
      this.monthlyChart.destroy();
      this.createMonthlyChart();
    }
    if (this.categoryChart) {
      this.categoryChart.destroy();
      this.createCategoryChart();
    }
    if (this.pieChart) {
      this.pieChart.destroy();
      this.createPieChart();
    }
  }

  getMonthLabels(): string[] {
    const currentLang = this.languageService.getCurrentLanguage();
    
    if (currentLang === 'th') {
      return ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    } else {
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    }
  }

  private getDaysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
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

  ngOnDestroy() {
    // Clean up charts
    if (this.monthlyChart) {
      this.monthlyChart.destroy();
    }
    if (this.categoryChart) {
      this.categoryChart.destroy();
    }
    if (this.pieChart) {
      this.pieChart.destroy();
    }
  }
}