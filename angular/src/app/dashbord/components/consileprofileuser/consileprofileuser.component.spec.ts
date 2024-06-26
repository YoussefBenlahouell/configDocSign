import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsileprofileuserComponent } from './consileprofileuser.component';

describe('ConsileprofileuserComponent', () => {
  let component: ConsileprofileuserComponent;
  let fixture: ComponentFixture<ConsileprofileuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsileprofileuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsileprofileuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
