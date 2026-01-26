import "./cancelBtn.css";

interface CancelBtnProps {
	onCancel: () => void;
}

function CancelBtn({ onCancel }: CancelBtnProps) {
	return (
		<button className='btn clip-btn cancel-btn' onClick={onCancel}>
			<i className='fa-solid fa-x'></i>
		</button>
	)
}

export default CancelBtn