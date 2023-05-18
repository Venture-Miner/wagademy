import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('AddEmailModalComponent', () => {
  let component: AddEmailModalComponent;
  let fixture: ComponentFixture<AddEmailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEmailModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEmailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
