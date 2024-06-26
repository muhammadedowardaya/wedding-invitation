import gsap from 'gsap';

import './animated.css';
import { useAppDispatch } from '@/app/hooks';
import { setDuration } from '@/features/animateTextFadedDuration/animateTextFadedDurationSlice';
const animatedElements = (
	selector: string,
	endPositionElement: string = 'center',
	endPositionView: string = '80%'
) => {
	const elements = document.querySelectorAll(selector);
	elements.forEach((element) => {
		gsap.fromTo(
			element,
			{
				opacity: 0.5,
				y: 100,
				scale: 0.3,
			},
			{
				opacity: 1,
				y: 0,
				scale: 1,
				duration: 1,
				scrollTrigger: {
					trigger: element,
					start: 'top bottom', // start animating when the top of the element hits the center of the viewport
					end: `${endPositionElement} ${endPositionView}`, // end animating when the bottom of the element hits the center of the viewport
					scrub: 1, // smooth scrubbing with slight delay
					toggleActions: 'play reverse play reverse', // onEnter, onLeave, onEnterBack, onLeaveBack
				},
			}
		);
	});
};

const animatedElement = (
	selector: string,
	endPositionElement: string = 'center',
	endViewHeight: string = '85%'
) => {
	const element = document.querySelector(selector);

	gsap.fromTo(
		element,
		{
			opacity: 0.5,
			y: 100,
			scale: 0.3,
		},
		{
			opacity: 1,
			y: 0,
			scale: 1,
			duration: 1,
			scrollTrigger: {
				trigger: element,
				start: 'top bottom', // start animating when the top of the element hits the center of the viewport
				end: `${endPositionElement} ${endViewHeight}`, // end animating when the bottom of the element hits the center of the viewport
				scrub: 1, // smooth scrubbing with slight delay
				toggleActions: 'play reverse play reverse', // onEnter, onLeave, onEnterBack, onLeaveBack
			},
		}
	);
};

// const animateTyping = (selector: string) => {
// 	const elements = document.querySelectorAll(selector);
// 	const timeline = gsap.timeline({ repeat: -1, repeatDelay: 2 }); // Repeat indefinitely with a delay

// 	elements.forEach((element) => {
// 		const text = element.textContent || '';
// 		const textLength = text?.length;

// 		if (textLength !== undefined) {
// 			timeline
// 				.from(element, {
// 					opacity: 0,
// 					duration: 1,
// 					onStart: function () {
// 						// element.textContent = ''; // Clear the text content before starting the animation
// 					},
// 				})
// 				.to(
// 					element,
// 					{
// 						opacity: 1,
// 						duration: textLength * 0.1, // Adjust the duration based on the length of the text
// 						onUpdate: function () {
// 							// Calculate the current progress of the animation
// 							const progress = this.progress() * textLength;
// 							// Update the text content of the element based on the progress
// 							element.textContent = text.substring(0, Math.round(progress));
// 						},
// 						ease: 'ease-in',
// 					},
// 					'+=0.5' // Delay between each element's animation
// 				);
// 		}
// 	});
// };

const animateTyping = (selector: string) => {
	const elements = document.querySelectorAll(selector);
	const timeline = gsap.timeline({ repeat: -1, repeatDelay: 2 }); // Repeat indefinitely with a delay

	elements.forEach((element) => {
		const text = element.textContent || '';
		const textLength = text.length;

		timeline.from(element, {
			opacity: 0,
			duration: 1,
			onStart: function () {
				// Clear the text content before starting the animation
				element.textContent = '';
			},
		});

		// Typing animation
		timeline.to(
			element,
			{
				opacity: 1,
				duration: textLength * 0.1, // Adjust the duration based on the length of the text
				onUpdate: function () {
					// Calculate the current progress of the animation
					const progress = this.progress() * textLength;
					// Update the text content of the element based on the progress
					element.textContent = text.substring(0, Math.ceil(progress));
				},
				ease: 'ease-in',
			},
			'+=0.5' // Delay before starting the reverse animation
		);

		// Reverse animation: animate back to empty text
		timeline.to(
			element,
			{
				opacity: 0,
				duration: textLength * 0.1,
				onUpdate: function () {
					// Calculate the current progress of the animation
					const progress = (1 - this.progress()) * textLength;
					// Update the text content of the element based on the progress
					element.textContent = text.substring(0, Math.ceil(progress));
				},
				ease: 'ease-out',
			},
			`+=${textLength * 0.1 + 0.5}` // Delay before starting the reverse animation
		);
	});
};

const animateTextFaded = (selector: string, dispatch?: any) => {
	const elements = document.querySelectorAll(selector);
	const timeline = gsap.timeline({ repeat: -1, repeatDelay: 2 }).pause(); // Create GSAP Timeline

	let delay = 0;
	let totalDuration = 0;

	elements.forEach((element) => {
		const text = element.textContent || '';
		element.textContent = ''; // Clear original text content

		// Split text into words
		const words = text.split(' '); // ["Muhammad", "Edo", "Wardaya"]

		words.forEach((word, wordIndex) => {
			// Create wrapper for each word
			const wordWrapper = document.createElement('span');
			wordWrapper.className = 'word'; // Add class for styling

			// Split word into characters
			const chars = word.split(''); // ["M", "u", "h", "a", "m", "m", "a", "d"]

			chars.forEach((char) => {
				// Create span for each character
				const charSpan = document.createElement('span');
				charSpan.textContent = char;
				wordWrapper.appendChild(charSpan); // Append character span to word wrapper

				// Animate each character to appear sequentially
				timeline.to(
					charSpan,
					{
						opacity: 1,
						duration: 0.5, // Adjust the duration based on the speed you want
						ease: 'none',
					},
					delay
				);

				delay += 0.1; // Stagger animation by 0.1s per character
			});

			// Append wordWrapper to element
			element.appendChild(wordWrapper);

			// Add extra delay between words
			delay += 0.4; // Extra delay between words

			// Append a space after each word, except the last one
			if (wordIndex < words.length - 1) {
				const space = document.createTextNode(' ');
				element.appendChild(space);
			}
		});
	});

	totalDuration = delay + 2; // Include additional delay before reverse animation

	// Add a delay before starting the reverse animation
	timeline.to({}, { duration: totalDuration });

	// Reverse animation: animate each character to disappear sequentially
	elements.forEach((element) => {
		const chars = element.querySelectorAll('.word span');

		timeline.to(
			chars,
			{
				opacity: 0,
				duration: 0.1,
				ease: 'none',
				stagger: 0.1,
			},
			'-=0.2' // Reverse starts 0.2s earlier
		);
	});

	if (dispatch) {
		// Dispatch the total duration to Redux state
		dispatch(setDuration(totalDuration));
	}

	return timeline;
};

export { animatedElements, animatedElement, animateTyping, animateTextFaded };
