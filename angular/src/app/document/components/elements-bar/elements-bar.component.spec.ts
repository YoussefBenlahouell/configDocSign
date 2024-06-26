import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsBarComponent } from './elements-bar.component';

describe('ElementsBarComponent', () => {
  let component: ElementsBarComponent;
  let fixture: ComponentFixture<ElementsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementsBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
