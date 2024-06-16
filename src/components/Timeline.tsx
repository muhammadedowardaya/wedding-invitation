// components/Timeline.tsx
import TimelineItem from './TimelineItem';

interface Event {
	date: string;
	description: string;
	imageUrl: string;
}

interface TimelineProps {
	events: Event[];
}

const Timeline = ({ events }: TimelineProps) => {
	return (
		<div className='flex flex-col gap-y-4'>
			{events.map((event, index) => (
				<TimelineItem
					key={index}
					date={event.date}
					description={event.description}
					imageUrl={event.imageUrl}
					isImageLeft={index % 2 === 0}
				/>
			))}
		</div>
	);
};

export default Timeline;
