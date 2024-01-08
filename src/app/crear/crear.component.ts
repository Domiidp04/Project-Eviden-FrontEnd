import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit{

  public username: string = '';
  public email: string = '';
  public password: string = '';

  constructor(private authService: UserService, private router: Router) {}
  ngOnInit(): void {
    if (localStorage.getItem('role') != "ROLE_ADMIN") {
      this.router.navigate(['/login']);
    }
  }

  register(form: NgForm): void {
    if (form.valid) {
      // Llama al método de registro en tu servicio de autenticación
      this.authService.register2(this.username, this.email, this.password).subscribe(
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
