import { Routes } from '@angular/router';
import { LoginComponent } from './auth/container/login/login.component';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./auth/container/login/login.component').then(component => {
            return component.LoginComponent;
        }),
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
