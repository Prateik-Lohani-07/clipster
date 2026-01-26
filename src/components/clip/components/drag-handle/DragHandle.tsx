import { type Ref } from 'react'

interface DragHandleProps {
	dragHandleRef: Ref<HTMLButtonElement>;
}

function DragHandle({ dragHandleRef }: DragHandleProps) {
	return (
		<button
			className='flex flex-row justify-center items-center border-none bg-transparent cursor-grab active:cursor-grabbing'
			ref={dragHandleRef}
		>
			<i className="fa-solid fa-braille text-white" />
		</button>
	)
}

export default DragHandle