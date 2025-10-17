import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoRectangle } from './logo-rectangle';

describe('LogoRectangle', () => {
  let component: LogoRectangle;
  let fixture: ComponentFixture<LogoRectangle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoRectangle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoRectangle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
