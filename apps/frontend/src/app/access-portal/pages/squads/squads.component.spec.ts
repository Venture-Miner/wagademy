import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadsComponent } from './squads.component';
import { HttpClientModule } from '@angular/common/http';

describe('SquadsComponent', () => {
  let component: SquadsComponent;
  let fixture: ComponentFixture<SquadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SquadsComponent],
      imports: [HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SquadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
