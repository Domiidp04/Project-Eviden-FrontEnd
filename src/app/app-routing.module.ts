import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { landingGuard } from './guards/landing.guard';
import { RegisterComponent } from './register/register.component';
import { CrearComponent } from './crear/crear.component';
import { ActualizarComponent } from './actualizar/actualizar.component';
import { actualizarGuard } from './guards/actualizar.guard';

const routes: Routes = [
  {path:"login", component:LoginComponent, canActivate: [AuthGuard]},
  { path: 'landing', component: LandingComponent, canActivate: [landingGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  { path: 'landing/create', component: CrearComponent, canActivate: [landingGuard]},
  { path: 'landing/update/:id', component: ActualizarComponent, canActivate: [landingGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: '**', component: PageNotFoundComponent},
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
