import { Component, OnInit } from '@angular/core';
import { CarsService } from 'src/app/services/cars.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Car } from 'src/app/interfaces/car';
import { ModelService } from 'src/app/services/model.service';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  public id = 0;
  public car: Car = {
    id: 0,
    licensePlate: "",
    modelID: 0,
  }
  public isFavorite: boolean = false;

  constructor(
    private carsService: CarsService,
    private modelService: ModelService,
    private brandService: BrandService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id) {
        this.loadCar();
      }
    });
  }

  loadCar(){
    this.carsService.getById(this.id).subscribe(
      {
        next: (res) => {
          this.car = res;

          this.modelService.getById(this.car.modelID ?? 0).subscribe(
            (res2) => {
              this.car.modelName = res2.modelName;
              this.car.brandID = res2.brandID;

              this.brandService.getById(this.car.brandID ?? 0).subscribe(
                (res3) => {
                  this.car.brandName = res3.name;
                }
              )
            }
          )
        }
      }
    )
  }


  public receiveStatus(status: boolean): void{
    this.isFavorite = status;
  }
}
