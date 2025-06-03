import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradableCitiesComponent } from './tradable-cities.component';

describe('TradableCitiesComponent', () => {
  let component: TradableCitiesComponent;
  let fixture: ComponentFixture<TradableCitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradableCitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradableCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
