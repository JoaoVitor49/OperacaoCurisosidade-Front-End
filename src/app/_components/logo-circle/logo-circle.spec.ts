import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoCircle } from './logo-circle';

describe('LogoCircle', () => {
  let component: LogoCircle;
  let fixture: ComponentFixture<LogoCircle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoCircle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoCircle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
