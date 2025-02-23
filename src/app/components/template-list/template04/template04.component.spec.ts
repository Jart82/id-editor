import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Template04Component } from './template04.component';

describe('Template04Component', () => {
  let component: Template04Component;
  let fixture: ComponentFixture<Template04Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Template04Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Template04Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
