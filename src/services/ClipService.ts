import { Clip } from "../models/Clip";
import { LOCAL_STORAGE_KEY } from "../utils/constants";
import { type ClipsterData } from "../context/ClipsterData";

export function storeClipsterData(data: ClipsterData) {
	const dataJson = JSON.stringify(data);
	localStorage.setItem(LOCAL_STORAGE_KEY, dataJson);
}

export function fetchClipsterData(): ClipsterData {
	let data = localStorage.getItem(LOCAL_STORAGE_KEY);
	const clipsterData: ClipsterData = { latestId: 1, clips: [] };

	if (!data) {
		return clipsterData;
	}

	const dataJson = JSON.parse(data);
	
	const latestId = dataJson.latestId || 1
	const clips = dataJson.clips 
		? dataJson.clips.map((clip: any) => new Clip(clip.id, clip.content, clip.color))
		: [];

	clipsterData.latestId = latestId;
	clipsterData.clips = clips;

	return clipsterData;
}