import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Brand } from 'src/app/interfaces/brand';
import { Car } from 'src/app/interfaces/car';
import { Model } from 'src/app/interfaces/model';
import { BrandService } from 'src/app/services/brand.service';
import { CarsService } from 'src/app/services/cars.service';
import { DataService } from 'src/app/services/data.service';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit, OnDestroy {
  cars: Car[] = [];
  displayedColumns: String[] = [
    "id", "licensePlate", "price", "details"
  ];
  public subscription!: Subscription;
  public favoriteBrand: number = 0;
  constructor(
    private router: Router,
    private carsService: CarsService,
    private modelService: ModelService,
    private brandService: BrandService,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.dataService.currentFavoriteBrand.subscribe(
      (brandId: number) => {this.favoriteBrand = brandId; }
    );

    this.carsService.getAll().subscribe({
      next: (res) => {
        this.cars = res;

        this.modelService.getAll().subscribe({
          next: (res2) => {
            var modelsMap = new Map<number, Model>();
            for(let model of res2){
              modelsMap.set(model.id ?? 0, model);
            }

            for(let i=0; i<this.cars.length; i++){
              this.cars[i].modelName = modelsMap.get(this.cars[i].modelID ?? 0)?.modelName;
              this.cars[i].brandID = modelsMap.get(this.cars[i].modelID ?? 0)?.brandID;
            }
            this.displayedColumns.splice(1, 0, "modelName")
            modelsMap.clear();


            this.brandService.getAll().subscribe({
              next: (res3) => {
                var brandsMap = new Map<number, Brand>();
                for(let brand of res3){
                  brandsMap.set(brand.id ?? 0, brand);
                }

                for(let i=0; i<this.cars.length; i++){
                  this.cars[i].brandName = brandsMap.get(this.cars[i].brandID ?? 0)?.name;
                }

                this.displayedColumns.splice(1, 0, "brandName")
                brandsMap.clear();
              }
            });

          }
        });

      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  details(id: number){
    this.router.navigate(["car/", id])
  }

}
