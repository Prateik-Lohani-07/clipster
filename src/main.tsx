import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClipsContextProvider } from './context/ClipsContextProvider.tsx'
import { NotificationContextProvider } from './context/NotificationContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ClipsContextProvider>
			<NotificationContextProvider>
				<App />
			</NotificationContextProvider>
		</ClipsContextProvider>
	</StrictMode>,
)
