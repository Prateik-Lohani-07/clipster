export class Clip {
	private id: number;
	private content: string;
	private color?: string;

	constructor(id: number, content: string, color?: string) {
		this.id = id;
		this.content = content;
		this.color = color;
	}

	public getId(): number {
		return this.id;
	}

	public getContent(): string {
		return this.content;
	}

	public getColor(): string | undefined {
		return this.color;
	}

	public setId(id: number) {
		this.id = id;
	}

	public setContent(content: string) {
		this.content = content;
	}
	public setColor(color: string) {
		this.color = color;
	}
};