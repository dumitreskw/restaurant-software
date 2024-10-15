import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TicketService } from '../../../services/ticket.service';

@Component({
  selector: 'app-view-ticket-modal',
  templateUrl: './view-ticket-modal.component.html',
  styleUrl: './view-ticket-modal.component.scss',
})
export class ViewTicketModalComponent implements OnInit {
  ticket: any;
  formGroup!: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private ticketService: TicketService) {}

  ngOnInit() {
    this.ticket = this.data.ticket
    this.formGroup = new FormGroup({
      comment: new FormControl('', Validators.required),
    })
  }

  get commentControl() {
    return this.formGroup.controls["comment"];
  }

  onAddComment() {
    if(this.commentControl.value) {
      this.ticketService.addMessage(this.ticket._id, this.commentControl.value).subscribe({
        next: (res) => this.ticket = res,
        complete: () => this.commentControl.reset(),
        error: (err) => console.error(err)
      })
    }
  }
}
