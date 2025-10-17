import { Routes } from '@angular/router';
import { AuthLayout } from './_components/auth-layout/auth-layout';;
import { MainLayout } from './_components/main-layout/main-layout';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {path: '', component: AuthLayout,
        children: [
            {path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login), title: 'Login' },
            { path: 'signUp', loadComponent: () => import('./pages/sign-up/sign-up').then(m => m.SignUp), title: 'Registre-se' },
        ]
    },  
    {path: '', component: MainLayout, canActivate: [authGuard],
        children: [
            { path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.Home), title: 'Dashboard' },
            { path: 'register', loadComponent: () => import('./pages/register/register').then(m => m.Register), title: 'Cadastro de Clientes' },
            { path: 'report', loadComponent: () => import('./pages/report/report').then(m => m.Report), title: 'Relatório' },
            { path: 'clientList', loadComponent: () => import('./pages/client-list/client-list').then(m => m.ClientList), title: 'Lista de Clientes' },
            { path: 'logList', loadComponent: () => import('./pages/log-list/log-list').then(m => m.LogList), title: 'Lista de Logs' }
        ]
    },
];