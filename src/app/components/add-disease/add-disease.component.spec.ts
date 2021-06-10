import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiseaseComponent } from './add-disease.component';

describe('AddDiseaseComponent', () => {
  let component: AddDiseaseComponent;
  let fixture: ComponentFixture<AddDiseaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDiseaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDiseaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
