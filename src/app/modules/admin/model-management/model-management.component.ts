import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Brand } from 'src/app/interfaces/brand';
import { BrandService } from 'src/app/services/brand.service';
import { ModelService } from 'src/app/services/model.service';

@Component({
  selector: 'app-model-management',
  templateUrl: './model-management.component.html',
  styleUrls: ['./model-management.component.css']
})
export class ModelManagementComponent implements OnInit {
  public modelForm: FormGroup = new FormGroup({
    name: new FormControl(''),
  });
  public selectedBrand: number = 0;
  public brands: Brand[] = [];
  constructor(
    private modelService: ModelService,
    private brandService: BrandService
  ) { }

  ngOnInit(): void {
    this.brandService.getAll().subscribe({
      next: (res) => {
        this.brands = res;
        console.log(res);
      }
    })
  }

  get name(): AbstractControl {
    return this.modelForm.get('name')!;
  }

  addModel(){
    this.modelService.addModel({
      "modelName": this.name.value,
      "brandID": this.selectedBrand,
    }).subscribe({
      next: (res) => {
        console.log(res)
      }
    })
  }

}
