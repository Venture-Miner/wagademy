import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GptListComponent } from './gpt-list.component';

describe('GptListComponent', () => {
  let component: GptListComponent;
  let fixture: ComponentFixture<GptListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GptListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GptListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
