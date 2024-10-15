import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject, from, map, Observable, switchMap, tap } from 'rxjs';

const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  token: string = '';

  constructor(private http: HttpClient) { }

  async loadToken() {
    const token = await Preferences.get({ key: TOKEN_KEY });
    if (token && token.value) {
     console.log('set token: ', token.value);
     this.token = token.value;
     this.isAuthenticated.next(true);
    } else {
     this.isAuthenticated.next(false);
    }
   }

   login(credentials: { email: any; password: any }): Observable<any> {
    return this.http.post(`http://localhost:3000/api/v1/login`, credentials).pipe(
     map((data: any) => data.token),
     switchMap((token) => {
      return from(Preferences.set({ key: TOKEN_KEY, value: token as string }));
     }),
     tap((_) => {
      this.isAuthenticated.next(true);
     })
    );
   }

   logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Preferences.remove({ key: TOKEN_KEY });
   }
}
