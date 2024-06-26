import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormForCertifComponent } from './form-for-certif.component';

describe('FormForCertifComponent', () => {
  let component: FormForCertifComponent;
  let fixture: ComponentFixture<FormForCertifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormForCertifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormForCertifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
