import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { MotionPathPlugin, ScrollTrigger } from 'gsap/all';
import { useGLTF } from '@react-three/drei';



export default function PathButterfly() {
    
    function Scene() {
        const { scene } = useGLTF('/assets/3d/animated_butterfly.glb');
        return <primitive object={scene} />
      }

	// Mengembalikan tampilan Canvas dengan elemen SVG dan komponen 3D kupu-kupu
	return (
		<div style={{ height: '100vh', width: '100vw' }}>
			<Canvas>
				<ambientLight intensity={Math.PI / 2} />
				<spotLight
					position={[10, 10, 10]}
					angle={0.15}
					penumbra={1}
					decay={0}
					intensity={Math.PI}
				/>
				<pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
				
			</Canvas>
			,
		</div>
	);
}
