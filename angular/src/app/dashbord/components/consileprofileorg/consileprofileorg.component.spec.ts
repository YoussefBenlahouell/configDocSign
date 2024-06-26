import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsileprofileorgComponent } from './consileprofileorg.component';

describe('ConsileprofileorgComponent', () => {
  let component: ConsileprofileorgComponent;
  let fixture: ComponentFixture<ConsileprofileorgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsileprofileorgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsileprofileorgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
