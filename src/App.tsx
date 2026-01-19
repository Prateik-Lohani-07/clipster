import { useContext, useEffect, useState } from 'react'
import './App.css'
import ClipList from './components/clip-list/ClipList'
import Header from './components/header/Header'
import AddDialog from './components/add-dialog/AddDialog';
import { fetchClipsterData, storeClipsterData } from './services/ClipService';
import { ClipDispatchContext, ClipsContext } from './context/ClipsContextProvider';
import NoClips from './components/no-clips/NoClips';

function App() {
	const [showAddClipDialog, setShowAddClipDialog] = useState(false);
	const dispatch = useContext(ClipDispatchContext);
	const clipsterData = useContext(ClipsContext);

	useEffect(() => {
		dispatch({
			type: 'set',
			data: fetchClipsterData()
		})
	}, []);

	useEffect(() => {
		storeClipsterData(clipsterData)
	}, [clipsterData]);

	const clips = clipsterData.clips;

	return (
		<main className='main-container'>
			<Header />

			{clips.length > 0 && <ClipList clips={clips} />}
			{clips.length === 0 && <NoClips />}

			<button 
				className="btn border border-black w-full h-[50px] bg-tertiary font-semibold text-[1.5em] hover:bg-tertiary-dark hover:text-white" 
				onClick={() => setShowAddClipDialog(true)}
			>
				+
			</button>
			{showAddClipDialog && <AddDialog setShowAddClipDialog={setShowAddClipDialog} />}
		</main>
	)
}

export default App
