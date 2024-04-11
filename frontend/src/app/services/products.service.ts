import { Injectable } from '@angular/core';
import { SERVER } from '../../env';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { CreateProductRequest } from '../models/requests/create-product';
import { UpdateProductRequest } from '../models/requests/update-product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private API_URL: string = SERVER.API_URL;
  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}/all-products`, {});
  }

  getCategories(): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}/category`, {});
  }

  getCategoriesWithProducts(): Observable<any> {
    return this.httpClient.get<any>(
      `${this.API_URL}/products-with-categories`,
      {}
    );
  }

  addProduct(request: CreateProductRequest): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/products`, request);
  }

  deleteProduct(id: string): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}/delete-product`, {id: id});
  }

  updateProduct(request: UpdateProductRequest): Observable<any> {
    return this.httpClient.put<any>(`${this.API_URL}/products`, request);
  }

  getProduct(id: string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams.append('id', id);
    return this.httpClient.post<any>(`${this.API_URL}/product-by-id`, {id: id});
  }

  getProductsNames(): Observable<any> {
    return this.httpClient.get<any>(`${this.API_URL}/product-names`, {});
  }
  
}
