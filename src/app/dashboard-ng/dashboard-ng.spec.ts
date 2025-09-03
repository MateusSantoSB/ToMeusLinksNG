import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNg } from './dashboard-ng';

describe('DashboardNg', () => {
  let component: DashboardNg;
  let fixture: ComponentFixture<DashboardNg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardNg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardNg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
