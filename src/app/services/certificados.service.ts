import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CertificadosService {
  private urlBase = environment.apiUrl;
  private url = `${this.urlBase}/certificados`;

  constructor(private http: HttpClient, private router: Router) {}

  public getCertificados() {
    return this.http.get(this.url);
  }

  public getCertificado(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }

  public crearCertificado(certificado: any) {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    let formData: FormData = new FormData();
    formData.append('file', certificado.imagen);
    formData.append('certificado', JSON.stringify(certificado));

    return this.http.post(this.url, formData, { headers: headers });
  }

  public eliminarCertificado(id: number) {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete(`${this.url}/${id}`, { headers: headers });
  }
}
