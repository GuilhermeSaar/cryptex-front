import { Routes } from '@angular/router';
import {LoginComponent} from './features/login.component/login.component';
import {DashboardComponent} from './features/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
];
