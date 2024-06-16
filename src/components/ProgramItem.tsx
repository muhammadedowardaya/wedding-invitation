'use client';
import Image from 'next/image';
import useWindowSize from './custom-hook/useWindowSize';

interface ProgramItemProps {
	number: number;
	title: string;
	time: string;
	description: string;
	imageUrl: string;
	isItemRight: boolean;
}

const ProgramItem = ({
	number,
	title,
	time,
	description,
	imageUrl,
	isItemRight,
}: ProgramItemProps) => {
	const { width } = useWindowSize();

	if (width >= 768) {
		return (
			<div
				className={`p-1 xs:p-3 bg-white text-slate-700 w-full sm:w-[28rem] md:w-80 lg:w-96 xl:w-[30rem] 2xl:w-[35rem] ${
					isItemRight ? 'mt-20 mr-auto' : 'mb-20 ml-auto'
				}`}
			>
				<div className="w-full h-60 lg:h-72 relative">
					<Image
						src={imageUrl}
						alt="event image"
						fill
						sizes="100%"
						style={{ objectFit: 'cover', objectPosition: 'top center' }}
					/>
					<div className="relative flex justify-center items-center -bottom-[12.6rem] md:-right-20 lg:-bottom-[15.1rem] lg:-right-28 xl:-right-36 2xl:-right-48">
						{/* <div
						className="relative flex justify-center items-center bg-[#f4e7e2] bottom-0 right-0 w-32 h-32 z-10 text-6xl text-white"
						style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
					>
						{number}
					</div> */}

						<div
							className="absolute flex justify-center items-center bg-white w-24 h-24 lg:w-28 lg:h-28 text-white border-element"
							style={{
								clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
							}}
						></div>
						<div
							className={`relative flex justify-center items-center ${
								number % 2 === 0 ? 'bg-[#f4e7e2]' : 'bg-[#e3eef2]'
							}  w-20 h-20 lg:w-24 lg:h-24 text-4xl font-bold text-white border-element`}
							style={{
								clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
							}}
						>
							{number}
						</div>
					</div>
				</div>
				<div className="my-6 px-4">
					<h3 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl mb-5 font-dancing-script">
						{title}
					</h3>
					<div
						className="grid text-slate-500"
						style={{
							gridTemplateColumns: '0.4fr 1fr',
						}}
					>
						<p className="">{time}</p>
						<p className="">{description}</p>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className={`p-1 xs:p-3 bg-white text-slate-700 w-full sm:w-[28rem] md:w-80 lg:w-96 `}>
				<div className="px-4 xs:px-0 w-full h-24 xs:h-60 relative">
					<Image
						src={imageUrl}
						alt="event image"
						fill
						sizes="100%"
						style={{ objectFit: 'cover', objectPosition: 'top center' }}
					/>
					<div className="relative hidden xs:flex justify-center items-center -bottom-[13rem] left-[30%] md:-right-28">
						{/* <div
						className="relative flex justify-center items-center bg-[#f4e7e2] bottom-0 right-0 w-32 h-32 z-10 text-6xl text-white"
						style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
					>
						{number}
					</div> */}

						<div
							className="absolute flex justify-center items-center bg-white w-20 h-20 md:w-24 md:h-24 text-white border-element"
							style={{
								clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
							}}
						></div>
						<div
							className={`relative flex justify-center items-center ${
								number % 2 === 0 ? 'bg-[#f4e7e2]' : 'bg-[#e3eef2]'
							}  w-16 h-16 md:w-20 md:h-20 text-2xl md:text-4xl font-bold text-white border-element`}
							style={{
								clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
							}}
						>
							{number}
						</div>
					</div>
				</div>
				<div className="p-2 xs:my-6 xs:px-4">
					<h3 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl mb-1 xs:mb-5 font-dancing-script w-[70%]">
						{title}
					</h3>
					<div
						className="grid gap-2 text-slate-500"
						style={{
							gridTemplateColumns: '0.4fr 1fr',
						}}
					>
						<p className="">{time}</p>
						<p className="">{description}</p>
					</div>
				</div>
			</div>
		);
	}
};

export default ProgramItem;
