import gsap from 'gsap';

import './animated.css';
const animatedElements = (selector: string) => {
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
					end: 'center 80%', // end animating when the bottom of the element hits the center of the viewport
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

const animateTyping = (selector: string) => {
	const elements = document.querySelectorAll(selector);
	const timeline = gsap.timeline({ repeat: -1, repeatDelay: 2 }); // Repeat indefinitely with a delay

	elements.forEach((element) => {
		const text = element.textContent || '';
		const textLength = text?.length;

		if (textLength !== undefined) {
			timeline
				.from(element, {
					opacity: 0,
					duration: 1,
					onStart: function () {
						// element.textContent = ''; // Clear the text content before starting the animation
					},
				})
				.to(
					element,
					{
						opacity: 1,
						duration: textLength * 0.1, // Adjust the duration based on the length of the text
						onUpdate: function () {
							// Calculate the current progress of the animation
							const progress = this.progress() * textLength;
							// Update the text content of the element based on the progress
							element.textContent = text.substring(0, Math.round(progress));
						},
						ease: 'ease-in',
					},
					'+=0.5' // Delay between each element's animation
				);
		}
	});
};

const animateTextFaded = (selector: string) => {
	const elements = document.querySelectorAll(selector);
	const timeline = gsap.timeline({ repeat: -1, repeatDelay: 2 }); // Create GSAP Timeline

	let delay = 0;

	elements.forEach((element) => {
		const text = element.textContent || '';
		const textLength = text.length;
		element.textContent = '';

		// Create a span element for each character
		for (let i = 0; i < textLength; i++) {
			const char = document.createElement('span');
			char.textContent = text.charAt(i);
			element.appendChild(char);

			// Check if the character is a space and add special handling
			if (text.charAt(i) === ' ') {
				char.innerHTML = '&nbsp;'; // Use non-breaking space entity
			}
		}

		// Animate each span to appear sequentially
		timeline.to(
			element.querySelectorAll('span'),
			{
				opacity: 1,
				duration: 0.5, // Adjust the duration based on the speed you want
				stagger: 0.1, // Stagger the animation by 0.1s per span
				ease: 'none',
			},
			delay,
		);

		// Calculate the delay for the next element based on its text length
		delay += textLength * 0.1 + 0.5; // Adjust the delay as needed
	});

	// Add a delay before starting the reverse animation
    timeline.to({}, { duration: delay + 2 });

    // Reverse animation: animate each span to disappear sequentially
    elements.forEach((element) => {
      timeline.to(element.querySelectorAll('span'), {
        opacity: 0,
        duration: 0.2,
        stagger: 0.1,
        ease: 'none',
      }, '+=0'); // Start immediately after the delay
    });
	
};

export { animatedElements, animatedElement, animateTyping, animateTextFaded };
