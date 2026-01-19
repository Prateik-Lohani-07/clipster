import type { ClipsterData } from "../context/ClipsterData";
import { Clip } from "../models/Clip";

export type Action = 
	| { type: 'add', clip: Clip }
	| { type: 'edit', id: number, content?: string, color?: string }
	| { type: 'delete', id: number }
	| { type: 'set', data: ClipsterData }

export function clipReducer(state: ClipsterData, action: Action): ClipsterData {
	switch(action.type) {
		case 'set': {
			return action.data;
		}
		case 'add': {
			return {
				latestId: state.latestId + 1,
				clips: [...state.clips, action.clip],
			};
		}
		case 'edit': {
			const newClips = state.clips.map(clip => {
				if (clip.getId() === action.id) {
					const editedClip = new Clip(
						clip.getId(), 
						action.content ?? clip.getContent(), 
						action.color ?? clip.getColor()
					);

					return editedClip;
				}

				return clip;
			});

			return {
				...state,
				clips: newClips,
			};
		}
		case 'delete': {
			const newClips = state.clips.filter(clip => clip.getId() !== action.id);

			return {
				...state,
				clips: newClips,
			};
		}
		default: {
			throw new Error("Undefined action type!");
		}
	}
}