import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    loadComponent: () => import('./pages/menu/menu.page').then(m => m.MenuPage)
  },
  {
    path: 'menu-details/:id',
    loadComponent: () => import('./pages/menu-details/menu-details.page').then(m => m.MenuDetailsPage)
  },
  // Si tienes tabs, puedes mantener esta ruta también
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'menu-details',
    loadComponent: () => import('./pages/menu-details/menu-details.page').then( m => m.MenuDetailsPage)
  }
];