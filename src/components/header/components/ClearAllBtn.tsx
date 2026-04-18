import { useContext, type MouseEvent } from 'react'
import { ClipDispatchContext } from '../../../context/ClipsContextProvider'

function ClearAllBtn() {
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
	}

	return (
		<button
			className='size-6 !m-0 cursor-pointer text-white hover:bg-white hover:text-red-600 hover:rounded-full text-center align-middle'
			onClick={clearAllClips}
		>	
			<i className='fa-solid fa-trash text-lg'></i>
		</button>
	)
}

export default ClearAllBtn