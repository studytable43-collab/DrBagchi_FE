import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedquizComponent } from './submittedquiz.component';

describe('SubmittedquizComponent', () => {
  let component: SubmittedquizComponent;
  let fixture: ComponentFixture<SubmittedquizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubmittedquizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmittedquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
