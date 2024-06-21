// components/Loading.tsx
const Loading: React.FC = () => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-white z-[999]">
			<div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-blue-500"></div>

			{/* <p class="animate-text-faded">
				<span class="word">
					<span style="opacity: 0;">M</span>
					<span style="opacity: 0;">u</span>
					<span style="opacity: 0;">h</span>
					<span style="opacity: 0;">a</span>
					<span style="opacity: 0;">m</span>
					<span style="opacity: 0;">m</span>
					<span style="opacity: 0;">a</span>
					<span style="opacity: 0;">d</span>
				</span>
				<span> </span>
				<span class="word">
					<span style="opacity: 0;">E</span>
					<span style="opacity: 0;">d</span>
					<span style="opacity: 0;">o</span>
				</span>
				<span> </span>
				<span class="word">
					<span style="opacity: 0;">W</span>
					<span style="opacity: 0;">a</span>
					<span style="opacity: 0;">r</span>
					<span style="opacity: 0;">d</span>
					<span style="opacity: 0;">a</span>
					<span style="opacity: 0;">y</span>
					<span style="opacity: 0;">a</span>
				</span>
			</p> */}
		</div>
	);
};

export default Loading;
