import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UplodedocumentComponent } from './uplodedocument.component';

describe('UplodedocumentComponent', () => {
  let component: UplodedocumentComponent;
  let fixture: ComponentFixture<UplodedocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UplodedocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UplodedocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
