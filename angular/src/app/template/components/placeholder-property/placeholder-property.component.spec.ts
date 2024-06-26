import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceholderPropertyComponent } from './placeholder-property.component';

describe('PlaceholderPropertyComponent', () => {
  let component: PlaceholderPropertyComponent;
  let fixture: ComponentFixture<PlaceholderPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceholderPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceholderPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
