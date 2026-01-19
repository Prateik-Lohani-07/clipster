import "./editBtn.css";

interface EditBtnProps {
	setInEditMode: Function;
}

function EditBtn({ setInEditMode }: EditBtnProps) {
	return (
		<button className='btn clip-btn edit-btn' onClick={() => setInEditMode(true)}>
			<i className='fa fa-pencil'></i>
		</button>
	)
}

export default EditBtn