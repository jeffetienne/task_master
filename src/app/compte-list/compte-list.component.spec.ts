import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteListComponent } from './compte-list.component';

describe('CompteListComponent', () => {
  let component: CompteListComponent;
  let fixture: ComponentFixture<CompteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
