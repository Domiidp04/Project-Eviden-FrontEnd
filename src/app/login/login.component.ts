import { Component } from '@angular/core';
import { AuthLoginService } from '../services/auth-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = "";
  password: string = "";

  constructor(private authService: AuthLoginService, private router:Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      (data) => {
  
        if (data.accessToken) {
          console.log('Usuario autenticado exitosamente.');
          // Redirige a la página de destino
          localStorage.setItem('token', data.accessToken);
          localStorage.setItem('userId', data.id);
          localStorage.setItem('role',data.roles);
          this.router.navigate(['/landing']);
        } else {
          console.log('Usuario no autenticado.');
          // Aquí podrías manejar el caso en que la autenticación falla.
        }
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        // Manejar el error y redirigir
        this.handleLoginError(error);
        this.username = "";
        this.password = "";
      }
    );
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
