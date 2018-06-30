export abstract class Utils {
	static clone(value: any): any {
		return JSON.parse(JSON.stringify(value));
	}

	static prune(value: any) {
		if (value && typeof value === 'object') {
			if (value.constructor === Array) {
				for (let i = 0; i < value.length; i++) {
					this.prune(value[i]);
				}
			} else {
				for (const key of Object.keys(value)) {
					if (value[key] && typeof value[key] === 'object') {
						if (value[key].constructor !== Array && value[key + 'Id']) {
							value[key] = null;
						} else { this.prune(value[key]); }
					}
				}
			}
		}
	}
}
