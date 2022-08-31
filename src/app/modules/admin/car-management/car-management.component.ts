import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { CarsService } from 'src/app/services/cars.service';
import { ModelService } from 'src/app/services/model.service';
import { Model } from 'src/app/interfaces/model';

@Component({
  selector: 'app-car-management',
  templateUrl: './car-management.component.html',
  styleUrls: ['./car-management.component.css']
})
export class CarManagementComponent implements OnInit {
  public carForm: FormGroup = new FormGroup({
    licensePlate: new FormControl(''),
    price: new FormControl(''),
  });
  public models: Model[] = [];
  public selectedModel:number = 0;

  constructor(
    private carService: CarsService,
    private modelService: ModelService
  ) { }

  ngOnInit(): void {
    this.modelService.getAll().subscribe({
      next: (res) => {
        console.log(res);
        this.models = res;
      }
    })
  }
  
  get licensePlate(): AbstractControl {
    return this.carForm.get('licensePlate')!;
  }
  get price(): AbstractControl {
    return this.carForm.get('price')!;
  }

  addCar(){
    this.carService.addCar({
      "licensePlate": this.licensePlate.value,
      "rentPricePerDay": parseInt(this.price.value),
      "modelID": this.selectedModel,
    }).subscribe({
      next: (res) => {
        console.log(res)
      }
    })
  }
}
