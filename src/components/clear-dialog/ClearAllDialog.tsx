import { useContext, type MouseEvent } from "react";
import { ClipDispatchContext } from "../../context/ClipsContextProvider";

interface ClearAllDialogProps {
	setShowClearAllDialog: Function;
}

function ClearAllDialog({ setShowClearAllDialog }: ClearAllDialogProps) {
	
	const dispatch = useContext(ClipDispatchContext);

	const clearAllClips = async (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		
		dispatch({
			type: 'set',
			data: {
				latestId: 0,
				clips: [],
			}
		});

		hideDialog();
	};

	const hideDialog = () => setShowClearAllDialog(false);

	return (
		<div id="dialog" className="fixed inset-0 top-[var(--header-height)] flex items-center justify-center bg-[rgb(0,0,0,0.4)]">
			<div className='bg-white p-[10px] w-[80%] rounded-[10px] mt-[30px] ml-10 flex flex-col items-center gap-2'>
				<div className="flex flex-col items-center">
					<h3 className="text-xl text-red-600 font-bold">Warning <i className="fa-solid fa-triangle-exclamation" /></h3>
					<p>You are about to delete ALL CLIPS.</p>
				</div>

				<div className="flex flex-row gap-1">
					<button className='border-none cursor-pointer rounded-[8px] p-1 text-white bg-red-600' onClick={clearAllClips}>Proceed</button>
					<button className='border-none cursor-pointer rounded-[8px] p-1 text-white bg-green-600' onClick={hideDialog}>Cancel</button>
				</div>
			</div>
		</div>
	)
}

export default ClearAllDialog