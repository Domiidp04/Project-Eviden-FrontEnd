import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { ExpireService } from '../interceptors/expire.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {

  userInfo?: User;
  usersList: User[] = [];
  userId:any;
  admin:boolean = false;

  constructor(private userService: UserService, private authService: ExpireService, private router: Router) {}

  

  ngOnInit(): void {
    this.getUserInfo();
    this.checkAuthentication();// Asegúrate de tener un método isAdmin() en tu servicio.
  }

  getUserInfo(): void {
    this.userService.getUserInfo().subscribe(
      (data) => {
  
        if (Array.isArray(data)) {
          // Si es un array (admin), haz lo que necesites con la lista completa de usuarios
          // Si es un array (admin), haz lo que necesites con la lista completa de usuarios
          const userIdString = localStorage.getItem('userId');
          this.userId = userIdString ? parseInt(userIdString, 10) : null;

          // Filtra los usuarios excluyendo al usuario actual
          this.usersList = data.filter(user => user.id !== this.userId);
        } else {
          // Si es un objeto (user), haz lo que necesites con la información del usuario
          this.userInfo = data;
        }
      },
      (error) => {
        console.error('Error al obtener información del usuario:', error);
      }
    );
  }

  eliminarUsuario(id: number): void {
    this.userService.eliminarUsuario(id)
      .subscribe(() => {
        console.log('Usuario eliminado');
        localStorage.removeItem('token');
        this.userService.cerrarSesion();
      });
  }

  eliminarUsuarioArray(id:number): void{
    this.userService.eliminarUsuario(id)
      .subscribe(() => {
        console.log('Usuario eliminado');
        this.getUserInfo();
      });
  }

  actualizarUsuario(id: number): void {
    this.router.navigate(['landing/update/', id]);
  }
  
  
  private checkAuthentication(): void {
    if (!this.authService.isAuthenticated()) {
      // Usuario no autenticado, redirigir al inicio de sesión
      this.router.navigate(['/login']);
    } else {
      // El usuario está autenticado, realizar otras acciones si es necesario
    }
  }

  

}
