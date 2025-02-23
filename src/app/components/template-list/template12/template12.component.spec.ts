import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Template12Component } from './template12.component';

describe('Template12Component', () => {
  let component: Template12Component;
  let fixture: ComponentFixture<Template12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Template12Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Template12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
