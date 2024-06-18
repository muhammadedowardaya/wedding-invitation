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
  

const animateTextFaded = (selector: string) => {
	const elements = document.querySelectorAll(selector);
	const timeline = gsap.timeline({ repeat: -1, repeatDelay: 2 }); // Create GSAP Timeline

	let delay = 0;

	elements.forEach((element) => {
		const text = element.textContent || '';
		element.textContent = ''; // Clear original text content

		// Split text into words
		const words = text.split(' ');

		words.forEach((word, wordIndex) => {
			const wordWrapper = document.createElement('span');
			wordWrapper.className = 'word'; // Add class for styling
			element.appendChild(wordWrapper);

			// Split word into characters
			const chars = word.split('');

			chars.forEach((char, charIndex) => {
				const charSpan = document.createElement('span');
				charSpan.textContent = char;
				wordWrapper.appendChild(charSpan);

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

			// Add extra delay between words
			delay += 0.4; // Extra delay between words

			// Append space after each word, except the last one
			if (wordIndex < words.length - 1) {
				const space = document.createElement('span');
				space.innerHTML = '&nbsp;'; // Non-breaking space
				element.appendChild(space);
			}
		});
	});

	// Add a delay before starting the reverse animation
	timeline.to({}, { duration: delay + 2 });

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
};
export { animatedElements, animatedElement, animateTyping, animateTextFaded };
