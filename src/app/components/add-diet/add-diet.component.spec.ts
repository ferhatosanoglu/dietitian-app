import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDietComponent } from './add-diet.component';

describe('AddDietComponent', () => {
  let component: AddDietComponent;
  let fixture: ComponentFixture<AddDietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDietComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
