import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [DatePickerComponent],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [DatePickerComponent],
})
export class ReservationModule {}
