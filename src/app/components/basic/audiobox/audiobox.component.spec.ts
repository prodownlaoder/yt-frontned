import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioboxComponent } from './audiobox.component';

describe('AudioboxComponent', () => {
  let component: AudioboxComponent;
  let fixture: ComponentFixture<AudioboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
