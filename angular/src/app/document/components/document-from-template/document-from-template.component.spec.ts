import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentFromTemplateComponent } from './document-from-template.component';

describe('DocumentFromTemplateComponent', () => {
  let component: DocumentFromTemplateComponent;
  let fixture: ComponentFixture<DocumentFromTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentFromTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentFromTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
