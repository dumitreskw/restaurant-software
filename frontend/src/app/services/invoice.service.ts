import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SERVER } from '../../env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private API_URL: string = SERVER.API_URL + '/invoice';
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  createInvoice(): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/createInvoice`, {}, {
      withCredentials: true,
    });
  }

  getInvoices(): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}/getInvoices`, {
      withCredentials: true,
    });
  }
}
