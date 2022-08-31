import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarsComponent } from './cars/cars.component';
import { CarComponent } from './car/car.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { BrandComponent } from './brand/brand.component';
import { DateOnlyPipe } from 'src/app/date-only.pipe';
import { StatusOnHoverDirective } from 'src/app/status-on-hover.directive';

@NgModule({
  declarations: [
    CarsComponent,
    CarComponent,
    BrandComponent,
    DateOnlyPipe,
    StatusOnHoverDirective,
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
  ]
})
export class CarsModule { }
