export class LoginDto {
	email: string;
	password: string;

	// DEV ONLY
	constructor() {
		this.email = 'aleks_angelov@mail.com';
		this.password = 'Mastera1';
	}
}
