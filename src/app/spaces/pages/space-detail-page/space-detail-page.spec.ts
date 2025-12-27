import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceDetailPage } from './space-detail-page';

describe('SpaceDetailPage', () => {
  let component: SpaceDetailPage;
  let fixture: ComponentFixture<SpaceDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaceDetailPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceDetailPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
