import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/interfaces/client';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  
  constructor(
    private router: Router,
    private authService: AuthService,
    ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
  get email(): AbstractControl {
    return this.loginForm.get('email') ?? new FormControl('');
  }
  get password(): AbstractControl {
    return this.loginForm.get('password') ?? new FormControl('');
  }

  login() {
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe(
        (res: Client) => {
          console.log(res);
          console.log(res.roles);
          localStorage.setItem("token", res.accessToken as string);
          if(res.roles){
            if(res.roles.indexOf("admin") > -1)
              localStorage.setItem("role", "admin");
            else{
              if(res.roles.indexOf("client") > -1)
                localStorage.setItem("role", "client");
            }
          }
        }
      )
    }
  }

  goToSignup(){
    this.router.navigate(['login/signup']);
  }
}
