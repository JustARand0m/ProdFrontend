import { TodosComponent } from './pages/todos/todos.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { FitComponent } from './pages/fit/fit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodComponent } from './pages/food/food.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LoginGuardService } from './core/guards/login-guard.service';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'todos', component: TodosComponent, canActivate: [LoginGuardService]},
  {path: 'settings', component: SettingsComponent, canActivate: [LoginGuardService]},
  {path: 'fit', component: FitComponent, canActivate: [LoginGuardService]},
  {path: 'food', component: FoodComponent, canActivate: [LoginGuardService]},
  {path: 'forgot', component: ForgotPasswordComponent, canActivate: [LoginGuardService]},
  {path: '', redirectTo: 'todos', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
