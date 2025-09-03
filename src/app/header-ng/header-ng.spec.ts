import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNg } from './header-ng';

describe('HeaderNg', () => {
  let component: HeaderNg;
  let fixture: ComponentFixture<HeaderNg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderNg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderNg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
