import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SignuptestComponent } from "./signuptest.component";

describe("SignuptestComponent", () => {
  let component: SignuptestComponent;
  let fixture: ComponentFixture<SignuptestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignuptestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignuptestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
