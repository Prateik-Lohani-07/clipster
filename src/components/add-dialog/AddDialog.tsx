import { useContext, useState, type MouseEvent } from "react";
import "./addDialog.css";
import { Clip } from "../../models/Clip";
import { ClipDispatchContext, ClipsContext } from "../../context/ClipsContextProvider";
import { sanitizeText } from "../../utils/sanitize";
import { NotificationDispatchContext } from "../../context/NotificationContextProvider";
import { COLORS } from "../../utils/clipColor";

interface AddDialogProps {
	setShowAddClipDialog: Function;
}

function AddDialog({ setShowAddClipDialog }: AddDialogProps) {
	const [clipInput, setClipInput] = useState('');
	const data = useContext(ClipsContext);
	const dispatch = useContext(ClipDispatchContext);
	const notify = useContext(NotificationDispatchContext);

	const addNewClip = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();

		const sanitizedInput = sanitizeText(clipInput);
		if (sanitizedInput.trim() === "") {
			notify({ message: "Can't be empty!", type: 'error' });
			return;
		}

		const newClip = new Clip(
			data.latestId + 1,
			sanitizedInput,
			COLORS.DEFAULT,
		);

		dispatch({
			type: 'add',
			clip: newClip,
		});

		setShowAddClipDialog(false);
	};

	return (
		<div id="dialog" className="fixed inset-0 top-[var(--header-height)] flex items-center justify-center bg-[rgb(0,0,0,0.4)]">
			<div className="dialog-content">
				<textarea 
					className="clip-input" 
					value={clipInput}
					aria-label="Text area input for new clip"
					onChange={(e) => setClipInput(e.target.value)}
				/>

				<div className="dialog-btns">
					<button className="btn dialog-btn save" aria-label="Dialog Save Clip" onClick={addNewClip}>
						Save
					</button>
					<button className="btn dialog-btn cancel" aria-label="Dialog Cancel Clip" onClick={() => setShowAddClipDialog(false)}>
						Cancel
					</button>
				</div>
			</div>
		</div>	
	)
}

export default AddDialog