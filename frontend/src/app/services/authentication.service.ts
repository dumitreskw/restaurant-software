import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { LoginModel, RegisterModel } from '../models/auth';
import { GenericResponse } from '../models/generic-respose';
import { SERVER } from '../../env';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private API_URL: string = SERVER.API_URL;
  
  constructor(private httpClient: HttpClient,
    private cookieService: CookieService) { }

  login(request: LoginModel): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/login`, request, {withCredentials: true});
  }

  logout(): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/logout`, {}, {withCredentials: true});
  }

  register(request: RegisterModel): Observable<GenericResponse> {
    return this.httpClient.post<GenericResponse>(`${this.API_URL}/register`, request, {withCredentials: true});
  }

  verify(code: number): Observable<GenericResponse> {
    return this.httpClient.post<GenericResponse>(`${this.API_URL}/verify`, {'otp': code}, {withCredentials: true});
  }

  isAuthenticated(): boolean {
    const token = this.cookieService.get('token');
    return !jwtHelper.isTokenExpired(token)
  }

  isAdmin(): boolean {
    const token = this.cookieService.get('token');
    const tokenPayload = jwtHelper.decodeToken(token)
    if(tokenPayload) {
      return tokenPayload.role == "ADMIN";
    }
    return false;
  }

  getUsername(): string {
    const token = this.cookieService.get('token');
    const tokenPayload = jwtHelper.decodeToken(token)
    if(tokenPayload) {
      return tokenPayload.username;
    }
    return '';
  }
}
