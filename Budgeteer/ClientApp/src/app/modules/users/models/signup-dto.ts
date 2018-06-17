import { LoginDto } from './login-dto';

export class SignupDto extends LoginDto {
	name: string;

	// DEV ONLY
	constructor() {
		super();
		this.name = 'Aleks Angelov';
	}
}
