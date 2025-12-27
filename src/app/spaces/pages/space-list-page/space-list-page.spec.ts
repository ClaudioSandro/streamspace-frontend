import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceListPage } from './space-list-page';

describe('SpaceListPage', () => {
  let component: SpaceListPage;
  let fixture: ComponentFixture<SpaceListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaceListPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceListPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
