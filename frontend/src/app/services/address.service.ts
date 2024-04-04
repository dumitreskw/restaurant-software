import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SERVER } from '../../env';
import { CreateAddressRequest } from '../models/requests/create-address';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private API_URL: string = SERVER.API_URL;
  
  constructor(private httpClient: HttpClient,
    private cookieService: CookieService) { }

  addAddress(request: CreateAddressRequest): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/address`, request, {withCredentials: true});
  }

  deleteAddress(addressId: string): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/delete-address`, addressId, {withCredentials: true});
  }

  getAddresses(): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}/address`, {withCredentials: true})
  }
}
