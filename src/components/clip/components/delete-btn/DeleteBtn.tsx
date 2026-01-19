import { useContext, type MouseEvent } from 'react'
import "./deleteBtn.css";
import { ClipDispatchContext } from '../../../../context/ClipsContextProvider';

interface DeleteBtnProps {
	id: number;
}

function DeleteBtn({ id }: DeleteBtnProps) {

	const dispatch = useContext(ClipDispatchContext);

	const deleteClip = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		dispatch({
			type: 'delete',
			id,
		});
	}

	return (
		<button className='btn clip-btn delete-btn' onClick={deleteClip}>
			<i className='fa fa-trash'></i>
		</button>
	)
}

export default DeleteBtn