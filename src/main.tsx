import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClipsContextProvider } from './context/ClipsContextProvider.tsx'
import { NotificationContextProvider } from './context/NotificationContextProvider.tsx'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ClipsContextProvider>
			<NotificationContextProvider>
				<DndProvider backend={HTML5Backend}>
					<App />
				</DndProvider>
			</NotificationContextProvider>
		</ClipsContextProvider>
	</StrictMode>,
)
