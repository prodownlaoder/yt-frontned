import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RumbleComponent } from './rumble.component';

describe('RumbleComponent', () => {
  let component: RumbleComponent;
  let fixture: ComponentFixture<RumbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RumbleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RumbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
