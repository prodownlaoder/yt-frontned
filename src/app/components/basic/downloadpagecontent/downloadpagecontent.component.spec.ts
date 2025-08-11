import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadpagecontentComponent } from './downloadpagecontent.component';

describe('DownloadpagecontentComponent', () => {
  let component: DownloadpagecontentComponent;
  let fixture: ComponentFixture<DownloadpagecontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadpagecontentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadpagecontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
