import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class landingGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      return true; // Permite el acceso actual
    } else {
      // Si no hay token, redirige a la ruta principal
      this.router.navigate(['/']);
      return false; // Bloquea el acceso actual
    }
  }
}