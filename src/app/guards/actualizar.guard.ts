import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export class actualizarGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Aquí va la lógica de tu guardia, por ejemplo, comprobar si el usuario tiene permiso para acceder a la ruta
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirigir o realizar alguna acción cuando no tiene permiso
      this.router.navigate(['/denied']);
      return false;
    }

    return true; // Permite el acceso a la ruta si tiene permiso
  }
}

