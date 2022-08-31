import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-management',
  templateUrl: './brand-management.component.html',
  styleUrls: ['./brand-management.component.css']
})
export class BrandManagementComponent implements OnInit {
  
  public brandForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    dateFounded: new FormControl(''),
  });

  constructor(
    private brandService: BrandService
  ) { }

  ngOnInit(): void {
  }

  get name(): AbstractControl {
    return this.brandForm.get('name')!;
  }
  get dateFounded(): AbstractControl {
    return this.brandForm.get('dateFounded')!;
  }

  addBrand(){
    this.brandService.addBrand({
      "name": this.name.value,
      "dateFounded": this.dateFounded.value,
    }).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
