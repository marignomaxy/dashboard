import { Component } from '@angular/core';
import { PaginasService } from '../../services/paginas.service';
import { CertificadosService } from '../../services/certificados.service';
import { Pagina } from '../../interfaces/pagina';
import { Certificado } from '../../interfaces/certificado';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  paginas: Pagina[] = [];
  certificados: Certificado[] = [];

  constructor(
    private paginasService: PaginasService,
    private certificadosService: CertificadosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.paginasService
      .getPaginas()
      .pipe(map((data: any): Pagina[] => data))
      .subscribe((paginas: Pagina[]) => {
        console.log(paginas);
        this.paginas = paginas;
      });

    this.certificadosService
      .getCertificados()
      .pipe(map((data: any): Certificado[] => data))
      .subscribe((certificados: Certificado[]) => {
        console.log(certificados);
        this.certificados = certificados;
      });
  }

  eliminarElemento(tipo: string, id: number) {
    if (tipo === 'pagina') {
      this.paginasService.eliminarPagina(id).subscribe(() => {
        console.log('Pagina eliminado');
        this.cargarDatos();
      });
    } else if (tipo === 'certificado') {
      this.certificadosService.eliminarCertificado(id).subscribe(() => {
        console.log('Certificado eliminado');
        this.cargarDatos();
      });
    }
  }

  crear(tipo: string) {
    if (tipo === 'pagina') {
      this.router.navigate(['/crear-pagina']);
    } else if (tipo === 'certificado') {
      this.router.navigate(['/crear-certificado']);
    }
  }
}
