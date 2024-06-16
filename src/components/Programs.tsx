'use client';
import ProgramItem from './ProgramItem';

interface Program {
	title: string;
	time: string;
	description: string;
	imageUrl: string;
}

interface ProgramsProps {
	programs: Program[];
}

const Programs = ({ programs }: ProgramsProps) => {
	return (
		<div className="grid grid-cols-1 p-2 xs:p-4 sm:px-10 md:p-0 md:grid-cols-2 gap-y-4 xs:gap-y-8 md:gap-x-10 lg:gap-x-20 bg-inherit place-items-center content-center">
			{programs.map((program, index) => {
				
					return (
						<ProgramItem
							key={index}
                            number={index + 1}
							title={program.title}
							time={program.time}
							description={program.description}
							imageUrl={program.imageUrl}
							isItemRight={index % 2 !== 0}
						/>
					);
				
			})}
		</div>
	);
};

export default Programs;
