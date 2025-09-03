import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeNg } from './home-ng';

describe('HomeNg', () => {
  let component: HomeNg;
  let fixture: ComponentFixture<HomeNg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeNg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeNg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
