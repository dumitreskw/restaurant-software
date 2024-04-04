import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-token-verify',
  templateUrl: './token-verify.component.html',
  styleUrl: './token-verify.component.scss'
})
export class TokenVerifyComponent {
  form = new FormGroup({
    token: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
  })

  constructor(private authService: AuthenticationService,
    private snackbar: MatSnackBar,
    private router: Router) {
    
  }

  get tokenControl(): FormControl {
    return this.form.controls['token'];
  }

  verify() {
    if(this.form.valid) {
      this.authService.verify(this.tokenControl.value).subscribe(res => {
        this.snackbar.open(res.message);
        if(res.success) {
          this.router.navigateByUrl('/')
        }
      }) 
    }
  }
}
