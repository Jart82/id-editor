import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Template14Component } from './template14.component';

describe('Template14Component', () => {
  let component: Template14Component;
  let fixture: ComponentFixture<Template14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Template14Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Template14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
