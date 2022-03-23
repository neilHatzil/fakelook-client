import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPostComponent } from './map-post.component';

describe('MapPostComponent', () => {
  let component: MapPostComponent;
  let fixture: ComponentFixture<MapPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
