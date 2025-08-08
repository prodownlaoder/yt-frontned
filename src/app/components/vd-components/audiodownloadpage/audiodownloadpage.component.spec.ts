import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiodownloadpageComponent } from './audiodownloadpage.component';

describe('AudiodownloadpageComponent', () => {
  let component: AudiodownloadpageComponent;
  let fixture: ComponentFixture<AudiodownloadpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudiodownloadpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudiodownloadpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
