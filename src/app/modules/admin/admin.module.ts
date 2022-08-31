import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { BrandManagementComponent } from './brand-management/brand-management.component';
import { ModelManagementComponent } from './model-management/model-management.component';
import { CarManagementComponent } from './car-management/car-management.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule} from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select'

@NgModule({
  declarations: [
    BrandManagementComponent,
    ModelManagementComponent,
    CarManagementComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class AdminModule { }
