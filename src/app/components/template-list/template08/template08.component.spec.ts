import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Template08Component } from './template08.component';

describe('Template08Component', () => {
  let component: Template08Component;
  let fixture: ComponentFixture<Template08Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Template08Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Template08Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
