import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  title = "Front-End Clientes";
  isAdmin: boolean = false;
  constructor(private router: Router){}
  ngOnInit(): void {
    // Obtén el rol del localStorage
    const userRole = localStorage.getItem('role');

    // Verifica si el rol es 'admin'
    this.isAdmin = userRole === 'ROLE_ADMIN';
  }

  cerrarSesion(): void {
    // Eliminar el token del almacenamiento local
    localStorage.removeItem('token');

    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/']);
  }

  crearUsuario(){
    return this.router.navigate(["/landing/create"]);
  }

}
