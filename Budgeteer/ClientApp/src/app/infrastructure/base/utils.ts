export abstract class Utils {
	static clone(object: any): any {
		return JSON.parse(JSON.stringify(object));
	}

	static prune(object: any) {
		if (object && typeof object === 'object') {
			if (Array.isArray(object)) {
				for (let i = 0; i < object.length; i++) {
					this.prune(object[i]);
				}
			} else {
				for (const key of Object.keys(object)) {
					if (object[key] && typeof object[key] === 'object') {
						if (object[key].constructor !== Array && object[key + 'Id']) {
							object[key] = null;
						} else { this.prune(object[key]); }
					}
				}
			}
		}
	}
}
