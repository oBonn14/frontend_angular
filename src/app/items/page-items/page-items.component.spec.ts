import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageItemsComponent } from './page-items.component';

describe('PageItemsComponent', () => {
  let component: PageItemsComponent;
  let fixture: ComponentFixture<PageItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
