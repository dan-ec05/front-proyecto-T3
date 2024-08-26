import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./auth/container/login/login.component').then(c => c.LoginComponent),
    },
    {
        path: 'inicio',
        loadComponent: () => import('./layout/main/main.component').then((c) => c.MainComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/home/home.component').then((c) => c.HomeComponent)
            },
            {
                path: 'gestion-pagos',
                loadComponent: () => import('./pages/payment-management/payment-management.component').then((c) => c.PaymentManagementComponent)
            },
            {
                path: 'doctores',
                loadComponent: () => import('./pages/doctors/doctors.component').then((c) => c.DoctorsComponent)
            }
        ]
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
