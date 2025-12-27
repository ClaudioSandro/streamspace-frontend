import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceEditPage } from './space-edit-page';

describe('SpaceEditPage', () => {
  let component: SpaceEditPage;
  let fixture: ComponentFixture<SpaceEditPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaceEditPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceEditPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
