import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent {
	currentDate: Date;

	constructor() {
		this.currentDate = new Date();
	}
}
