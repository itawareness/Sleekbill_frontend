import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  DebitNoteFormComponent } from './debit-note.component';

describe('DebitNoteComponent', () => {
  let component: DebitNoteFormComponent;
  let fixture: ComponentFixture<DebitNoteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebitNoteFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebitNoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
