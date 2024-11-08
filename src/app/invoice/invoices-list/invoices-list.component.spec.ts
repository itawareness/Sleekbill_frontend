import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceListComponent } from './invoices-list.component';
import { CommonModule } from '@angular/common'; // Import CommonModule for common directives

describe('InvoiceListComponent', () => {
  let component: InvoiceListComponent;
  let fixture:   ComponentFixture<InvoiceListComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceListComponent], // Declare the component here
      imports: [CommonModule] // Import CommonModule for directives like ngIf, ngFor, etc.
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
