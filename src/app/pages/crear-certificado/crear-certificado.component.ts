import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-certificado',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-certificado.component.html',
  styleUrl: './crear-certificado.component.scss',
})
export class CrearCertificadoComponent {
  formularioCertificado!: FormGroup;
  private urlBase = environment.apiUrl;
  private url = `${this.urlBase}/certificados`;
  token = localStorage.getItem('token');
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.formularioCertificado = this.formBuilder.group({
      imagen: new FormControl(null),
      titulo_certificado: new FormControl('', Validators.required),
      esDeGrado: new FormControl(false),
      institucion: new FormControl('', Validators.required),
      descripcion_certificado: new FormControl('', Validators.required),
      fecha: new FormControl('', Validators.required),
      url_certificado: new FormControl('', Validators.required),
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formularioCertificado.patchValue({
        imagen: file,
      });
    }
  }

  onSubmit() {
    const formData = new FormData();
    const file = this.formularioCertificado.get('imagen')?.value;
    if (file) {
      formData.append('file', file);
    }

    const certificado = {
      titulo_certificado:
        this.formularioCertificado.get('titulo_certificado')?.value,
      esDeGrado: this.formularioCertificado.get('esDeGrado')?.value,
      institucion: this.formularioCertificado.get('institucion')?.value,
      descripcion_certificado: this.formularioCertificado.get(
        'descripcion_certificado'
      )?.value,
      fecha: this.formularioCertificado.get('fecha')?.value,
      url_certificado: this.formularioCertificado.get('url_certificado')?.value,
    };

    formData.append('certificado', JSON.stringify(certificado));

    this.http
      .post(this.url, formData, { headers: this.headers })
      .subscribe((response) => {
        console.log(response);
        this.route.navigate(['/home']);
      });
  }
}
