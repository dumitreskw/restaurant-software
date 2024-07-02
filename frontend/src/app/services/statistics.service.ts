import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER } from '../../env';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private API_URL: string = SERVER.API_URL;
  constructor(private httpClient: HttpClient) {

  }
  getStatistics() {
    return this.httpClient.get<any>(
      `${this.API_URL}/statistics`
    );
  }
}
