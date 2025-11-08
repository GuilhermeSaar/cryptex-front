import { Routes } from '@angular/router';
import {LoginComponent} from './features/login/login.component';
import {DashboardComponent} from './features/dashboard/dashboard.component';
import {TransactionComponent} from './features/transaction/transaction.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'transaction', component: TransactionComponent},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
