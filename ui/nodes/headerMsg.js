const copiedMsg = document.getElementById("copied-msg");

const headerMsgNotify = {
	hide() {
		copiedMsg.classList.remove("warning", "success");
		copiedMsg.classList.add("hidden");
		this.timeoutId = undefined;
	},

	notify(msg, error) {
		if (typeof this.timeoutId === "number") {
			this.cancel();
		}

		copiedMsg.classList.remove("hidden");
		copiedMsg.innerText = msg;
		if (error) {
			copiedMsg.classList.add("error");
		} else {
			copiedMsg.classList.add("success");
		}

		this.timeoutId = setTimeout(() => {
			this.hide();
		}, 3000);
	},

	cancel() {
		clearTimeout(this.timeoutId);
	}
}

export {
	headerMsgNotify,
}