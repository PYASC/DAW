import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../interfaces/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  public url = 'https://localhost:44385/api/Brand';
  
  constructor(
    private httpClient: HttpClient,
  ) { }

  getAll(): Observable<Brand[]>{
    return this.httpClient.get<Brand[]>(`${this.url}/get_all`);
  }

  getById(id: number): Observable<Brand>{
    return this.httpClient.get<Brand>(`${this.url}/get_by_id/${id}`);
  }

  addBrand(brand: Brand) {
    const httpOptions = {
      headers: new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8'),
    };
    return this.httpClient.post(`${this.url}/add_brand`, brand, httpOptions);
  }

}
