'use client';

import { useEffect, useRef, useState } from 'react';
import { FaArrowDown, FaArrowUp, FaPlay, FaStop } from 'react-icons/fa';
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from 'react-icons/hi2';

interface PlayButtonProps {
	className?: string;
	audioFile: string;
}

export default function PlayButton({ className, audioFile }: PlayButtonProps) {
	const [play, setPlay] = useState(false);
	const [scrolling, setScrolling] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const playRef = useRef<HTMLDivElement | null>(null);
	const scrollRef = useRef<HTMLDivElement | null>(null);
	// const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
	const scrollIntervalRef = useRef<number | null>(null);
	const autoScrollRef = useRef<number | null>(null);

	useEffect(() => {
		if (!audioRef.current) {
			audioRef.current = new Audio(`/api/audio/${audioFile}`);
		}

		const handleAudioEnd = () => {
			audioRef.current?.play();
		};

		audioRef.current.addEventListener('ended', handleAudioEnd);

		return () => {
			audioRef.current?.removeEventListener('ended', handleAudioEnd);
			stopScrolling();
			stopAutoScrolling();
		};
	}, [audioFile]);

	const handlePlayPause = () => {
		if (audioRef.current) {
			if (play) {
				audioRef.current.pause();
			} else {
				audioRef.current.play();
			}
			setPlay(!play);
		}
	};

	const handleScrollToggle = () => {
		if (scrolling) {
			stopAutoScrolling();
		} else {
			startAutoScrolling('down');
		}
		setScrolling(!scrolling);
	};

	const startScrolling = (direction: 'up' | 'down') => {
		const scrollAmount = direction === 'up' ? -300 : 300; // faster scroll for button
		// stopScrolling(); // Ensure no other interval is running
		// scrollIntervalRef.current = setInterval(() => {
		// 	window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
		// }, 100); // Larger interval for manual scrolling

        const scrollStep = () => {
			window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
            scrollIntervalRef.current = requestAnimationFrame(scrollStep);
		};

        stopScrolling();
        scrollStep();
	};

	const startAutoScrolling = (direction: 'up' | 'down') => {
		const scrollAmount = direction === 'up' ? -10 : 10; // slower scroll for auto
		const scrollStep = () => {
			window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
            autoScrollRef.current = requestAnimationFrame(scrollStep);
		};
		stopAutoScrolling(); // Ensure no other interval is running
		scrollStep();
	};

	const stopScrolling = () => {
		if (scrollIntervalRef.current) {
			// clearInterval(scrollIntervalRef.current);
            cancelAnimationFrame(scrollIntervalRef.current);
			scrollIntervalRef.current = null;
		}
	};

	const stopAutoScrolling = () => {
		if (autoScrollRef.current) {
			cancelAnimationFrame(autoScrollRef.current);
			autoScrollRef.current = null;
		}
	};

	const handleUpButtonMouseDown = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		if (!e.currentTarget.classList.contains('bg-[#a8c5c9]')) {
			e.currentTarget.classList.add('bg-[#a8c5c9]');
			e.currentTarget.classList.add('text-white');
		}
		setScrolling(false);
		stopAutoScrolling();
		startScrolling('up');
	};

	const handleDownButtonMouseDown = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		if (!e.currentTarget.classList.contains('bg-[#a8c5c9]')) {
			e.currentTarget.classList.add('bg-[#a8c5c9]');
			e.currentTarget.classList.add('text-white');
		}
		setScrolling(false);
		stopAutoScrolling();
		startScrolling('down');
	};

	const handleMouseUpOrLeave = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		if (e.currentTarget.classList.contains('bg-[#a8c5c9]')) {
			e.currentTarget.classList.remove('bg-[#a8c5c9]');
			e.currentTarget.classList.remove('text-white');
		}
		stopScrolling();
	};

	return (
		<div
			className={`${className} z-[555] fixed right-4 top-[50%] -translate-y-[50%] bg-white p-2 flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 rounded-full`}
		>
			<div
				onClick={handlePlayPause}
				className="w-8 h-8 xs:w-10 xs:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 shadow-md cursor-pointer rounded-full p-2"
				ref={playRef}
			>
				{play ? (
					<HiMiniSpeakerWave className="w-full h-full" />
				) : (
					<HiMiniSpeakerXMark className="w-full h-full" />
				)}
			</div>
			<div
				onClick={handleScrollToggle}
				className="w-8 h-8 xs:w-10 xs:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 shadow-md cursor-pointer rounded-full p-3"
				ref={scrollRef}
			>
				{scrolling ? (
					<FaStop className="w-full h-full" />
				) : (
					<FaPlay className="w-full h-full" />
				)}
			</div>
			<div
				onMouseDown={handleUpButtonMouseDown}
				onMouseUp={handleMouseUpOrLeave}
				onMouseLeave={handleMouseUpOrLeave}
				className="w-8 h-8 xs:w-10 xs:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 shadow-md cursor-pointer rounded-full p-2"
			>
				<FaArrowUp className="w-full h-full" />
			</div>
			<div
				onMouseDown={handleDownButtonMouseDown}
				onMouseUp={handleMouseUpOrLeave}
				onMouseLeave={handleMouseUpOrLeave}
				className="w-8 h-8 xs:w-10 xs:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 shadow-md cursor-pointer rounded-full p-2"
			>
				<FaArrowDown className="w-full h-full" />
			</div>
		</div>
	);
}
