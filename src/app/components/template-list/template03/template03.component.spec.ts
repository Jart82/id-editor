import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Template03Component } from './template03.component';

describe('Template03Component', () => {
  let component: Template03Component;
  let fixture: ComponentFixture<Template03Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Template03Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Template03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
