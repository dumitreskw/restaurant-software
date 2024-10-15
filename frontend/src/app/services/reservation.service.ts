import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER } from '../../env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private API_URL: string = SERVER.API_URL;
  constructor(private httpClient: HttpClient) {}

  getAvailableHours(date: Date): Observable<any> {
    const formattedDate = date.toISOString().split('T')[0];
    return this.httpClient.get<any>(
      `${this.API_URL}/reservations/date/${formattedDate}`
    );
  }

  createReservation(date: Date, partySize: number, interval: string) {
    const [startDateString, endDateString] = interval.split(' - ');
    return this.httpClient.post<any>(
      `${this.API_URL}/reservations`,
      {
        date: date,
        numberOfPersons: partySize,
        startTime: parseInt(startDateString),
        endTime: parseInt(endDateString),
      },
      { withCredentials: true }
    );
  }

  getReservationsByUserId() {
    console.log("here")
    return this.httpClient.get<any>(`${this.API_URL}/reservations/byUser`, {
      withCredentials: true,
    });
  }

  getReservations() {
    return this.httpClient.get<any>(`${this.API_URL}/reservations`, {
      withCredentials: true,
    });
  }
}
