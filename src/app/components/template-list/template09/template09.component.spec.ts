import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Template09Component } from './template09.component';

describe('Template09Component', () => {
  let component: Template09Component;
  let fixture: ComponentFixture<Template09Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Template09Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Template09Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
