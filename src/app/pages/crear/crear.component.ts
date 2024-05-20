import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Tecnologia } from '../../interfaces/pagina';

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.scss',
})
export class CrearComponent implements OnInit {
  formularioPagina!: FormGroup;
  private urlBase = environment.apiUrl;
  private url = `${this.urlBase}/paginas`;
  tecnologias: Tecnologia[] = [];
  selectedTecnologias: Number[] = [];
  token = localStorage.getItem('token');
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.formularioPagina = this.formBuilder.group({
      imagen: new FormControl(null),
      titulo_pagina: new FormControl('', Validators.required),
      descripcion_pagina: new FormControl('', Validators.required),
      tecnologias: new FormControl([]),
      destacada: new FormControl(false),
      fecha: new FormControl('', Validators.required),
      url_repositorio: new FormControl('', Validators.required),
      url_pagina: new FormControl('', Validators.required),
    });
    this.http.get(`${this.urlBase}/tecnologias`).subscribe((response) => {
      this.tecnologias = response as Tecnologia[];
    });
  }

  onTecnologiaChange(event: any) {
    const tecnologiaId = Number(event.target.value);
    const isChecked = event.target.checked;

    if (isChecked) {
      this.selectedTecnologias.push(tecnologiaId);
    }
  }
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formularioPagina.patchValue({
        imagen: file,
      });
    }
  }

  onSubmit() {
    const formData = new FormData();
    const file = this.formularioPagina.get('imagen')?.value;
    if (file) {
      formData.append('file', file);
    }

    const pagina = {
      titulo_pagina: this.formularioPagina.get('titulo_pagina')?.value,
      descripcion_pagina:
        this.formularioPagina.get('descripcion_pagina')?.value,
      tecnologias: this.selectedTecnologias,
      destacada: this.formularioPagina.get('destacada')?.value,
      fecha: this.formularioPagina.get('fecha')?.value,
      url_repositorio: this.formularioPagina.get('url_repositorio')?.value,
      url_pagina: this.formularioPagina.get('url_pagina')?.value,
    };

    formData.append('pagina', JSON.stringify(pagina));

    this.http
      .post(this.url, formData, { headers: this.headers })
      .subscribe((response) => {
        console.log(response);
        this.route.navigate(['/home']);
      });
  }
}
