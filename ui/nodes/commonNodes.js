function createEditBtn() {
	const editBtn = document.createElement("button");
	editBtn.classList.add("btn", "clip-btn", "edit-btn", "hidden");
	editBtn.ariaLabel = "Edit Clip";

	// using pencil icon
	const editIcon = document.createElement("i");
	editIcon.classList.add("fa", "fa-pencil");
	editIcon.ariaHidden = "true";
	
	editBtn.appendChild(editIcon);
	return editBtn;
}

function createDeleteBtn() {
	const deleteBtn = document.createElement("button");	
	deleteBtn.classList.add("btn", "clip-btn", "delete-btn", "hidden");
	deleteBtn.ariaLabel = "Edit Clip";

	// using trash icon
	const deleteIcon = document.createElement("i");
	deleteIcon.classList.add("fa", "fa-trash");
	deleteIcon.ariaHidden = "true";
	
	deleteBtn.appendChild(deleteIcon);
	return deleteBtn;
}

function createEditSaveBtn(closeEditor) {
	const editSaveBtn = document.createElement("button");
	editSaveBtn.classList.add("btn", "edit-save-btn");
	editSaveBtn.ariaLabel = "Save Clip Edits"

	// adding tickmark icon
	const tickMark = document.createElement("i");
	tickMark.classList.add("fa-solid", "fa-check");
	
	editSaveBtn.appendChild(tickMark);
	editSaveBtn.addEventListener("click", (e) => { e.stopPropagation(); closeEditor(true) });

	return editSaveBtn;
}

function createEditCancelBtn(closeEditor) {
	const editCancelBtn = document.createElement("button");
	editCancelBtn.classList.add("btn", "edit-cancel-btn");
	editCancelBtn.ariaLabel = "Cancel Clip Edits"

	// adding solid x icon
	const cancelIcon = document.createElement("i");
	cancelIcon.classList.add("fa-solid", "fa-x");
	
	editCancelBtn.appendChild(cancelIcon);
	editCancelBtn.addEventListener("click", (e) => { e.stopPropagation(); closeEditor(false) });

	return editCancelBtn;
}

function createTextArea(text) {
	const textArea = document.createElement("textarea");
	textArea.value = text;
	textArea.addEventListener("click", (e) => { e.stopPropagation(); })

	return textArea;
}

export {
	createEditBtn,
	createDeleteBtn,
	createEditSaveBtn,
	createEditCancelBtn,
	createTextArea,
}