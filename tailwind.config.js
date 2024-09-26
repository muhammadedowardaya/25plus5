/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			screens: {
				xs: '360px', // Ukuran kustom xs
				sm: '768px', // Ukuran kustom sm
				md: '1024px', // Ukuran default md
				lg: '1280px', // Ukuran default lg
			},
		},
	},
	plugins: [],
};
