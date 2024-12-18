import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditNoteFormComponent } from './credit-note.component';

describe('CreditNoteComponent', () => {
  let component: CreditNoteFormComponent;
  let fixture: ComponentFixture<CreditNoteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditNoteFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditNoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
