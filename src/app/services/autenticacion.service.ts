import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionService {
  private urlBase = environment.apiUrl;
  private url = `${this.urlBase}/auth/login`;

  constructor(private http: HttpClient) {}

  login(datos: { email: string; password: string }) {
    return this.http.post<any>(this.url, datos).pipe(
      tap((response) => {
        localStorage.setItem('login', 'true');
        localStorage.setItem('token', response.token);
      })
    );
  }
  estaLogueado() {
    return localStorage.getItem('login') === 'true';
  }
}
