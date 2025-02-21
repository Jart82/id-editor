import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JagarinVariablesComponent } from './jagarin-variables.component';

describe('JagarinVariablesComponent', () => {
  let component: JagarinVariablesComponent;
  let fixture: ComponentFixture<JagarinVariablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JagarinVariablesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JagarinVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
