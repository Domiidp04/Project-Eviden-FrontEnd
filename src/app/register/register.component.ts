import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public username: string = '';
  public email: string = '';
  public password: string = '';

  constructor(private authService: UserService, private router: Router) {}

  register(form: NgForm): void {
    if (form.valid) {
      // Llama al método de registro en tu servicio de autenticación
      this.authService.register(this.username, this.email, this.password).subscribe(
        (data) => {
          console.log('Usuario registrado exitosamente:', data);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error al registrar usuario:', error);
          this.errorMessage = 'Datos incorrectos';
        }
      );
    }
  }


  // Propiedades para la alerta personalizada
  showError: boolean = false;
  errorMessage: string = '';

  private handleLoginError(error: any): void {
    this.errorMessage = 'Credenciales incorrectas';
    this.showError = true;
    this.router.navigate(['/']);
  }
}
