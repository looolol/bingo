import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsManagerComponent } from './options-manager.component';

describe('OptionsManagerComponent', () => {
  let component: OptionsManagerComponent;
  let fixture: ComponentFixture<OptionsManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionsManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
