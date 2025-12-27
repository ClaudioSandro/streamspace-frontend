import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceCreatePage } from './space-create-page';

describe('SpaceCreatePage', () => {
  let component: SpaceCreatePage;
  let fixture: ComponentFixture<SpaceCreatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaceCreatePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceCreatePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
