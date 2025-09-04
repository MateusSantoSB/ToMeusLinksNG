import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusLinks } from './meus-links';

describe('MeusLinks', () => {
  let component: MeusLinks;
  let fixture: ComponentFixture<MeusLinks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeusLinks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeusLinks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
