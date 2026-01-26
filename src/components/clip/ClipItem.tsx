import { useDrag, useDrop } from 'react-dnd';
import type { Clip } from '../../models/Clip';
import ClipContainer from './ClipContainer';
import { DragItems } from '../../utils/constants';
import { useRef } from 'react';
import DragHandle from './components/drag-handle/DragHandle';

interface ClipItemProps {
	clip: Clip;
	index: number;
	moveClipItem: (dragIndex: number, hoverIndex: number) => void;
}

function ClipItem({ clip, index, moveClipItem }: ClipItemProps) {
	const dragHandleRef = useRef<HTMLButtonElement>(null);
	const itemRef = useRef<HTMLDivElement>(null);
	
	const [{ isDragging }, dragRef, previewRef] = useDrag(() => ({
		type: DragItems.CLIP,
		item: { index },
		collect: (monitor) => ({
			isDragging: Boolean(monitor.isDragging()),
		})
	}));

	const [, dropRef] = useDrop({
		accept: DragItems.CLIP,
		hover: (item: { index: number }, monitor) => {
			const dragIndex = item.index;
			const hoverIndex = index;
			
			const hoverBoundingRect = itemRef.current!.getBoundingClientRect();
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const hoverActualY = monitor.getClientOffset()!.y - hoverBoundingRect.top;
			
			if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
			if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

			moveClipItem(dragIndex, hoverIndex);
			item.index = hoverIndex;
		}
	})
	
	dragRef(dragHandleRef);
	previewRef(itemRef);	
	dropRef(itemRef);	

	const itemOpacity = isDragging ? 0 : 1;
	return (
		<div 
			ref={itemRef}
			className='h-[100px] flex flex-row'
			style={{ opacity: itemOpacity }}
		>
			<DragHandle dragHandleRef={dragHandleRef} />
			<ClipContainer key={clip.getId()} clip={clip} />
		</div>
	)
}

export default ClipItem