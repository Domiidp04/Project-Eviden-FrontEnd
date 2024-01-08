import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent {

  public username: string = '';
  public email: string = '';

  constructor(private authService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Puedes cargar los datos iniciales si es necesario
  }

  actualizar(form: NgForm): void {
    if (form.valid) {
      // Llama al método de actualización en tu servicio de autenticación
      // Asegúrate de tener el userId o alguna forma de identificar al usuario que se está actualizando
      const userId = localStorage.getItem('userId'); // Obtén el userId desde el localStorage
  
      if (userId) {
        // Parsea el userId a un número
        const userIdNumber: number = parseInt(userId, 10);
  
        this.authService.actualizarUsuario(userIdNumber, this.username, this.email).subscribe(
          (data) => {
            this.router.navigate(['/']);
          },
          (error) => {
            console.error('Error al actualizar usuario:', error);
            // Manejo de errores, muestra un mensaje o realiza alguna acción
          }
        );
      } else {
        console.error('Error al obtener userId desde el localStorage');
        // Manejo de errores, muestra un mensaje o realiza alguna acción
      }
    }
  }

}


