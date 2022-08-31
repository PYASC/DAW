import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard } from './authorized.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('src/app/modules/cars/cars.module').then(m => m.CarsModule),
  },
  {
    path: 'login',
    pathMatch: 'prefix',
    loadChildren: () => import('src/app/modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'admin',
    canActivate: [AuthorizedGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/modules/admin/admin.module').then(m => m.AdminModule),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
