import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Model } from '../interfaces/model';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  public url = 'https://localhost:44385/api/Model';
  
  constructor(
    private httpClient: HttpClient,
  ) { }

  getAll(): Observable<Model[]>{
    return this.httpClient.get<Model[]>(`${this.url}/get_all`);
  }
  
  getAllByBrand(brandId: number): Observable<Model[]>{
    return this.httpClient.get<Model[]>(`${this.url}/get_by_brand/${brandId}`);
  }

  getById(id: number): Observable<Model>{
    return this.httpClient.get<Model>(`${this.url}/get_by_id/${id}`);
  }

  addModel(model: Model){
    const httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8'),
    };
    return this.httpClient.post(`${this.url}/add_model`, model, httpOptions)
  }
}
