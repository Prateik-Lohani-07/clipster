import { useContext, useEffect, useRef, useState } from "react";
import "./header.css";
import { NotificationContext, NotificationDispatchContext } from "../../context/NotificationContextProvider";
import SidePanelBtn from "./components/SidePanelBtn";
import ClearAllBtn from "./components/ClearAllBtn";
import { ClipsContext } from "../../context/ClipsContextProvider";

interface HeaderProps {
	setShowClearAllDialog: Function;
};

function Header({ setShowClearAllDialog }: HeaderProps) {
	const hideHeaderMsg = useContext(NotificationContext);
	const setNotification = useContext(NotificationDispatchContext);
	const timeoutRef = useRef<number | null>(null);
	
	const clipsterData = useContext(ClipsContext);
	const [showClearAllBtn, setShowClearAllBtn] = useState(false);

	useEffect(() => {
		setShowClearAllBtn(clipsterData.clips.length > 0);
	}, [clipsterData]);

	useEffect(() => {
		// no notification, no timer
		if (!hideHeaderMsg) return;
		
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		const timeoutId = setTimeout(() => { setNotification(null) }, 2000);
		timeoutRef.current = timeoutId;

		return () => clearTimeout(timeoutId);
	}, [hideHeaderMsg]);

	return (
		<header className="w-full flex flex-row justify-between items-center bg-primary border-b border-black px-2">
			<h1 className="header-font h-[var(--header-height)] flex flex-row items-center">
				Clipster 
				{hideHeaderMsg &&
					<span id="copied-msg" className={`ml-4 h-full flex flex-row text-lg items-center ${hideHeaderMsg.type === "error" ? "error" : "success"}`}>{hideHeaderMsg.message}</span>
				}
			</h1>

			<div className="flex flex-row gap-2">
				{showClearAllBtn && <ClearAllBtn setShowClearAllDialog={setShowClearAllDialog} />}
				<SidePanelBtn />
			</div>
		</header>
	)
}

export default Header;