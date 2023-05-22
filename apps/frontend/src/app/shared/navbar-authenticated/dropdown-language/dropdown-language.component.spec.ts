import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownLanguageComponent } from './dropdown-language.component';

describe('DropdownLanguageComponent', () => {
  let component: DropdownLanguageComponent;
  let fixture: ComponentFixture<DropdownLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownLanguageComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(DropdownLanguageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
