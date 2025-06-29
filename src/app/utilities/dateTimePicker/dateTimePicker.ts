import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'ngbd-datepicker-multiple',
	imports: [NgbDatepickerModule, FormsModule],
	templateUrl: './dateTimePicker.component.html',
	styles: `
		select.form-select {
			margin: 0.5rem 0.5rem 0 0;
			width: auto;
		}
	`,
})
export class NgbdDatepickerMultiple {
	displayMonths = 2;
	navigation = 'select';
	showWeekNumbers = false;
	outsideDays = 'visible';
}