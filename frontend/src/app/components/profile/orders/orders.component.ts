import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../../services/invoice.service';

export interface Invoice {
  id: string;
  totalPrice: string;
  status: string;
  createdAt: string;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  invoices: any[] = []
  invoicesDataSource: Invoice[] = [];
  displayedColumns: string[] = ['id', 'totalPrice', 'status', 'createdAt'];
  constructor(private invoiceService: InvoiceService) {
    
  }
  
  ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe({
      next: (res) => this.invoices = res.invoices,
      complete: () => this.initializeDataSource(),
      error: (err) => console.error(err)
    })
  }

  private initializeDataSource() {

    this.invoices.forEach(i => {
      const invoice: Invoice = {
        id: i._id,
        totalPrice: i.totalPrice,
        status: i.status,
        createdAt: i.createdAt
      }
      this.invoicesDataSource.push(invoice)
    })

    console.log(this.invoicesDataSource)
  }

}
