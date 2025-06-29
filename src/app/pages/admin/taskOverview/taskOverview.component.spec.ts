import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskOverviewComponent } from './taskOverview.component';

describe('TaskOverviewComponent', () => {
  let component: TaskOverviewComponent;
  let fixture: ComponentFixture<TaskOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
