import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadapkComponent } from './downloadapk.component';

describe('DownloadapkComponent', () => {
  let component: DownloadapkComponent;
  let fixture: ComponentFixture<DownloadapkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadapkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadapkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
