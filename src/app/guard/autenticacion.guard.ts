import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';

@Injectable()
export class AuthGuard {
  constructor(
    private authService: AutenticacionService,
    private router: Router
  ) {}

  canActivate() {
    if (!this.authService.estaLogueado()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
