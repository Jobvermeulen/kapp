import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchKentekensPage } from './search-kentekens.page';

describe('SearchKentekensPage', () => {
  let component: SearchKentekensPage;
  let fixture: ComponentFixture<SearchKentekensPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchKentekensPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchKentekensPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
