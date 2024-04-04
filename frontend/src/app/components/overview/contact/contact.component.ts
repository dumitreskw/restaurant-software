import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  form!: FormGroup;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  get emailControl() {
    return this.form.controls['email'] as FormControl;
  }

  get subjectControl() {
    return this.form.controls['subject'] as FormControl;
  }

  get textControl() {
    return this.form.controls['text'] as FormControl;
  }

  private buildForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      subject: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required),
    });

    if(this.authService.isAuthenticated()) {
      this.emailControl.disable();
      this.emailControl.setValue('test@test.com');
    }
  }
}
