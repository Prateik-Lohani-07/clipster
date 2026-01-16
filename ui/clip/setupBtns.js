import { ClipBoard } from "../../models/ClipBoard.js";
import { createEditCancelBtn, createEditSaveBtn, createTextArea } from "../nodes/commonNodes.js";

function setupBtns(id, clip) {
	setupEditBtn(id, clip);
	setupDeleteBtn(id, clip);
}

function setupEditBtn(id, clip) {
	const para = clip.childNodes[0];
	const btnArea = clip.childNodes[1];
	const editBtn = btnArea.childNodes[0];
	const deleteBtn = btnArea.childNodes[1];

	const openEditor = (text) => {
		// open up a text area and a save/cancel button
		
		// text area
		const textArea = createTextArea(text);

		// util buttons
		const editSaveBtn = createEditSaveBtn(closeEditor)
		const editCancelBtn = createEditCancelBtn(closeEditor);

		clip.replaceChild(textArea, para);
		btnArea.replaceChild(editSaveBtn, editBtn);
		btnArea.replaceChild(editCancelBtn, deleteBtn);
	};

	const closeEditor = (toSave) => {
		const textArea = clip.childNodes[0];
		const editSaveBtn = btnArea.childNodes[0];
		const editCancelBtn = btnArea.childNodes[1];

		
		if (toSave) {
			const text = textArea.value;
			ClipBoard.editClip(id, text);
			para.textContent = text;
		}

		clip.replaceChild(para, textArea);
		btnArea.replaceChild(editBtn, editSaveBtn);
		btnArea.replaceChild(deleteBtn, editCancelBtn);

		textArea.remove();
		editSaveBtn.remove();
		editCancelBtn.remove();
	}

	editBtn.addEventListener("click", (e) => {
		e.stopPropagation();

		// display popup to edit text
		openEditor(para.textContent);
	});
}

function setupDeleteBtn(id, clip) {
	const para = clip.childNodes[0];
	const btnArea = clip.childNodes[1];
	const deleteBtn = btnArea.childNodes[1];

	deleteBtn.addEventListener("click", (e) => {
		e.stopPropagation();
		
		ClipBoard.removeClip(id);

		// also remove the clip from the board
		clip.remove();
	});
}

export {
	setupBtns,
}