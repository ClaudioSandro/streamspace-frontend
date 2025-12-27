import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { 
    path: 'sign-in', 
    loadComponent: () => import('./iam/pages/sign-in-page/sign-in-page').then(m => m.SignInPage) 
  },
  { 
    path: 'sign-up', 
    loadComponent: () => import('./iam/pages/sign-up-page/sign-up-page').then(m => m.SignUpPage) 
  },
  { 
    path: 'home', 
    loadComponent: () => import('./home/pages/home-page/home-page').then(m => m.HomePage),
    canActivate: [authGuard]
  },
  { 
    path: 'spaces', 
    loadComponent: () => import('./spaces/pages/space-list-page/space-list-page').then(m => m.SpaceListPage),
    canActivate: [authGuard]
  },
  { 
    path: 'spaces/create', 
    loadComponent: () => import('./spaces/pages/space-create-page/space-create-page').then(m => m.SpaceCreatePage),
    canActivate: [authGuard]
  },
  { 
    path: 'spaces/:id', 
    loadComponent: () => import('./spaces/pages/space-detail-page/space-detail-page').then(m => m.SpaceDetailPage),
    canActivate: [authGuard]
  },
  { 
    path: 'spaces/:id/edit', 
    loadComponent: () => import('./spaces/pages/space-edit-page/space-edit-page').then(m => m.SpaceEditPage),
    canActivate: [authGuard]
  }
];
