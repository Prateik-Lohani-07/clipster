import "./cancelBtn.css";

interface CancelBtnProps {
	setInEditMode: Function;
}

function CancelBtn({ setInEditMode }: CancelBtnProps) {
	return (
		<button className='btn clip-btn cancel-btn' onClick={() => setInEditMode(false)}>
			<i className='fa-solid fa-x'></i>
		</button>
	)
}

export default CancelBtn