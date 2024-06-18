import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

const Butterfly = () => {
	const { scene } = useGLTF('/assets/3d/animated_butterfly.glb');
	const butterflyRef = useRef<any>();

	useFrame(() => {
		if (butterflyRef.current) {
			butterflyRef.current.rotation.y += 0.01;
		}
	});

	useEffect(() => {
		if (butterflyRef.current) {
			gsap.to(butterflyRef.current.position, {
				duration: 10,
				repeat: -1,
				ease: 'power1.inOut',
				motionPath: {
					path: '#svgPath',
					align: '#svgPath',
					alignOrigin: [0.5, 0.5],
				},
			});
		}
	}, []);

	return <primitive ref={butterflyRef} object={scene} />;
};

const ButterflyAnimation = () => {
	return (
		<div style={{ height: '100vh', width: '100vw' }}>
			<svg
				id="svgPath"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 100 100"
				style={{ visibility: 'hidden', position: 'absolute' }}
			>
				<path d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80" />
			</svg>
			<Canvas>
				<ambientLight intensity={0.5} />
				<pointLight position={[10, 10, 10]} />
				<Butterfly />
				<OrbitControls />
			</Canvas>
		</div>
	);
};

export default ButterflyAnimation;
