interface ClearAllBtnProps {
	setShowClearAllDialog: Function;
}

function ClearAllBtn({ setShowClearAllDialog }: ClearAllBtnProps) {
	const displayDialog = () => setShowClearAllDialog(true);

	return (
		<button
			className='size-6 !m-0 cursor-pointer text-white hover:bg-white hover:text-red-600 hover:rounded-full text-center align-middle'
			onClick={displayDialog}
		>	
			<i className='fa-solid fa-trash text-lg' />
		</button>
	)
}

export default ClearAllBtn