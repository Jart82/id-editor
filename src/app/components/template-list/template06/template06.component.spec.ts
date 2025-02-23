import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Template06Component } from './template06.component';

describe('Template06Component', () => {
  let component: Template06Component;
  let fixture: ComponentFixture<Template06Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Template06Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Template06Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
