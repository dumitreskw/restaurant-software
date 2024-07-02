import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER } from '../../env';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private API_URL: string = SERVER.API_URL;
  constructor(private httpClient: HttpClient) {

  }

  createTicket(title: string, message: string) {
    return this.httpClient.post<any>(
      `${this.API_URL}/ticket`,
      {
        title: title,
        message: message
      },
      { withCredentials: true }
    );
  }

  addMessage(ticketId: string, message: string) {
    return this.httpClient.post<any>(
      `${this.API_URL}/ticket/message`,
      {
        ticketId: ticketId,
        message: message
      },
      { withCredentials: true }
    );
  }

  updateStatus(ticketId: string, status: string) {
    return this.httpClient.post<any>(
      `${this.API_URL}/ticket/status`,
      {
        ticketId: ticketId,
        status: status
      },
      { withCredentials: true }
    );
  }

  getTickets() {
    return this.httpClient.get<any>(
      `${this.API_URL}/ticket`,
      { withCredentials: true }
    );
  }

  getTicketById(ticketId: string) {
    return this.httpClient.get<any>(
      `${this.API_URL}/ticket/${ticketId}`,
      { withCredentials: true }
    );
  }
}
