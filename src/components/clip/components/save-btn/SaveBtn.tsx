import { useContext, type MouseEvent } from 'react'
import "./saveBtn.css";
import { sanitizeText } from '../../../../utils/sanitize';
import { ClipDispatchContext } from '../../../../context/ClipsContextProvider';
import { NotificationDispatchContext } from '../../../../context/NotificationContextProvider';

interface SaveBtnProps {
	id: number;
	clipInput: string;
	color: string | undefined;
	setInEditMode: Function;
} 

function SaveBtn({ id, clipInput, color, setInEditMode }: SaveBtnProps) { 
	const dispatch = useContext(ClipDispatchContext);
	const notify = useContext(NotificationDispatchContext);

	const saveClip = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();

		const sanitizedInput = sanitizeText(clipInput);
		if (sanitizedInput.trim() === "") {
			notify({ message: "Can't be empty!", type: 'error' });
			return;
		}

		dispatch({
			type: 'edit',
			id,
			content: sanitizedInput,
			color,
		});

		setInEditMode(false);
	}

	return (
		<button className='btn clip-btn save-btn' onClick={saveClip}>
			<i className='fa-solid fa-check'></i>
		</button>
	)
}

export default SaveBtn