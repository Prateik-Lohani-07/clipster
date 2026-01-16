import { openDialog } from "./dialog.js";

const clipArea = document.getElementsByClassName("clips")[0];
const input = document.getElementById("clip-input");
const addBtn = document.getElementsByClassName("add-btn")[0];

addBtn.addEventListener("click", (e) => {
	e.stopPropagation();
	
	// display popup to add text
	openDialog();
});



export {
	clipArea,
	input,
};