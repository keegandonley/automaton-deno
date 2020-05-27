export interface IOutputOptions {
	silent?: boolean;
}

export default class Output {
	private silent = false;

	constructor(options?: IOutputOptions) {
		this.silent = options?.silent ?? false;
	}

	public print = (message?: string) => {
		if (!this.silent) {
			console.log(message);
		}
	}
}

export class AutomatonOutput extends Output {
	private emojis = {
		success: '🎉',
		failure: '👻'
	}

	public success = () => {
		this.print(`${this.emojis.success} Your input was accepted!`);
	}

	public failure = () => {
		this.print(`${this.emojis.failure} Your input was rejected`);
	}

	public printResult = (success?: boolean) => {
		if (success) {
			this.success();
		} else {
			this.failure();
		}
	}
}