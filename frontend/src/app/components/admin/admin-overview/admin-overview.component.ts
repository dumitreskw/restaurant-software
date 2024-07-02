import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../../services/statistics.service';

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrl: './admin-overview.component.scss',
})
export class AdminOverviewComponent implements OnInit {
  statistics: any;
  topStatistics: any[] = [];
  invoiceChart: any;
  reservationChart: any;
  revenueChart: any;
  options: any;
  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.statisticsService.getStatistics().subscribe({
      next: (res) => (this.statistics = res),
      complete: () => {
        this.handleStatistics();
        this.createCharts();
      },
      error: (err) => console.error(err),
    });
  }

  private handleStatistics() {
    this.topStatistics.push({
      title: 'Total Number of Users',
      value: `${this.statistics.totalNumberOfUsers} users`,
    });
    this.topStatistics.push({
      title: 'Total Number of Reservations',
      value: `${this.statistics.totalNumberOfReservations} reservations`,
    });
    this.topStatistics.push({
      title: 'Total Number of Tickets',
      value: `${this.statistics.totalNumberOfTickets} tickets`,
    });
    this.topStatistics.push({
      title: 'Total Number of Orders',
      value: `${this.statistics.totalNumberOfOrders} orders`,
    });
    this.topStatistics.push({
      title: 'Total Revenue',
      value: `${this.statistics.totalRevenue} LEI`,
    });
  }

  private createCharts() {
    this.createOptions();
    this.createInvoiceChart();
    this.createReservationsChart();
    this.createRevenueChart();
    };

  private createInvoiceChart() {
    this.fillValues(this.statistics.invoicesByMonth);
    this.invoiceChart = {
      title: 'Invoice number per month',
      type: 'bar',
      options: this.options,
      data: {
        labels: this.statistics.invoicesByMonth.labels,
        datasets: [
          {
            label: 'Number of invoices',
            data: this.statistics.invoicesByMonth.values,
            backgroundColor: [
              'rgba(255, 159, 64, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgb(255, 159, 64)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
            ],
            borderWidth: 1,
          },
        ],
      }
    };
  }

  private createReservationsChart() {
    this.fillValues(this.statistics.reservationsByMonth);
    console.log(this.statistics.reservationsByMonth)
    this.reservationChart = {
      title: 'Reservations number per month',
      type: 'bar',
      options: this.options,
      data: {
        labels: this.statistics.reservationsByMonth.labels,
        datasets: [
          {
            label: 'Number of reservations',
            data: this.statistics.reservationsByMonth.values,
            backgroundColor: [
              'rgba(255, 159, 64, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgb(255, 159, 64)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
            ],
            borderWidth: 1,
          },
        ],
      }
    };
  }

  private createRevenueChart() {
    this.fillValues(this.statistics.revenuesByMonth);
    this.revenueChart = {
      title: 'Revenue per month (LEI)',
      type: 'line',
      options: this.options,
      data: {
        labels: this.statistics.revenuesByMonth.labels,
        datasets: [
          {
            label: 'Total (LEI)',
            data: this.statistics.revenuesByMonth.values,
            backgroundColor: [
              'rgba(255, 159, 64, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
              'rgb(255, 159, 64)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
            ],
            borderWidth: 1,
          },
        ],
      }
    };
  }

  private fillValues(stat: any) {
    stat.labels.reverse();
    stat.values.reverse();
    
    const labels = ['2024-02', '2024-03','2024-04','2024-05', '2024-06','2024-07']
    labels.reverse();
    labels.forEach(label => {
      if(!(stat.labels as any[]).some(l => l == label)) {
        stat.labels.unshift(label)
        stat.values.unshift(0);
      }
    })
  }

  private createOptions() {
    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
    };
  }
}
