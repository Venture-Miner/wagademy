import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SquadBannerComponent } from './squad-banner.component';

describe('SquadBannerComponent', () => {
  let component: SquadBannerComponent;
  let fixture: ComponentFixture<SquadBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SquadBannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SquadBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
