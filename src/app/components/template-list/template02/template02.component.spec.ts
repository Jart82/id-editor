import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Template02Component } from './template02.component';

describe('Template02Component', () => {
  let component: Template02Component;
  let fixture: ComponentFixture<Template02Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Template02Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Template02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
