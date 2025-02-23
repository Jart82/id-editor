import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Template07Component } from './template07.component';

describe('Template07Component', () => {
  let component: Template07Component;
  let fixture: ComponentFixture<Template07Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Template07Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Template07Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
