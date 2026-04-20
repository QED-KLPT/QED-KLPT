import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptComponent  } from './transcript';

describe('TranscriptComponent ', () => {
  let component: TranscriptComponent ;
  let fixture: ComponentFixture<TranscriptComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranscriptComponent ],
    }).compileComponents();

    fixture = TestBed.createComponent(TranscriptComponent );
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
