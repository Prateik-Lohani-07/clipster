function SidePanelBtn() {
	const openSidePanel = async () => {
		const [tab] = await chrome.tabs.query({
			active: true,
			currentWindow: true,
		});

		if (tab?.id) {
			chrome.sidePanel.open({ tabId: tab.id });
			window.close();
		}
	};

	return (
		<button
			className='size-6 !m-0 cursor-pointer text-white hover:bg-white hover:text-primary hover:rounded-full text-center align-middle'
			onClick={openSidePanel}
		>
			<i className='fa-solid fa-table-columns text-lg'></i>
		</button>
	)
}

export default SidePanelBtn