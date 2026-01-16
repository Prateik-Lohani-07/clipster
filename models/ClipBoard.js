import { sanitizeText } from "../utils/sanitize.js";

class ClipBoard {
	static latestId = undefined;
	static allClips = undefined;
	static CLIPSTER_KEY = "CLIPSTER";

	static checkText(text) {
		if (text.trim() == "") {
			throw new Error("Enter some text!");
		}
		const sanitizedText = sanitizeText(text);
		return sanitizedText;
	}

	static storeClips() {
		localStorage.setItem(
			this.CLIPSTER_KEY, 
			JSON.stringify({ latest_id: this.latestId, clips: this.allClips })
		);
	}
	
	static loadDataFromLocalStorage() {
		const data = JSON.parse(localStorage.getItem(this.CLIPSTER_KEY));
		if (!data) return [undefined, undefined];

		try {
			const clips = data?.clips;
			const latestId = data?.latest_id;
			return [latestId, clips];
		} catch (error) {
			return [undefined, undefined];
		}
	}

	static addClip(text) {
		try {
			const sanitizedText = this.checkText(text);
			const storedId = this.latestId;
	
			this.allClips[this.latestId] = sanitizedText;
			this.latestId++;
	
			this.storeClips();
			return storedId;

		} catch (error) {
			throw error;
		}
	}
	
	static editClip(id, text) {
		try {
			const sanitizedText = this.checkText(text);
	
			this.allClips[id] = sanitizedText;
			this.storeClips();

		} catch (error) {
			throw error;
		}
	}
	
	static removeClip(id) {
		delete this.allClips[id];
		this.storeClips();
	}

	static loadClipsIfAny() {
		let [latestId, allClips] = this.loadDataFromLocalStorage();
		this.allClips = allClips || {};
		this.latestId = latestId || 1;
	}
}

export {
	ClipBoard,
};