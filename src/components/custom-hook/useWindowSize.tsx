'use client';

import { useState, useEffect } from 'react';

interface WindowSize {
	width: number;
	height: number;
}

function useWindowSize(): WindowSize {
	const [windowSize, setWindowSize] = useState<WindowSize>({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		function handleResize() {
			if (typeof window !== 'undefined') {
				setWindowSize({
					width: window.innerWidth,
					height: window.innerHeight,
				});
			}
		}

		// Set size at the first client-side load
		handleResize();
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', handleResize);
		}

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowSize;
}

export default useWindowSize;
