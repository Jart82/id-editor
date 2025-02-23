import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Template13Component } from './template13.component';

describe('Template13Component', () => {
  let component: Template13Component;
  let fixture: ComponentFixture<Template13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Template13Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Template13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
