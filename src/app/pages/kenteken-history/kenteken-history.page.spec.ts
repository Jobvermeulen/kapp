import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KentekenHistoryPage } from './kenteken-history.page';

describe('KentekenHistoryPage', () => {
  let component: KentekenHistoryPage;
  let fixture: ComponentFixture<KentekenHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KentekenHistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KentekenHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
