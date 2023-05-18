import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasOfInterestComponent } from './areas-of-interest.component';

describe('AreasOfInterestComponent', () => {
  let component: AreasOfInterestComponent;
  let fixture: ComponentFixture<AreasOfInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreasOfInterestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreasOfInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
