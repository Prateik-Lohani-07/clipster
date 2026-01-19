export type NotificationState = {
	message: string;
	type: 'error' | 'info' | 'success'
} | null;