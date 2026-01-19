import type { Clip } from "../models/Clip";

export interface ClipsterData {
	latestId: number;
	clips: Clip[];
}