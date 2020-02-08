import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KentekenSearchBarComponent } from './kenteken-search-bar.component';

describe('KentekenSearchBarComponent', () => {
  let component: KentekenSearchBarComponent;
  let fixture: ComponentFixture<KentekenSearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KentekenSearchBarComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KentekenSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
