import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginModel } from '../../../models/auth';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  loginModel: LoginModel = new LoginModel();
  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  returnUrl!: string;


  constructor(private authService: AuthenticationService,
    private router: Router,
    private cookieService: CookieService) {
  }

  ngOnInit() {
    this.returnUrl = '/home';
    if(this.authService.isAuthenticated()){
      this.router.navigate([this.returnUrl]);
    }
  }

  get emailControl() {
    return this.form.controls["email"];
  }

  get passwordControl() {
    return this.form.controls["password"];
  }

  login(): void {
    if(this.form.invalid){
      return;
    }
    this.loginModel.email = this.form.controls["email"].value as string;
    this.loginModel.password = this.form.controls["password"].value as string;

    this.authService.login(this.loginModel).subscribe(res => {
      if(res.success) {
        this.router.navigate([this.returnUrl]);
      }
    });
  }
}
