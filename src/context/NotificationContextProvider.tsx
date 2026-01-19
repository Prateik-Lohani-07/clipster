import { createContext, useState, type Dispatch, type SetStateAction } from "react";
import type { NotificationState } from "./Notification";

export const NotificationContext = createContext<NotificationState>(null);
export const NotificationDispatchContext = createContext<Dispatch<SetStateAction<NotificationState>>>(() => {});

interface NotificationContextProviderProps {
	children: React.ReactNode;
}

export function NotificationContextProvider({ children }: NotificationContextProviderProps) {
	const [notification, setNotification] = useState<NotificationState>(null);

	return (
		<NotificationContext.Provider value={notification}>
			<NotificationDispatchContext.Provider value={setNotification}>
				{children}
			</NotificationDispatchContext.Provider>
		</NotificationContext.Provider>
	)
}