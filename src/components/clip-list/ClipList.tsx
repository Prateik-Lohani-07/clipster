import type { Clip } from '../../models/Clip';
import ClipContainer from '../clip/ClipContainer';

interface ClipListProps {
	clips: Clip[];
}

function ClipList({ clips }: ClipListProps) {
	return (
		<div className='overflow-hidden bg-primary flex flex-col w-100 gap-[1px]'>
			{
				clips.map(clip => 
					<ClipContainer 
						key={clip.getId()} 
						clip={clip} 
					/>
				)
			}
		</div>
	)
}

export default ClipList