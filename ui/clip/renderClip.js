import { headerMsgNotify } from "../nodes/headerMsg.js";
import { createDeleteBtn, createEditBtn } from "../nodes/commonNodes.js";
import { setupBtns } from "./setupBtns.js";
import { clipArea } from "../nodes/globalNodes.js";


function renderClip(id, text) {
	const clip = document.createElement("div");
	clip.classList.add("clip");

	// display the text
	const para = document.createElement("p");
	para.textContent = text;
	para.id = id;
	clip.appendChild(para);
	
	// util button area
	const btnArea = document.createElement("div");
	btnArea.classList.add("btn-area");
	clip.appendChild(btnArea);

	// util buttons
	const editBtn = createEditBtn();
	const deleteBtn = createDeleteBtn();
	btnArea.append(editBtn, deleteBtn);
	
	setupBtns(id, clip);

	clip.addEventListener("mouseenter", (e) => {
		e.stopPropagation();

		editBtn.classList.remove("hidden");
		deleteBtn.classList.remove("hidden");
	});

	clip.addEventListener("mouseleave", (e) => {
		e.stopPropagation();

		editBtn.classList.add("hidden");
		deleteBtn.classList.add("hidden");
	});

	clip.addEventListener("click", (e) => {
		e.stopPropagation();
		
		const text = para.textContent;
		try {
			navigator.clipboard.writeText(text);
		} catch (error) {
			headerMsgNotify.notify("Failed to copy!");
		}

		headerMsgNotify.notify("Copied!");
	});

	clipArea.append(clip);
}

export {
	renderClip,
}