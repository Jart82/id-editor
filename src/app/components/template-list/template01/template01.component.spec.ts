import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Template01Component } from './template01.component';

describe('Template01Component', () => {
  let component: Template01Component;
  let fixture: ComponentFixture<Template01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Template01Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Template01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
