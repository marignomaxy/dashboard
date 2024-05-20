import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AutenticacionService } from '../../services/autenticacion.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  formularioLogin!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private autenticacionService: AutenticacionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formularioLogin = this.formBuilder.group({
      mail: new FormControl('', [Validators.required, Validators.email]),
      contraseña: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    if (this.formularioLogin.valid) {
      const datos = {
        email: this.formularioLogin.get('mail')?.value,
        password: this.formularioLogin.get('contraseña')?.value,
      };
      this.autenticacionService.login(datos).subscribe({
        next: (response) => {
          console.log('Inicio de sesión exitoso', response);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.log('Error en el inicio de sesión', error);
        },
      });
    }
  }
}
