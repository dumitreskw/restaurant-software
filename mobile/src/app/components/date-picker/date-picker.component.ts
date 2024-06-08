import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent  implements OnInit {
  today = new Date().toISOString();
  maxDate = new Date();
  allHours: string[] = [];
  selectedHour: string = '';

  constructor() { }

  ngOnInit() {
    this.maxDate = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth()+1);
    this.allHours = this.generateHourRanges();
  }

  onDateChanged(event: any) {
    console.log(event.detail.value)
  }

  generateHourRanges(): string[] {
    const hourRanges: string[] = [];
    for (let hour = 10; hour < 24; hour++) {
      const hourString = hour.toString().padStart(2, '0'); // Add leading zero if necessary
      const range = `${hourString}:00 - ${hourString}:59`;
      hourRanges.push(range);
    }
    return hourRanges;
  }



}
