import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  public currentFavoriteBrand = new BehaviorSubject<number>(0);
  // asObservable
  constructor() { }

  public changeFavoriteBrand(id: number): void {
    this.currentFavoriteBrand.next(id);
  }
}
