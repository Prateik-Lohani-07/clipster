import { useRef, useState } from 'react'
import "./colorPicker.css";
import { COLORS, predefinedClipColors } from '../../../../utils/clipColor';

interface ColorPickerProps {
	id: number;
	clipColor: string | undefined;
	setColor: Function;
} 

function ColorPicker({ id, clipColor, setColor }: ColorPickerProps) {
	const checkboxRef = useRef<HTMLInputElement>(null);
	const [pickDefault, setPickDefault] = useState(clipColor === COLORS.DEFAULT);
	const [previousColor, setPreviousColor] = useState(clipColor);

	return (
		<div className='bg-white p-[10px] h-full'>
			<div className='flex flex-row gap-1 items-center'>
				<label className='custom-color-check-label' htmlFor={`custom-color-checked-${id}`}>
					Default Color:
				</label>
				
				<input 
					type="checkbox" 
					name={`custom-color-checked-${id}`} 
					id={`custom-color-checked-${id}`}
					checked={pickDefault}
					ref={checkboxRef}
					onChange={() => {
						if (checkboxRef.current) {
							if (checkboxRef.current.checked) {
								setPreviousColor(clipColor);
								setPickDefault(true);
								setColor(COLORS.DEFAULT);
							}
							else {
								setPickDefault(false);
								setColor(previousColor);
							} 
						}
					}}
				/>
			</div>

			{
				!pickDefault && (
					<div className="predefined-colors mt-2">
					{
						Object.keys(predefinedClipColors).map((color) => (
							color === COLORS.DEFAULT
								? 	null
								:	<button 
										className={`color-btn rounded-[8px] ${color}-sq ${color === (clipColor ?? '') && 'ring-2 ring-gray-400 ring-opacity-25'}`} 
										value={color}
										aria-label={`${color} button for color coding clip`}
										onClick={() => setColor(color) }
									/>	
						))
					}
					</div>
				)
			}
		</div>
	)
}

export default ColorPicker