import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddressService } from '../../../services/address.service';
import { CreateAddressRequest } from '../../../models/requests/create-address';
import { NgEventBus } from 'ng-event-bus';
import { EVENT_NAME } from '../../../constants/event-names';

@Component({
  selector: 'app-address-modal',
  templateUrl: './address-modal.component.html',
  styleUrl: './address-modal.component.scss'
})
export class AddressModalComponent implements OnInit {
  form!: FormGroup;


  constructor(private addressService: AddressService,
    private eventBus: NgEventBus) {
    
  }

  ngOnInit() {
    this.buildForm();
  }

  get nameControl() {
    return this.form.controls['name'] as FormControl;
  }

  get phoneNumberControl() {
    return this.form.controls['phoneNumber'] as FormControl;
  }

  get cityControl() {
    return this.form.controls['city'] as FormControl;
  }

  get addressLine1Control() {
    return this.form.controls['addressLine1'] as FormControl;
  }

  get addressLine2Control() {
    return this.form.controls['addressLine2'] as FormControl;
  }

  addAddress(): void {
    if(this.form.valid) {
      const request = this.buildRequest();
      let res: any;

      this.addressService.addAddress(request).subscribe({
        complete: () => this.eventBus.cast(EVENT_NAME.ADD_ADDRESS),
        error: (error) => console.error(error)
      })
    }
  }

  private buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      addressLine1: new FormControl('', Validators.required),
      addressLine2: new FormControl(''),
    });
  }

  private buildRequest(): CreateAddressRequest {
    let request = new CreateAddressRequest();
    request.contactPerson = this.nameControl.value;
    request.phoneNumber = this.phoneNumberControl.value;
    request.city = this.cityControl.value;
    request.addressLine1 = this.addressLine1Control.value;
    request.addressLine2 = this.addressLine2Control.value;

    return request;
  }
}
