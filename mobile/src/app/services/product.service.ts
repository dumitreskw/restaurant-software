import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER } from 'src/env';
import { HttpService } from './http.service';
import { HttpResponse } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private API_URL: string = SERVER.API_URL;
  constructor(private httpClient: HttpClient,
    private http: HttpService
  ) { }

  getProducts(): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}/all-products`, {});
  }

  getCategoriesWithProducts(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.API_URL}/products-with-categories`,
      {}
    );
  }

  getCategoriesWithProductsCap(): Observable<HttpResponse> {
    return this.http.doGet(`${this.API_URL}/products-with-categories`);
  }
}
