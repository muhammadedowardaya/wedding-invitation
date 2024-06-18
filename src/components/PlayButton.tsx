'use client';

import { useEffect, useRef, useState } from 'react';
import {
	FaAngleDoubleUp,
	FaArrowDown,
	FaArrowUp,
	FaPlay,
	FaStop,
} from 'react-icons/fa';
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from 'react-icons/hi2';
import Swal from 'sweetalert2';
import '@/styles/mySwal2.css';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/all';
import { animateTextFaded } from '@/utils/animated';

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

	const scrollTimeline = useRef(gsap.timeline());
	const scrollAmountRef = useRef(0);

	const [isBottom, setIsBottom] = useState(false);

	const handleScroll = () => {
		if (typeof window !== 'undefined') {
			const windowHeightPlusScrollY = window.innerHeight + window.scrollY;
			const bodyOffsetHeight = document.body.offsetHeight;

			setIsBottom(windowHeightPlusScrollY >= bodyOffsetHeight);
		}
	};

	const handleToTop = () => {
		if (typeof window !== 'undefined') {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	useEffect(() => {
		gsap.registerPlugin(ScrollToPlugin);

		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', handleScroll);

			// Initial check
			handleScroll();

			return () => {
				window.removeEventListener('scroll', handleScroll);
			};
		}
	}, []);

	useEffect(() => {
		if (!audioRef.current) {
			audioRef.current = new Audio(`/api/audio/${audioFile}`);
		}

		const handleAudioEnd = () => {
			audioRef.current?.play();
		};

		audioRef.current.addEventListener('ended', handleAudioEnd);

		const checkDocumentReady = () => {
			if (document.readyState === 'complete') {
				Swal.fire({
					title: 'Izinkan browser untuk memutar audio?',
					showDenyButton: true,

					confirmButtonText: 'Ya, izinkan',
					denyButtonText: `Tidak`,
				}).then((result) => {
					/* Read more about isConfirmed, isDenied below */
					if (result.isConfirmed) {
						// Swal.fire('Audio sedang diputar', '', 'info');
						animateTextFaded('.typing-effect');
						setPlay(true);
						setScrolling(true);
						// audioRef.current?.play();
						// startAutoScrolling('down');
						handlePlayPause();
						const handleScrollToggleTimeout = setTimeout(() => {
							handleScrollToggle();
							clearTimeout(handleScrollToggleTimeout);
						}, 5000);
					} else if (result.isDenied) {
						// Swal.fire('Audio tidak diputar', '', 'info');
					}
				});
			}
		};

		// Initial check
		checkDocumentReady();

		// Event listener for state changes
		document.addEventListener('readystatechange', checkDocumentReady);

		return () => {
			document.removeEventListener('readystatechange', checkDocumentReady);
			audioRef.current?.removeEventListener('ended', handleAudioEnd);
			// stopScrolling();
			// stopAutoScrolling();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [audioFile]);

	const handlePlayPause = () => {
		if (audioRef.current) {
			if (play) {
				audioRef.current.pause();
				setPlay(false);
			} else {
				const playPromise = audioRef.current.play();
				if (playPromise !== undefined) {
					playPromise
						.then(() => {
							setPlay(true);
						})
						.catch((error) => {
							console.error('Playback failed:', error);
						});
				}
			}
		}
	};

	const handleScrollToggle = () => {
		if (scrolling) {
			stopScrolling();
			// stopAutoScrolling();
		} else {
			startScrolling('down', 25);
			// startAutoScrolling('down');
		}
		setScrolling(!scrolling);
	};

	const startScrolling = (
		direction: 'up' | 'down',
		scrollAmountValue: number
	) => {
		const scrollAmount =
			direction === 'up' ? -scrollAmountValue : scrollAmountValue; // faster scroll for button

		const scrollStep = () => {
			gsap.to(window, {
				scrollTo: { y: window.scrollY + scrollAmount, autoKill: false },
				duration: 1,
				ease: 'none',
				// onComplete: () => {
				// 	scrollIntervalRef.current = requestAnimationFrame(scrollStep);
				// },
			});
			scrollIntervalRef.current = requestAnimationFrame(scrollStep);
		};

		stopScrolling();
		scrollStep();
	};

	const startAutoScrolling = (direction: 'up' | 'down') => {
		if (isBottom) {
			setScrolling(false);
			stopAutoScrolling();
		} else {
			const scrollAmount = direction === 'up' ? -10 : 10; // slower scroll for auto
			const scrollStep = () => {
				gsap.to(window, {
					scrollTo: { y: window.scrollY + scrollAmount, autoKill: false },
					duration: 1,
					ease: 'none',
					// onComplete: () => {
					// 	scrollIntervalRef.current = requestAnimationFrame(scrollStep);
					// },
				});
				autoScrollRef.current = requestAnimationFrame(scrollStep);
			};
			stopAutoScrolling(); // Ensure no other interval is running
			scrollStep();
		}
	};

	const stopScrolling = () => {
		if (scrollIntervalRef.current) {
			// clearInterval(scrollIntervalRef.current);
			gsap.killTweensOf(window);
			cancelAnimationFrame(scrollIntervalRef.current);
			scrollIntervalRef.current = null;
		}
		// scrollTimeline.current.pause();
	};

	const stopAutoScrolling = () => {
		if (autoScrollRef.current) {
			gsap.killTweensOf(window);
			cancelAnimationFrame(autoScrollRef.current);
			autoScrollRef.current = null;
		}
		// scrollTimeline.current.pause();
	};

	const handleUpButtonMouseDown = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		if (!e.currentTarget.classList.contains('bg-[#a8c5c9]')) {
			e.currentTarget.classList.remove('bg-white');
			e.currentTarget.classList.remove('text-slate-700');
			e.currentTarget.classList.add('bg-[#a8c5c9]');
			e.currentTarget.classList.add('text-white');
		}
		setScrolling(false);
		stopAutoScrolling();
		startScrolling('up', 200);
	};

	const handleDownButtonMouseDown = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		if (!e.currentTarget.classList.contains('bg-[#a8c5c9]')) {
			e.currentTarget.classList.remove('bg-white');
			e.currentTarget.classList.remove('text-slate-700');
			e.currentTarget.classList.add('bg-[#a8c5c9]');
			e.currentTarget.classList.add('text-white');
		}
		setScrolling(false);
		stopAutoScrolling();
		startScrolling('down', 200);
	};

	const handleUpTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
		if (!e.currentTarget.classList.contains('bg-[#a8c5c9]')) {
			e.currentTarget.classList.remove('bg-white');
			e.currentTarget.classList.remove('text-slate-700');
			e.currentTarget.classList.add('bg-[#a8c5c9]');
			e.currentTarget.classList.add('text-white');
		}
		setScrolling(false);
		stopAutoScrolling();
		startScrolling('up', 200);
	};

	const handleDownTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
		if (!e.currentTarget.classList.contains('bg-[#a8c5c9]')) {
			e.currentTarget.classList.remove('bg-white');
			e.currentTarget.classList.remove('text-slate-700');
			e.currentTarget.classList.add('bg-[#a8c5c9]');
			e.currentTarget.classList.add('text-white');
		}
		setScrolling(false);
		stopAutoScrolling();
		startScrolling('down', 200);
	};

	const handleMouseUpOrLeave = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		if (e.currentTarget.classList.contains('bg-[#a8c5c9]')) {
			e.currentTarget.classList.remove('bg-[#a8c5c9]');
			e.currentTarget.classList.remove('text-white');
			e.currentTarget.classList.add('bg-white');
			e.currentTarget.classList.add('text-slate-700');
		}
		stopScrolling();
	};

	const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
		if (e.currentTarget.classList.contains('bg-[#a8c5c9]')) {
			e.currentTarget.classList.remove('bg-[#a8c5c9]');
			e.currentTarget.classList.remove('text-white');
			e.currentTarget.classList.add('bg-white');
			e.currentTarget.classList.add('text-slate-700');
		}
		stopScrolling();
	};

	return (
		<div
			className={`${className} z-[666] w-max h-max fixed bottom-4 left-[50%] -translate-x-[50%] sm:left-[unset] sm:right-0 sm:top-[50%] sm:-translate-y-[50%] bg-slate-200 py-2 px-4 sm:py-4 sm:px-2 flex sm:flex-col gap-6 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 rounded-full`}
		>
			<div
				onClick={handlePlayPause}
				className="w-8 h-8 xs:w-10 xs:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 shadow-md cursor-pointer rounded-full p-2 bg-white text-slate-700"
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
				className="w-8 h-8 xs:w-10 xs:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 shadow-md cursor-pointer rounded-full p-3 bg-white text-slate-700"
				ref={scrollRef}
			>
				{scrolling ? (
					<FaStop className="w-full h-full" />
				) : (
					<FaPlay className="w-full h-full" />
				)}
			</div>

			{isBottom ? (
				<div
					onClick={handleToTop}
					className="w-8 h-8 xs:w-10 xs:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 shadow-md cursor-pointer rounded-full p-2 bg-white text-slate-700"
				>
					<FaAngleDoubleUp className="w-full h-full" />
				</div>
			) : (
				<>
					<div
						onTouchStart={handleUpTouchStart}
						onTouchEnd={handleTouchEnd}
						onMouseDown={handleUpButtonMouseDown}
						onMouseUp={handleMouseUpOrLeave}
						onMouseLeave={handleMouseUpOrLeave}
						className="w-8 h-8 xs:w-10 xs:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 shadow-md cursor-pointer rounded-full p-2 bg-white text-slate-700"
					>
						<FaArrowUp className="w-full h-full" />
					</div>
					<div
						onTouchStart={handleDownTouchStart}
						onTouchEnd={handleTouchEnd}
						onMouseDown={handleDownButtonMouseDown}
						onMouseUp={handleMouseUpOrLeave}
						onMouseLeave={handleMouseUpOrLeave}
						className="w-8 h-8 xs:w-10 xs:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 shadow-md cursor-pointer rounded-full p-2 bg-white text-slate-700"
					>
						<FaArrowDown className="w-full h-full" />
					</div>
				</>
			)}
		</div>
	);
}
