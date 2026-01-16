import "./ui/nodes/commonNodes.js";
import "./ui/nodes/globalNodes.js"; 
import "./ui/nodes/dialog.js"; 
import { ClipBoard } from "./models/ClipBoard.js"; 
import { renderClip } from "./ui/clip/renderClip.js";

ClipBoard.loadClipsIfAny();
(function() {
	const clips = ClipBoard.allClips;
	
	if (Object.keys(clips).length === 0) {
		// display some empty message or vector
	}
	else {
		for (const id in clips) {
			const text = clips[id];
			renderClip(id, text);
		}
	}
})()