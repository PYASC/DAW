import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Client } from '../interfaces/client';
import { Car } from '../interfaces/car';
import { Model } from '../interfaces/model';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  public url = 'https://localhost:44385/api/Car';
  
  constructor(
    private httpClient: HttpClient
  ) { }


  getAll(): Observable<Car[]>{
    return this.httpClient.get<Car[]>(`${this.url}/get_all`);
  }
  getAvailableCars(): Observable<Car[]>{
    return this.httpClient.get<Car[]>(`${this.url}/get_available_cars`);
  }
  getById(id: number): Observable<Car>{
    return this.httpClient.get<Car>(`${this.url}/get_by_id/${id}`);
  }
  getByModelId(modelId: number): Observable<Car[]>{
    return this.httpClient.get<Car[]>(`${this.url}/get_by_model_id/${modelId}`);
  }

  getByBrandId(brandId: number): Observable<Car[]>{
    var allCars: Car[] = [];
    this.httpClient.get<Model[]>(`https://localhost:44385/api/Model/get_by_brand/${brandId}`).subscribe(
      {
        next: (models) => {
          for(let i=0; i<models.length; i++){
            this.getByModelId(models[i].id ?? 0).subscribe(
              {
                next: (cars) => {
                  allCars = allCars.concat(cars);
                }
              }
            )
          }
        }
      }
    );
    return of(allCars);
  }


  addCar(car: Car){
    return this.httpClient.post(`${this.url}/add_car`, {
      "licensePlate": car.licensePlate ?? "",
      "modelId": car.modelID ?? 0,
      "rentPricePerDay": car.rentPricePerDay ?? 50,
    }, 
    {
      headers: new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8'),
    })
  }

  updateCarStatus(car: Car, status: boolean){
    if(car.id)
      return this.httpClient.post(`${this.url}/update_car`, {
        "id": car.id ?? 0,
        "available": status,
        "licensePlate": car.licensePlate ?? "",
        "modelId": car.modelID ?? 0,
        "rentPricePerDay": car.rentPricePerDay ?? 50,
      });
    else
      return of({"id": 0, "status": false})
  }

  deleteCar(id: number){
    return this.httpClient.delete(`${this.url}/delete_car/${id}`);
  }

}
