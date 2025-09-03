import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterNg } from './footer-ng';

describe('FooterNg', () => {
  let component: FooterNg;
  let fixture: ComponentFixture<FooterNg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterNg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterNg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
