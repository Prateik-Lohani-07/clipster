const clipArea = document.getElementsByClassName("clips")[0];
const copiedMsg = document.getElementById("copied-msg");

class ClipBoard {
	static id = 1;
	static allClips = {};
	static CLIPSTER_KEY = "CLIPSTER";

	static getClipText() {
		return JSON.stringify(this.allClips);
	}

	static checkText(text) {
		if (text.trim() == "") {
			throw new Error("Enter some text!");
		}
	}

	static storeClips() {
		localStorage.setItem(this.CLIPSTER_KEY, this.getClipText());
	}

	static addClip(text) {
		this.checkText(text);
		const storedId = this.id;

		this.allClips[this.id] = text;
		this.storeClips();
		this.id++;

		return storedId;
	}
	
	static editClip(id, text) {
		this.checkText(text);

		this.allClips[id] = text;
		this.storeClips();
	}
	
	static removeClip(id) {
		delete this.allClips[id];
		this.storeClips();
	}

	static loadClipsIfAny() {
		let allClips = localStorage.getItem(this.CLIPSTER_KEY);
		if (!allClips) {
			allClips = "{}";
		}

		this.allClips = JSON.parse(allClips);
		this.id = allClips.length;
	}
}

function displayClips() {
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
}

function renderClip(id, text) {
	const clip = document.createElement("div");
	clip.classList.add("clip");

	// display the text
	const para = document.createElement("p");
	para.textContent = text;
	para.id = id;

	// util buttons
	const editBtn = document.createElement("button");
	const deleteBtn = document.createElement("button");
	editBtn.classList.add("btn", "clip-btn", "edit-btn");
	deleteBtn.classList.add("btn", "clip-btn", "delete-btn");
	const editIcon = document.createElement("i");
	editIcon.classList.add("fa", "fa-pencil");
	editIcon.ariaHidden = "true";
	const deleteIcon = document.createElement("i");
	deleteIcon.classList.add("fa", "fa-trash");
	deleteIcon.ariaHidden = "true";
	editBtn.appendChild(editIcon);
	deleteBtn.appendChild(deleteIcon);

	const openEditor = (text) => {
		// open up a text area and a save/cancel button
		
		// text area
		const textArea = document.createElement("textarea");
		textArea.value = text;
		textArea.style = para.style;
		textArea.addEventListener("click", (e) => { e.stopPropagation(); })

		// save button
		const editSaveBtn = document.createElement("button");
		editSaveBtn.classList.add("edit-save-btn");
		const tickMark = document.createElement("i");
		tickMark.classList.add("fa-solid", "fa-check");
		editSaveBtn.appendChild(tickMark);
		editSaveBtn.addEventListener("click", (e) => { e.stopPropagation(); closeEditor(true) });
		
		// cancel button
		const editCancelBtn = document.createElement("button");
		editCancelBtn.classList.add("edit-cancel-btn");
		const cancelIcon = document.createElement("i");
		cancelIcon.classList.add("fa-solid", "fa-x");
		editCancelBtn.appendChild(cancelIcon);
		editCancelBtn.addEventListener("click", (e) => { e.stopPropagation(); closeEditor(false) });

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

	// util button area
	const btnArea = document.createElement("div");
	btnArea.classList.add("btn-area");
	btnArea.append(editBtn, deleteBtn);

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

	editBtn.addEventListener("click", (e) => {
		e.stopPropagation();

		// display popup to edit text
		openEditor(para.textContent);
	});

	deleteBtn.addEventListener("click", (e) => {
		e.stopPropagation();
		
		// remove from local storage
		const id = para.id;
		ClipBoard.removeClip(id);

		// also remove the clip from the board
		clip.remove();
	});

	clip.addEventListener("click", (e) => {
		e.stopPropagation();
		
		const text = para.textContent;
		navigator.clipboard.writeText(text);

		copiedMsg.classList.toggle("hidden");

		setTimeout(() => {
			copiedMsg.classList.toggle("hidden");
		}, 1000);
	});

	// add child elements
	clip.append(para, btnArea);
	clipArea.appendChild(clip);
}

const modal = document.getElementById("modal");
const input = document.getElementById("clip-input");
const saveBtn = modal.getElementsByClassName("save")[0];
const cancelBtn = modal.getElementsByClassName("cancel")[0];

saveBtn.addEventListener("click", (e) => {
	e.stopPropagation();

	const text = input.value;
	const id = ClipBoard.addClip(text);
	renderClip(id, text);

	closeModal();
});

cancelBtn.addEventListener("click", (e) => {
	e.stopPropagation();

	closeModal();
})

function openModal() {
	modal.classList.remove("hidden");
}

function closeModal() {
	input.value = "";
	modal.classList.add("hidden");
}

ClipBoard.loadClipsIfAny();
displayClips(ClipBoard.allClips);

const addBtn = document.getElementsByClassName("add-btn")[0];
addBtn.addEventListener("click", (e) => {
	e.stopPropagation();

	// display popup to add text
	openModal();
});

