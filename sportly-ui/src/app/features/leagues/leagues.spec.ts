import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaguesComponent } from './leagues';

describe('Leagues', () => {
  let component: LeaguesComponent;
  let fixture: ComponentFixture<LeaguesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaguesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaguesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});