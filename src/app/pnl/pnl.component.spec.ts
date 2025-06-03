import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PNLComponent } from './pnl.component';

describe('PNLComponent', () => {
  let component: PNLComponent;
  let fixture: ComponentFixture<PNLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PNLComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PNLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
