import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutModuleComponent } from './ajout-module.component';

describe('AjoutModuleComponent', () => {
  let component: AjoutModuleComponent;
  let fixture: ComponentFixture<AjoutModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
