import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {

  private apiUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post<any>(`${this.apiUrl}/api/auth/signin`, body);
  }

  getUserInfo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/test/user`);
  }

  

  

}
