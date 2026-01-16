import { renderClip } from "../clip/renderClip.js";
import { input } from "./globalNodes.js";
import { ClipBoard } from "../../models/ClipBoard.js";
import { headerMsgNotify } from "./headerMsg.js";

const dialog = document.getElementById("dialog");
const saveBtn = dialog.getElementsByClassName("save")[0];
const cancelBtn = dialog.getElementsByClassName("cancel")[0];

function openDialog() {
	dialog.classList.remove("hidden");
	dialog.classList.add("flex");
}

function closeDialog() {
	input.value = "";
	dialog.classList.add("hidden");
	dialog.classList.remove("flex");
}

saveBtn.addEventListener("click", (e) => {
	e.stopPropagation();

	const text = input.value;

	let id;
	try {
		id = ClipBoard.addClip(text);
	} catch (error) {
		headerMsgNotify.notify("Can't be empty!", true);
		return;
	}

	renderClip(id, text);
	closeDialog();
});

cancelBtn.addEventListener("click", (e) => {
	e.stopPropagation();

	closeDialog();
})

export {
	openDialog,
};