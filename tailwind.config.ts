import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			fontFamily: {
				'dancing-script': ['Dancing Script', 'cursive'],
				montserrat: ['Montserrat', 'sans-serif'],
				'great-vibes': ['Great Vibes', 'cursive'],
				poppins: ['Poppins', 'sans-serif'],
				merriweather: ['Merriweather', 'serif'],
				cinzel: ['Cinzel', 'serif'],
				'open-sans': ['Open Sans', 'sans-serif'],
				raleway: ['Raleway', ' sans-serif'],
			},
			screens: {
				// Breakpoint kustom
				xs: '300px',
				iphone5: '320px',
				iphone15promax: '430px',
			},
			fontSize: {
				xxs: '0.65rem', // Ukuran teks sangat kecil
			},
		},
	},
	plugins: [],
};
export default config;
