import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesignatureComponent } from './typesignature.component';

describe('TypesignatureComponent', () => {
  let component: TypesignatureComponent;
  let fixture: ComponentFixture<TypesignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypesignatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
