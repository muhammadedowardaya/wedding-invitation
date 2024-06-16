import { useEffect, useRef, useState } from 'react';
import { FaArrowDown, FaArrowUp, FaPause, FaPlay } from 'react-icons/fa';

export default function PlayButton({
	className,
	audioFile,
}: {
	className?: string;
	audioFile: string;
}) {
	const [play, setPlay] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (!audioRef.current) {
			audioRef.current = new Audio(audioFile); // Ganti dengan path file audio Anda
		}

        const handleAudioEnd = () => {
            audioRef.current?.play();
        };

        audioRef.current?.addEventListener('ended', handleAudioEnd);

        return () => {
            audioRef.current?.removeEventListener('ended', handleAudioEnd);
        };

	}, [audioFile]);

	const handlePlay = () => {
		if (audioRef.current) {
			if (play) {
				audioRef.current.pause();
			} else {
				audioRef.current.play();
			}
			setPlay(!play);
		}
	};

	const startScrolling = (direction: 'up' | 'down') => {
		const scrollAmount = direction === 'up' ? -50 : 50;
		scrollIntervalRef.current = setInterval(() => {
			window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
		}, 50);
	};

	const stopScrolling = (e:any) => {
        if(e.currentTarget.classList.contains('bg-[#a8c5c9]')){
            e.currentTarget.classList.remove('bg-[#a8c5c9]');
            e.currentTarget.classList.remove('text-white');
        }
		if (scrollIntervalRef.current) {
			clearInterval(scrollIntervalRef.current);
		}
	};

	const handleUpButtonMouseDown = (e:any) => {
        if(!e.currentTarget.classList.contains('bg-[#a8c5c9]')){
            e.currentTarget.classList.add('bg-[#a8c5c9]');
            e.currentTarget.classList.add('text-white');
        }
		startScrolling('up');
	};

	const handleDownButtonMouseDown = (e:any) => {
        if(!e.currentTarget.classList.contains('bg-[#a8c5c9]')){
            e.currentTarget.classList.add('bg-[#a8c5c9]');
            e.currentTarget.classList.add('text-white');
        }
		startScrolling('down');
	};
	return (
		<div
			className={`${className} z-[555] fixed right-4 top-[50%] -translate-y-[50%] bg-white p-2 flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 rounded-full`}
		>
			<div
				onClick={handlePlay}
				className="w-10 h-10 shadow-md cursor-pointer rounded-full p-3"
			>
				{play ? (
					<FaPause className="w-full h-full" />
				) : (
					<FaPlay className="w-full h-full" />
				)}
			</div>
			<div
				onMouseDown={handleUpButtonMouseDown}
				onMouseUp={stopScrolling}
				onMouseLeave={stopScrolling}
				className="w-10 h-10 shadow-md cursor-pointer rounded-full p-2"
			>
				<FaArrowUp className="w-full h-full" />
			</div>
			<div
				onMouseDown={handleDownButtonMouseDown}
				onMouseUp={stopScrolling}
				onMouseLeave={stopScrolling}
				className="w-10 h-10 shadow-md cursor-pointer rounded-full p-2"
			>
				<FaArrowDown className="w-full h-full" />
			</div>
		</div>
	);
}
