import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilibiliComponent } from './bilibili.component';

describe('BilibiliComponent', () => {
  let component: BilibiliComponent;
  let fixture: ComponentFixture<BilibiliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BilibiliComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BilibiliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
