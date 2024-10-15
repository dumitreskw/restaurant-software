import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../../services/reservation.service';

@Component({
  selector: 'app-admin-reservations',
  templateUrl: './admin-reservations.component.html',
  styleUrl: './admin-reservations.component.scss'
})
export class AdminReservationsComponent implements OnInit {
  reservations: any[] = [];
  first = 0;
  rows = 10;
  isLoading: boolean = false;

  constructor(private reservationService: ReservationService) {
    
  }

  ngOnInit() {
    this.reservationService.getReservations().subscribe({
      next: (res) => this.reservations = res,
      complete: () => {
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    })
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return this.reservations ? this.first >= this.reservations.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.reservations ? this.first === 0 : true;
  }
}
