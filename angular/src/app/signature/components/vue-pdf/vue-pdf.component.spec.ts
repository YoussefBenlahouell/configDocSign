import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VuePdfComponent } from './vue-pdf.component';

describe('VuePdfComponent', () => {
  let component: VuePdfComponent;
  let fixture: ComponentFixture<VuePdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VuePdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VuePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
