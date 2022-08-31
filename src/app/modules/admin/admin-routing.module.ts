import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandManagementComponent } from './brand-management/brand-management.component';
import { CarManagementComponent } from './car-management/car-management.component';
import { ModelManagementComponent } from './model-management/model-management.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'car',
    pathMatch: 'full',
  },
  {
    path: 'car',
    component: CarManagementComponent,
  },
  {
    path: 'model',
    component: ModelManagementComponent,
  },
  {
    path: 'brand',
    component: BrandManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
