import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumesTogglerComponent } from './resumes-toggler.component';
import { By } from '@angular/platform-browser';

describe('ResumesTogglerComponent', () => {
  let component: ResumesTogglerComponent;
  let fixture: ComponentFixture<ResumesTogglerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResumesTogglerComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ResumesTogglerComponent);
    component = fixture.componentInstance;
  });

  it('should create the component resumes toggler', () => {
    expect(component).toBeTruthy();
  });

  it('should call changeSelectedBlock() for students', () => {
    const changeSelectedBlock = jest.spyOn(component, 'changeSelectedBlock');
    const changeSelectedBlockButton = fixture.debugElement.query(
      By.css('#change-selected-block-students')
    );
    changeSelectedBlockButton.nativeElement.click();
    expect(changeSelectedBlock).toHaveBeenCalledTimes(1);
  });

  it('should call changeSelectedBlock() for squads', () => {
    const changeSelectedBlock = jest.spyOn(component, 'changeSelectedBlock');
    const changeSelectedBlockButton = fixture.debugElement.query(
      By.css('#change-selected-block-squads')
    );
    changeSelectedBlockButton.nativeElement.click();
    expect(changeSelectedBlock).toHaveBeenCalledTimes(1);
  });
});
