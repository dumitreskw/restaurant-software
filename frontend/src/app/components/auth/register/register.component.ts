import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { RegisterModel } from '../../../models/auth';
import { AuthenticationService } from '../../../services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    cPassword: new FormControl('', [Validators.required])
  })

  constructor(private authService: AuthenticationService,
    private snackbar: MatSnackBar,
    private router: Router) {
    
  }

  get usernameControl() {
    return this.form.controls["username"];
  }

  get emailControl() {
    return this.form.controls["email"];
  }

  get passwordControl() {
    return this.form.controls["password"];
  }

  get cPasswordControl() {
    return this.form.controls["cPassword"];
  }

  get differentPasswords(): boolean {
    if(this.cPasswordControl.dirty && this.passwordControl.dirty) {
      return this.cPasswordControl.value != this.passwordControl.value;
    }
    return false;
  }

  register() {
    if(!this.differentPasswords && this.form.valid) {
      let registerRequest = new RegisterModel;
      registerRequest.password = this.cPasswordControl.value as string;
      registerRequest.name = this.usernameControl.value as string;
      registerRequest.email = this.emailControl.value as string;

      this.authService.register(registerRequest).subscribe(res => {
        if(res.success){
          this.snackbar.open(res.message);
          this.router.navigateByUrl('/verify');
        }
      })
    }
  }
}
