import { Injectable } from '@angular/core';
import { SERVER } from '../../env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private API_URL: string = SERVER.API_URL + '/upload';

  constructor(
    private httpClient: HttpClient,
  ) { }

  upload(file: FormData): Observable<any> {
    console.log(file);
    //const headers = new HttpHeaders({'Content-Type': 'multipart/form-data'});
    //return this.httpClient.post<any>(this.API_URL, file, {headers: headers});
    return this.httpClient.post<any>(this.API_URL, file);
  }
}
