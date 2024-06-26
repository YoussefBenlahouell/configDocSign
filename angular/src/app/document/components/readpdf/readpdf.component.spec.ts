import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadpdfComponent } from './readpdf.component';

describe('ReadpdfComponent', () => {
  let component: ReadpdfComponent;
  let fixture: ComponentFixture<ReadpdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadpdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
