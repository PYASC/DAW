import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Brand } from 'src/app/interfaces/brand';
import { BrandService } from 'src/app/services/brand.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  
  @Input() brandId!: number;
  @Output() favoriteStatus = new EventEmitter<boolean>();

  private isFavorite:boolean = false;
  public icon:String = "star_border";
  public brand:Brand = {
    id: 0,
  };
  
  constructor(
    private brandService: BrandService,
    private dataService: DataService,
  ) {
    
  }

  ngOnInit(): void {
    var favoriteBrand = this.dataService.currentFavoriteBrand.getValue();
    this.isFavorite = this.brandId === favoriteBrand;
    this.icon = this.isFavorite ? "star" : "star_border";
    this.favoriteStatus.emit(this.isFavorite);

    this.brandService.getById(this.brandId).subscribe(
      (brand) => {
        this.brand = brand;
      }
    )
  }

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    this.icon = this.isFavorite ? "star" : "star_border";
    this.favoriteStatus.emit(this.isFavorite);
   
    this.dataService.changeFavoriteBrand(this.isFavorite ? this.brandId : 0);
  }

}
