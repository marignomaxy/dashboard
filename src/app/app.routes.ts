import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CrearComponent } from './pages/crear/crear.component';
import { AuthGuard } from './guard/autenticacion.guard';
import { inject } from '@angular/core';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: DashboardComponent,
    canActivate: [() => inject(AuthGuard).canActivate()],
  },
  {
    path: 'crear',
    component: CrearComponent,
    canActivate: [() => inject(AuthGuard).canActivate()],
  },
  { path: '**', redirectTo: 'login' },
];
