import { useContext, useState, type MouseEvent } from 'react'
import "./clipContainer.css";
import type { Clip } from '../../models/Clip'
import EditBtn from './components/edit-btn/EditBtn'
import DeleteBtn from './components/delete-btn/DeleteBtn'
import SaveBtn from './components/save-btn/SaveBtn';
import CancelBtn from './components/cancel-btn/CancelBtn';
import ColorPicker from './components/color-picker/ColorPicker';
import { NotificationDispatchContext } from '../../context/NotificationContextProvider';
import { getClipColors } from '../../utils/clipColor';

interface ClipContainerProps {
	clip: Clip;
}

function ClipContainer({ clip }: ClipContainerProps) {
	const content = clip.getContent();
	const id = clip.getId();
	
	const notify = useContext(NotificationDispatchContext);
	
	const [inEditMode, setInEditMode] = useState(false);
	const [hoverOnClip, setHoverOnClip] = useState(false);
	const [clipInput, setClipInput] = useState(content);
	const [color, setColor] = useState<string | undefined>(clip.getColor());

	const copyClip = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		try {
			navigator.clipboard.writeText(content);
		} catch (error) {
			notify({ message: "Failed to copy!", type: 'error' });
			return;
		}
		notify({ message: "Copied!", type: 'info' });
	};

	const cancelEdits = () => {
		setInEditMode(false);
		setClipInput(content);
	}

	const styleClipOnHover = !inEditMode && hoverOnClip;
	const clipColors = getClipColors(color);

	return (
		<div 
			id={id.toString()} 

			className='flex-1 h-full flex flex-row shrink-0 justify-between cursor-pointer overflow-hidden'
			style={
				styleClipOnHover 
					? { backgroundColor: clipColors.hoverBackgroundColor }
					: { backgroundColor: clipColors.backgroundColor }
			}

			onMouseOver={() => setHoverOnClip(true)}
			onMouseOut={() => setHoverOnClip(false)}
		>
			{!inEditMode && 
				<div className='w-full min-w-0 flex flex-row justify-between'>
					<p 
						className='flex-1 min-w-0 m-0 p-[10px] select-none text-ellipsis overflow-hidden whitespace-nowrap' 
						style={
							styleClipOnHover
								?	{ color: clipColors.hoverTextColor }
								:	{ color: clipColors.textColor }
						}
						onClick={copyClip}
					>
							{content}
					</p>

					{hoverOnClip && (
						<div className='h-full flex flex-col w-[50px] shrink-0'>
							<EditBtn setInEditMode={setInEditMode} />
							<DeleteBtn id={id} />
						</div>
					)}
				</div>
			}

			{inEditMode && 
				<div className='w-full flex flex-row justify-between'>
					<div className='w-full flex flex-row justify-start'>
						<textarea 
							name="clip-input" 
							className="resize-none min-w-[240px] bg-white text-black p-[10px] border-r border-black"
							value={clipInput}
							onChange={(e) => setClipInput(e.target.value)}
						/>

						<div className='w-full'>
							<ColorPicker id={id} clipColor={color} setColor={setColor} />
						</div>
					</div>

					<div className='h-full flex flex-col !w-[50px]'>
						<SaveBtn id={id} clipInput={clipInput} color={color} setInEditMode={setInEditMode} />
						<CancelBtn onCancel={cancelEdits} />
					</div>
				</div>
			}
		</div>
	)
}

export default ClipContainer