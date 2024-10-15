import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER } from '../../env';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private API_URL: string = SERVER.API_URL;
  
  constructor(private httpClient: HttpClient,
    private cookieService: CookieService) { }

  getUsers(): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}/users`, {withCredentials: true});
  }
}
