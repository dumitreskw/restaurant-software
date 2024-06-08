import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  doGet(url: string) {
    const options: HttpOptions = {
      url
    }

    return from(CapacitorHttp.get(options));
  }
}
