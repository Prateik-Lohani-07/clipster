import { useContext, useEffect, useRef } from "react";
import "./header.css";
import { NotificationContext, NotificationDispatchContext } from "../../context/NotificationContextProvider";


function Header() {
	const hideHeaderMsg = useContext(NotificationContext);
	const setNotification = useContext(NotificationDispatchContext);
	const timeoutRef = useRef<number | null>(null);

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
		<header>
			<h1 className="header-font h-[var(--header-height)] border-b border-black flex flex-row items-center">
				Clipster 
				{hideHeaderMsg &&
					<span id="copied-msg" className={`ml-4 h-full flex flex-row items-center ${hideHeaderMsg.type === "error" ? "error" : "success"}`}>{hideHeaderMsg.message}</span>
				}
			</h1>
		</header>
	)
}

export default Header;