import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionOrgComponent } from './gestion-org.component';

describe('GestionOrgComponent', () => {
  let component: GestionOrgComponent;
  let fixture: ComponentFixture<GestionOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionOrgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
