import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { ReservationService } from '../../../services/reservation.service';
import { Router } from '@angular/router';

interface TimeInterval {
  value: string;
  isAvailable: boolean;
}

@Component({
  selector: 'app-book-a-table',
  templateUrl: './book-a-table.component.html',
  styleUrl: './book-a-table.component.scss',
})
export class BookATableComponent implements OnInit {
  date: Date[] | undefined;
  selectedDate!: Date;
  minDateValue: Date = new Date();
  maxDateValue: Date = new Date();
  formGroup!: FormGroup;
  numberOfPersons: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  timeIntervals!: TimeInterval[];
  selectedInterval!: TimeInterval;
  success!: boolean;

  constructor(private reservationService: ReservationService,
    private router: Router
  ) {
    this.maxDateValue.setDate(this.maxDateValue.getDate() + 14);
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      date: new FormControl<Date | null>(null),
      noPersons: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(12),
      ]),
    });

    this.getReservationsByUser();
  }

  onTimeSelect(event: any) {
    this.selectedDate = new Date(event); // Update the binding
    this.selectedDate.setHours(12, 0, 0, 0); // Reset to 12:00 PM
  }

  onLoseFocus() {
    console.log(this.formGroup);
  }

  onDateSelected() {
    console.log(this.selectedDate);
    this.getAvailableTimeIntervals();
  }

  private getAvailableTimeIntervals() {
    let stringArray: string[] = [];
    this.timeIntervals = [];
    this.reservationService.getAvailableHours(this.selectedDate).subscribe({
      next: (res) => (stringArray = res),
      complete: () =>
        stringArray.forEach((e) =>
          this.timeIntervals.push({ value: e, isAvailable: true })
        ),
    });
  }

  onReserve() {
    console.log(this.selectedInterval);
    console.log(this.formGroup.controls['noPersons'].value);

    this.reservationService
      .createReservation(
        this.selectedDate,
        this.formGroup.controls['noPersons'].value,
        this.selectedInterval.value
      )
      .subscribe({
        complete: () => this.success = true,
        error: (err) => {
          console.error(err);
          this.success = false;
        }
      });
  }

  get isReserveDisabled() {
    return (
      !this.selectedInterval || !this.formGroup.controls['noPersons'].value
    );
  }

  onViewReservations() {
    this.router.navigate(['/my-reservations']);
  }

  onGoToHome() {
    this.router.navigate(['/']);
  }

  private getReservationsByUser() {
    this.reservationService.getReservations().subscribe(r => console.log(r));
  }
}
