import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Client } from 'src/app/interfaces/client';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    age: new FormControl(''),
    exp: new FormControl(''),
  }); 


  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }


  signup(){
    if(this.signupForm.valid) {
      this.authService.signup(this.signupForm.value).subscribe(
        {
          next: (res: Client) => {
            console.log(res);
          },
          error: (error) => {
            console.error(error);
          }
        }
      )
    }
  }

}
