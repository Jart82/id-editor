import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Template05Component } from './template05.component';

describe('Template05Component', () => {
  let component: Template05Component;
  let fixture: ComponentFixture<Template05Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Template05Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Template05Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
