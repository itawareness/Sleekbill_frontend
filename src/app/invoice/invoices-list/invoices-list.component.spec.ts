import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceListComponent } from './invoices-list.component';
import { CommonModule } from '@angular/common'; 

describe('InvoiceListComponent', () => {
  let component: InvoiceListComponent;
  let fixture:   ComponentFixture<InvoiceListComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceListComponent], 
      imports: [CommonModule] 
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
