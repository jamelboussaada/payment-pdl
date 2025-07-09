import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InvoiceService } from '../../core/services/invoice.service';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NgxExtendedPdfViewerModule, NavbarComponent, FooterComponent],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css'
})
export class InvoicesComponent implements OnInit {
  invoices: string[] = [];
  selectedPdfSrc: string | null = null;

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe(
      (data: string[]) => {
        console.log(data);
        this.invoices = data;
      },
      (error) => {
        console.error('Error fetching invoices', error);
      }
    );
  }

  viewPdf(pdfPath: string): void {
    const fileName = this.getFileName(pdfPath);
    this.selectedPdfSrc = '/invoices/' + fileName;
    console.log('Selected PDF Source:', this.selectedPdfSrc);
    console.log(pdfPath);
  }

  getFileName(path: string): string {
    return path.substring(path.lastIndexOf('/') + 1);
  }
}
