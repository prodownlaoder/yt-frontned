import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedditComponent } from './reddit.component';

describe('RedditComponent', () => {
  let component: RedditComponent;
  let fixture: ComponentFixture<RedditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
