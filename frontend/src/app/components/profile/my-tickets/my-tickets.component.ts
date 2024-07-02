import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../services/ticket.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ViewTicketModalComponent } from '../../common/view-ticket-modal/view-ticket-modal.component';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrl: './my-tickets.component.scss',
})
export class MyTicketsComponent implements OnInit {
  tickets: any[] = [];
  first = 0;
  rows = 10;
  isLoading: boolean = false;
  constructor(
    private ticketService: TicketService,
    private messageService: MessageService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTickets();
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return this.tickets ? this.first >= this.tickets.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.tickets ? this.first === 0 : true;
  }

  getStatusSeverity(status: string): 'success' | 'warning' {
    return status != 'pending' ? 'success' : 'warning';
  }

  onAddTicket() {
    this.router.navigateByUrl('/support');
  }

  onCompleteTicket(ticketId: string) {
    this.isLoading = true;

    this.ticketService.updateStatus(ticketId, 'resolved').subscribe({
      next: (res) => {
        let ticket = this.tickets.find((t) => t._id === res._id);
        ticket = res;
      },
      complete: () => {
        this.showConfirmation('Ticket is now marked as completed.');
        this.getTickets();
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.showError('There was an error, please try again layer.');
      },
    });
  }

  onViewTicket(ticketId: string) {
    const ticket = this.tickets.find(t => t._id == ticketId)
    this.dialog.open(ViewTicketModalComponent, {
      data: {
        ticket: ticket,
      },
    });
  }

  private getTickets(): void {
    this.isLoading = true;
    this.ticketService.getTickets().subscribe({
      next: (res) => (this.tickets = res),
      complete: () => {
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.showError(
          'There was an error trying to load the tickets. Please try again later.'
        );
      },
    });
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
