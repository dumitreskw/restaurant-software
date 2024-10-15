import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../../services/reservation.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrl: './my-reservations.component.scss',
})
export class MyReservationsComponent implements OnInit {
  reservations!: any[];
  todayDate: Date = new Date();

  constructor( private reservationService: ReservationService) {}
  ngOnInit(): void {
    this.getReservations();
  }

  getReservations() {
    this.reservationService.getReservations().subscribe({
      next: (res) => this.reservations = res,
      complete: () => this.reservations = this.reservations.reverse(),
      error: (err) => console.error(err)
    })
  }

  isReservationExpired(reservation: any) {
    const reservationDate = new Date(reservation.endDate)

    return this.todayDate > reservationDate;
  } 

  getReservationHour(reservation: any) {
    const hour = new Date(reservation.startTime).toUTCString();
    return hour;
  }
}
