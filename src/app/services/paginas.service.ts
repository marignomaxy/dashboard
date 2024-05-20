import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginasService {
  private urlBase = environment.apiUrl;
  private url = `${this.urlBase}/paginas`;

  constructor(private http: HttpClient, private router: Router) {}

  public getPaginas() {
    return this.http.get(this.url);
  }

  public getPagina(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }

  public crearPagina(pagina: any) {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    let formData: FormData = new FormData();
    formData.append('file', pagina.imagen);
    formData.append('pagina', JSON.stringify(pagina));

    return this.http.post(this.url, formData, { headers: headers });
  }

  public eliminarPagina(id: number): Observable<string> {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete(`${this.url}/${id}`, {
      headers: headers,
      responseType: 'text',
    });
  }
}
