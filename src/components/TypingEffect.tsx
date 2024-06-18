// components/TypingEffect.tsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface TypingEffectProps {
  text: string;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text }) => {
  const typingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const typingElement = typingRef.current;
    if (typingElement) {
      // Using an empty object as the target to create a timed animation
      gsap.to({}, {
        duration: text.length * 0.1, // Adjust the duration based on the length of the text
        repeat: 0,
        onUpdate: function () {
          // Calculate the current progress of the animation
          const progress = this.progress() * text.length;
          // Update the text content of the element based on the progress
          typingElement.textContent = text.substring(0, Math.round(progress));
        },
        ease: 'none'
      });
    }
  }, [text]);

  return <div ref={typingRef} className="typing"></div>;
};

export default TypingEffect;
