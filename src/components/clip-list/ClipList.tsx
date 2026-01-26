import { useCallback, useContext } from 'react';
import { ClipDispatchContext, ClipsContext } from '../../context/ClipsContextProvider';
import NoClips from '../no-clips/NoClips';
import ClipItem from '../clip/ClipItem';

function ClipList() {
	const clipsterData = useContext(ClipsContext);
	const dispatch = useContext(ClipDispatchContext);
	const clips = clipsterData.clips;

	const moveClipItem = useCallback(
		(dragIndex: number, hoverIndex: number) => {
			const dragItem = clips[dragIndex];
			const hoverItem = clips[hoverIndex];
			
			const newClips = [...clips];
			newClips[dragIndex] = hoverItem;
			newClips[hoverIndex] = dragItem;

			dispatch({
				type: 'set',
				data: {
					...clipsterData,
					clips: newClips,
				}
			});
		},
		[clips]
	)

	if (clips.length === 0) return <NoClips />;

	return (
		<div className='overflow-hidden bg-primary flex flex-col w-100 gap-[1px]'>
			{}
			{
				clips.map((clip, index) => 
					<ClipItem 
						key={clip.getId()} 
						clip={clip} 
						index={index}
						moveClipItem={moveClipItem}
					/>
				)
			}
		</div>
	)
}

export default ClipList