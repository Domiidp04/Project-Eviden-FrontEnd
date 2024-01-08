import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ExpireService implements HttpInterceptor {

  constructor(private router: Router, private userService: UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Continuar con la solicitud modificada
    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401) {  // Verifica si la respuesta es un Unauthorized
          // Aquí puedes agregar lógica adicional según tus necesidades
          console.error('Sesion Expired.');
          // Redirige al componente de login
          this.userService.cerrarSesion();
          this.router.navigate(['/login']);
        }
        
        return throwError(error);
      })
    );
  }

  isAuthenticated(): boolean {
    // Verificar si el usuario está autenticado
    const token = localStorage.getItem('token');
    return !!token; // Devuelve true si el token existe, de lo contrario, false
  }
}
