import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RegistratonComponent } from './components/registration.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule
	],
	exports: [],
	declarations: [RegistratonComponent],
	providers: []
})
export class UsersModule { }
