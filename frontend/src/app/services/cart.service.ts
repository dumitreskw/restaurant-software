import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SERVER } from '../../env';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
const jwtHelper = new JwtHelperService();
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private API_URL: string = SERVER.API_URL + '/cart';
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  addToCart(productId: string): Observable<any> {
    return this.httpClient.post<any>(
      `${this.API_URL}/addItem`,
      { productId, userId: this.userId },
      { withCredentials: true }
    );
  }

  getCart(): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}`, {
      withCredentials: true,
    });
  }

  addOne(productId: string): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/addOne`, {productId}, {
      withCredentials: true,
    });
  }

  deleteOne(productId: string): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/deleteOne`, {productId}, {
      withCredentials: true,
    });
  }

  deleteItem(productId: string): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/deleteItem`, {productId}, {
      withCredentials: true,
    });
  }

  private get userId(): string {
    let userId = '';
    const token = this.cookieService.get('token');
    const tokenPayload = jwtHelper.decodeToken(token);
    if (tokenPayload) {
      userId = tokenPayload._id;
    }

    return userId;
  }
}
