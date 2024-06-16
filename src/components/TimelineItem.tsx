// components/TimelineItem.tsx
import Image from 'next/image';
import useWindowSize from './custom-hook/useWindowSize';

interface TimelineItemProps {
	date: string;
	description: string;
	imageUrl: string;
	isImageLeft: boolean;
}

const TimelineItem = ({
	date,
	description,
	imageUrl,
	isImageLeft,
}: TimelineItemProps) => {
	const { width } = useWindowSize();

	if (width >= 768) {
		return (
			<div
				className="grid place-items-center mb-10 text-slate-600 gap-x-10"
				style={{ gridTemplateColumns: '1fr auto 1fr' }}
			>
				{isImageLeft ? (
					<>
						<div className="ml-auto text-right">
							<h3 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl mb-3">{date}</h3>
							<p>{description}</p>
						</div>
						<div className="relative w-10 h-10 flex justify-center items-center">
							<Image
								src="/assets/fireworks.png"
								alt="fireworks"
								fill
								sizes="100%"
								style={{ objectFit: 'cover' }}
							/>
						</div>
						<div
							className="w-60 h-60 relative mr-auto"
							style={{
								clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
							}}
						>
							<Image
								src={imageUrl}
								alt="event image"
								fill
								sizes="100%"
								style={{ objectFit: 'cover', objectPosition: 'top center' }}
							/>
						</div>
					</>
				) : (
					<>
						<div
							className="w-60 h-60 relative ml-auto"
							style={{
								clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
							}}
						>
							<Image
								src={imageUrl}
								alt="event image"
								fill
								sizes="100%"
								style={{ objectFit: 'cover', objectPosition: 'top center' }}
							/>
						</div>
						<div className="relative w-10 h-10 flex justify-center items-center">
							<Image
								src="/assets/fireworks.png"
								alt="fireworks"
								fill
								sizes="100%"
								style={{ objectFit: 'cover' }}
							/>
						</div>
						<div className="mr-auto">
							<h3 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl mb-3">{date}</h3>
							<p className="text-xl">{description}</p>
						</div>
					</>
				)}
			</div>
		);
	} else {
		return (
			<div className="p-1 xs:p-4 flex flex-col items-center gap-y-2 xs:gap-y-4 justify-center text-center">
				<div className="">
					<h3 className="font-bold text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">{date}</h3>
					<p className="">{description}</p>
				</div>
  
				<div
					className="w-20 h-20 xs:w-60 xs:h-60 relative"
					style={{
						clipPath:
							'polygon(50% 10%, 70% 0, 90% 5%, 100% 25%, 95% 45%, 50% 100%, 5% 45%, 0 25%, 10% 5%, 30% 0)',
					}}
				>
					<Image
						src={imageUrl}
						alt="event image"
						fill
						sizes="100%"
						style={{ objectFit: 'cover', objectPosition: 'top center' }}
					/>
				</div>
			</div>
		);
	}
};

export default TimelineItem;
