import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) {}

  getUserInfo(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'), // Ajusta según cómo almacenes tu token
     });
    // console.log(headers);
    // console.log(localStorage.getItem('token'));
    return this.http.get<any>(`${this.apiUrl}/api/test/user`, { headers });
  }

  public eliminarUsuario(id: number): Observable<any> {
    const url = `${this.apiUrl}/api/test/delete/${id}`;
    return this.http.delete(url);
  }

  cerrarSesion(): void {
    // Eliminar el token del almacenamiento local
    localStorage.removeItem('token');

    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/']);
  }

  register(username: string, email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/api/auth/signup`; // Ajusta según la ruta de registro en tu API
    const body = { username, email, password, roles: ['USER'] }; // Ajusta según tu modelo

    return this.http.post(url, body);
  }

  register2(username: string, email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/api/auth/signup/admin`; // Ajusta según la ruta de registro en tu API
    const body = { username, email, password, roles: ['USER'] }; // Ajusta según tu modelo

    return this.http.post(url, body);
  }

  actualizarUsuario(id: number, username: string, email: string): Observable<any> {
    const url = `${this.apiUrl}/api/test/update/${id}`;
    const body = { username, email }; // Ajusta según los datos que desees actualizar
  
    return this.http.put(url, body);
  }
  

}
