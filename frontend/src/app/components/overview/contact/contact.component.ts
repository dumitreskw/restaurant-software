import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { MessageService } from 'primeng/api';
import { TicketService } from '../../../services/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private messageService: MessageService,
    private ticketService: TicketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  get subjectControl() {
    return this.form.controls['subject'] as FormControl;
  }

  get textControl() {
    return this.form.controls['text'] as FormControl;
  }

  private buildForm(): void {
    this.form = new FormGroup({
      subject: new FormControl('', Validators.required),
      text: new FormControl('', Validators.required),
    });
  }

  public sendTicket(): void {
    let ticket: any;
    if (this.subjectControl.valid && this.textControl.valid) {
      this.ticketService
        .createTicket(this.subjectControl.value, this.textControl.value)
        .subscribe({
          next: (res) => (ticket = res),
          complete: () =>{
            this.showConfirmation(
              `Ticket ${ticket._id} was created successfully`
            );
            this.router.navigateByUrl('/my-tickets');
          },
          error: (err) => {
            console.error(err);
            this.showError(
              "Couldn't create the ticket. Please try again later."
            );
          },
        });
    } else {
      this.showError('All fields are required.');
    }
  }

  showConfirmation(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }
}
