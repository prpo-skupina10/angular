import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { publicGuard } from './core/guards/public.guard';

export const routes: Routes = [

  {
    path: 'login',
    canActivate: [publicGuard],
    loadComponent: () =>
      import('./features/auth/login/login')
        .then(m => m.LoginComponent)
  },

  {
    path: 'register',
    canActivate: [publicGuard],
    loadComponent: () =>
      import('./features/auth/register/register')
        .then(m => m.RegisterComponent)
  },

  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/home/home')
        .then(m => m.HomeComponent)
  },

  {
    path: 'import',
    canActivate: [authGuard],
    loadComponent: () =>
    import('./features/import/import')
      .then(m => m.ImportComponent)
  },

  {
    path: 'leagues',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/leagues/leagues')
        .then(m => m.LeaguesComponent)
  },

  {
    path: 'teams',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/teams/teams')
        .then(m => m.TeamsComponent)
  },

  {
    path: 'players',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/players/players')
        .then(m => m.PlayersComponent)
  },

  {
    path: 'leagues/:leagueId/teams',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/teams/teams')
        .then(m => m.TeamsComponent)
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];