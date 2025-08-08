import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadappComponent } from './downloadapp.component';

describe('DownloadappComponent', () => {
  let component: DownloadappComponent;
  let fixture: ComponentFixture<DownloadappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadappComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
