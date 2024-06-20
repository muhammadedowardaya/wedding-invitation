'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { BiSolidQuoteAltLeft } from 'react-icons/bi';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
// import required modules
import { FreeMode, Scrollbar, Mousewheel } from 'swiper/modules';
import PlayButton from '@/components/PlayButton';
import useWindowSize from '@/components/custom-hook/useWindowSize';
import Timeline from '@/components/Timeline';
import Programs from '@/components/Programs';

import dynamic from 'next/dynamic';
import Loading from '@/components/Loading';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { animatedElements } from '@/utils/animated';
import StoreProvider from '@/app/StoreProvider';

const MapInvitation = dynamic(() => import('@/components/MapInvitation'), {
	ssr: false,
});

const events = [
	{
		date: '29 March 2022',
		description:
			'Awal kenal manusia ini, karena video dia fyp di tiktok pak hehe...',
		imageUrl: '/couple-images/couple-1.jpg',
	},
	{
		date: '15 April 2022',
		description: 'Our first date',
		imageUrl: '/couple-images/couple-2.jpg',
	},
	{
		date: '30 June 2022',
		description: 'We traveled to Paris',
		imageUrl: '/couple-images/couple-1.jpg',
	},
	{
		date: '10 October 2022',
		description: 'We got engaged',
		imageUrl: '/couple-images/couple-2.jpg',
	},
	{
		date: '25 December 2022',
		description: 'We celebrated Idul Fitri together wkwk kocak',
		imageUrl: '/couple-images/couple-1.jpg',
	},
];

// const myEvents = [
// 	{
// 		date: '29 March 2022',
// 		description: 'We first met in New York City',
// 		imageUrl: '/couple-images/couple-1.jpg',
// 	},
// 	{
// 		date: '15 April 2022',
// 		description: 'Our first date',
// 		imageUrl: '/couple-images/couple-2.jpg',
// 	},
// 	{
// 		date: '30 June 2022',
// 		description: 'We traveled to Paris',
// 		imageUrl: '/couple-images/couple-1.jpg',
// 	},
// 	{
// 		date: '10 October 2022',
// 		description: 'We got engaged',
// 		imageUrl: '/couple-images/couple-2.jpg',
// 	},
// 	{
// 		date: '25 December 2022',
// 		description: 'We celebrated Christmas together',
// 		imageUrl: '/couple-images/couple-1.jpg',
// 	},
// ];

const programs = [
	{
		title: 'Ceremony',
		time: '12:00 AM',
		description: '1 Pico Blvd, Santa Monica, CA 90405',
		imageUrl: '/couple-images/couple-1.jpg',
	},
	{
		title: 'Wedding lunch',
		time: '14:00 PM',
		description: '415 Pacific Coast Hwy, Santa Monica, CA 90402',
		imageUrl: '/couple-images/couple-2.jpg',
	},
	{
		title: 'Cocktail party',
		time: '16:00 PM',
		description: '415 Pacific Coast Hwy, Santa Monica, CA 90402',
		imageUrl: '/couple-images/couple-1.jpg',
	},
	{
		title: 'Cake cutting',
		time: '18:00 PM',
		description: '415 Pacific Coast Hwy, Santa Monica, CA 90402',
		imageUrl: '/couple-images/couple-2.jpg',
	},
];

type FormData = {
	name: string;
	attendance: string;
	message: string;
};

export default function Example1() {
	const [loading, setLoading] = useState(true);

	const { width } = useWindowSize();

	const [formData, setFormData] = useState<FormData>({
		name: '',
		attendance: '',
		message: '',
	});

	const [isFocused, setIsFocused] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		field: keyof FormData
	) => {
		setFormData({ ...formData, [field]: e.target.value });
	};

	useEffect(() => {
		// Function to check document readiness
		const checkDocumentReady = () => {
			if (document.readyState === 'complete') {
				setLoading(false);
				// --------------------------------------
			} else {
				setLoading(true);
			}
		};

		// Initial check
		checkDocumentReady();

		// Event listener for state changes
		document.addEventListener('readystatechange', checkDocumentReady);

		// Cleanup event listener
		return () => {
			document.removeEventListener('readystatechange', checkDocumentReady);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);
		animatedElements('#date .animasi','center');
		animatedElements('#about-us .animasi','center');
		animatedElements('#love-story .animasi', 'center', '90%');
		animatedElements('#program .animasi','center');
		animatedElements('#notes','center');
		animatedElements('#contact .animasi','center');
		animatedElements('#message .animasi','center');
		animatedElements('#quotes .animasi','center');
	}, []);

	const handleNavLink = (e: any) => {
		e.preventDefault();
		const target = e.target.hash;
		gsap.to(window, {
			duration: 1,
			scrollTo: target,
		});
	};

	return (
		<div className="font-poppins relative overflow-hidden">
			{loading && <Loading />}
			<header className="bg-[#a8c5c9] relative h-max pb-4 xs:pb-20 md:h-[750px] lg:h-[760px] 2xl:h-[820px]">
				<nav className="flex justify-center text-white font-semibold py-1 sm:py-4 z-20">
					<ul className="flex items-center gap-x-4">
						<li className="block">
							<Link
								href="#our"
								className="flex flex-col items-center px-8 py-1 font-great-vibes text-gray-700"
							>
								<div className="relative w-5 h-5 xs:w-10 xs:h-10">
									<Image
										src="/icons/leaf.svg"
										alt="leaf icon"
										fill
										sizes="100%"
										className="-rotate-[65deg] w-auto h-auto"
									/>
								</div>
								<div className="text-sm sm:text-xl font-bold flex items-center gap-x-2">
									E <span className="text-sm">&</span> M
								</div>
							</Link>
						</li>
					</ul>
				</nav>
				<section className="z-10 text-white flex flex-col items-center justify-center pt-5 xs:pt-10 md:pt-16 md:pb-80">
					<h1 className="text-center text-sm xs:text-3xl md:text-5xl lg:text-6xl xl:text-7xl md:px-10 font-bold flex flex-col items-center w-[80%] md:w-[90%] px-8 gap-x-2 mb-4">
						<p className="animate-text-faded">Muhammad Edo Wardaya</p>
						<p className="animate-text-faded py-2">&</p>
						<p className="animate-text-faded">Tri Meliana Sari</p>
					</h1>
					<p className="animate-text-faded font-dancing-script text-sm xs:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
						are getting married
					</p>
					<div className="relative mt-2 xs:mt-10 border-none md:border-4 w-20 h-20 xs:w-52 xs:h-52 sm:w-72 sm:h-72 md:w-[600px] md:h-[380px] lg:w-[700px] lg:h-[380px] 2xl:w-[800px] 2xl:h-[450px] border-white md:bg-slate-600">
						<Image
							src="/couple-images/couple-1.jpg"
							alt="wedding invitation"
							fill
							sizes="100%"
							objectFit="cover"
							priority
							style={{
								objectPosition: '50% 20%',
								clipPath: `${
									width >= 768
										? ''
										: 'polygon(50% 10%, 70% 0, 90% 5%, 100% 25%, 95% 45%, 50% 100%, 5% 45%, 0 25%, 10% 5%, 30% 0)'
								}`,
							}}
						/>
					</div>
				</section>
			</header>
			<section
				id="date"
				className="text-center pt-8 px-10 pb-8 md:pt-40 md:pb-20 lg:pb-40 lg:pt-48 xl:pt-52 2xl:pt-56  flex flex-col items-center text-[#6c8ca3]"
			>
				<div className="">
					<h2 className="animasi text-base xs:text-3xl md:text-5xl lg:text-6xl font-bold">
						20 July 2024
					</h2>
					<p className="animasi mt-2 font-dancing-script text-sm xs:text-xl md:text-3xl lg:text-4xl text-[#424f5a]">
						in Santa Monica, California
					</p>
					<div className="animasi flex justify-center xs:mt-10">
						<Image
							src="/assets/outline-flower.png"
							alt="outline flower"
							width={1000}
							height={20}
							className="w-[10rem] md:w-[20rem] lg:w-[30rem] mt-2 rotate-180"
						/>
					</div>
					<div className="animasi flex justify-center">
						<Image
							src="/assets/save-the-date.png"
							alt="outline flower"
							width={1000}
							height={20}
							className="w-[10rem] md:w-[15rem] lg:w-[20rem]"
						/>
					</div>
					<div className="animasi flex justify-center">
						<Image
							src="/assets/outline-flower.png"
							alt="outline flower"
							width={1000}
							height={20}
							className="w-[10rem] md:w-[20rem] lg:w-[30rem] mt-2"
						/>
					</div>
				</div>
			</section>
			<section
				id="about-us"
				className={`bg-[#edf6f8] relative text-slate-600 grid gap-y-4 xs:gap-y-10 justify-center py-4 xs:py-10 px-4 xs:px-6 lg:py-0 lg:px-0 gap-x-40 md:gap-x-14 lg:gap-x-10 xl:gap-x-16`}
				style={{
					gridTemplateColumns: `${width >= 1024 ? 'auto auto' : 'auto'}`,
				}}
			>
				<div
					className={`${
						width >= 1024 ? '' : 'animasi'
					} lg:col-start-2 w-full mx-auto md:ml-auto sm:w-96 md:w-[400px] lg:relative 2xl:w-[500px] -top-20 flex flex-col gap-y-2 xs:gap-y-4`}
				>
					<h3 className="lg:order-2 font-dancing-script text-slate-800 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
						M Edo Wardaya
					</h3>
					<p className="lg:order-3 2xl:text-justify">
						Mahluk kasat mata yang sangat tamvan, dia juga seorang programmer.
					</p>
					<div className="lg:order-1 w-full h-24 xs:h-60 2xl:h-80 px-4 xs:border-4 border-white relative">
						<Image
							src="/couple-images/couple-1.jpg"
							alt="ana's photo"
							fill
							sizes="100%"
							objectFit="cover"
							priority
						/>
					</div>
				</div>
				<div
					className={`${
						width >= 1024 ? '' : 'animasi'
					} lg:col-start-1 lg:row-start-1 w-full mx-auto md:mr-auto sm:w-96 md:w-[400px] 2xl:w-[500px] lg:relative -bottom-20 flex flex-col gap-y-2 xs:gap-y-4`}
				>
					<h3 className="font-dancing-script text-slate-800  text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
						Tri Meliana Sari
					</h3>
					<p className="2xl:text-justify">
						Makhluk Tuhan yang sangat cangtip, btw dia ownernya Meliana Flowers.
					</p>
					<div className="w-full h-24 xs:h-60 2xl:h-80 px-4 xs:border-4 border-white relative">
						<Image
							src="/couple-images/couple-1.jpg"
							alt="ana's photo"
							fill
							sizes="100%"
							objectFit="cover"
							priority
						/>
					</div>
				</div>
			</section>
			<section
				id="love-story"
				className="py-8 xs:py-16 px-10 md:pt-24 lg:pt-52 lg:pb-16 text-slate-600"
			>
				<div className="text-center mb-10 xs:mb-20 md:mb-36">
					<h2 className="animasi font-bold text-lg xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-2">
						OUR LOVE STORY
					</h2>
					<p className="animasi font-dancing-script text-base xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
						This is how it all started
					</p>
				</div>
				<Timeline events={events} />
			</section>
			<section
				id="program"
				className="bg-[#edf6f8] text-slate-600 py-8 xs:py-16 md:py-24 lg:py-28 xl:py-36"
			>
				<div className="text-center mb-5 xs:mb-10 md:mb-20 lg:mb-32 xl:mb-40">
					<h2 className="animasi font-bold text-lg xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-2">
						WEDDING PROGRAM
					</h2>
					<p className="animasi font-dancing-script text-base xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
						We planned the day carefully
					</p>
				</div>
				<Programs programs={programs} />
			</section>
			<div
				id="notes"
				className=" animasi
                    h-[150px] w-full pl-2 pr-6 pb-6
                    xs:h-[350px] xs:pb-14 xs:px-14 xs:p-4
                    sm:px-20 md:pb-20 lg:pb-24 xl:pb-28
                    md:h-[450px] lg:h-[500px] xl:h-[550px]
                "
			>
				<h2 className="text-center pb-5 xs:pb-8 sm:pb-9 md:pb-10 lg:pb-11 xl:pb-12 pt-5 font-bold text-lg xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
					CATATAN
				</h2>
				<Swiper
					direction={'vertical'}
					slidesPerView={'auto'}
					freeMode={true}
					scrollbar={true}
					mousewheel={true}
					modules={[FreeMode, Scrollbar, Mousewheel]}
					className="!h-full px-2"
				>
					<SwiperSlide className="!h-auto p-2">
						<h1 className="break-words font-bold text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
							TURUT MENGUNDANG
						</h1>
						<ul className="list-disc pl-4">
							<li>Upin</li>
							<li>Ipin</li>
							<li>Boboyboy</li>
							<li>Adudu</li>
							<li>Kak Ros</li>
							<li>Tok Dalang</li>
							<li>Jarjit</li>
							<li>Squidward</li>
							<li>Spongebob</li>
							<li>Patrick</li>
							<li>Sandy</li>
							<li>Tn Crab</li>
							<li>Upin</li>
							<li>Ipin</li>
							<li>Boboyboy</li>
							<li>Adudu</li>
							<li>Kak Ros</li>
							<li>Tok Dalang</li>
							<li>Jarjit</li>
							<li>Squidward</li>
							<li>Spongebob</li>
							<li>Patrick</li>
							<li>Sandy</li>
							<li>Tn Crab</li>
						</ul>
					</SwiperSlide>
				</Swiper>
			</div>

			<section id="contact" className="pt-14 px-0 xs:px-4 md:p-20">
				<div className="bg-[#a8c5c9] pt-5 xs:pt-20 md:py-20 relative h-max md:h-[500px]">
					<h2 className="animasi text-center mx-auto w-[90%] text-base xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white mb-2">
						KINDLY RESPOND BY MAY
					</h2>
					<p className="animasi text-center mx-auto w-[80%] font-dancing-script text-base xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-white">
						Will you share the joy with us?
					</p>
					<form
						action=""
						className="animasi w-full md:w-[500px] lg:w-[600px] xl:w-[700px] mx-auto bg-white py-8 xs:py-12 px-4 md:px-10 mt-4 xs:mt-20 text-slate-500 relative md:border-b-[6px] border-[#f4e8e3]"
					>
						<div className="relative">
							<label
								htmlFor="name"
								className={`transition-all duration-300 absolute ${
									formData.name || isFocused ? '-top-6 left-0' : '-top-1'
								}`}
							>
								Name
							</label>
							<input
								type="text"
								id="name"
								name="name"
								onChange={(e) => handleChange(e, 'name')}
								value={formData.name}
								className="border-b border-[#a8c5c9] w-full focus-visible:outline-none focus-visible:border-b text-slate-400"
								onFocus={() => setIsFocused(true)}
								onBlur={() => setIsFocused(false)}
							/>
						</div>
						<div className="mt-5 flex gap-y-2 sm:flex-row flex-wrap gap-x-8">
							<div className="flex flex-row-reverse gap-x-2 items-center">
								<label htmlFor="yes">Yes, I will be there</label>
								<input
									type="radio"
									id="yes"
									name="attendance"
									value="Yes, I Will be there"
									onChange={(e) => handleChange(e, 'attendance')}
									checked={formData.attendance === 'Yes, I Will be there'}
									className="appearance-none w-5 h-5 rounded-full bg-slate-300 checked:bg-white checked:border-slate-300 checked:border-4"
								/>
							</div>
							<div className="flex flex-row-reverse gap-x-2 items-center">
								<label htmlFor="no">{`Sorry, I can't come`}</label>
								<input
									type="radio"
									id="no"
									name="attendance"
									value="Sorry, I can't come"
									onChange={(e) => handleChange(e, 'attendance')}
									checked={formData.attendance === "Sorry, I can't come"}
									className="appearance-none w-5 h-5 rounded-full bg-slate-300 checked:bg-white checked:border-slate-300 checked:border-4"
								/>
							</div>
						</div>
						<div className="flex flex-col mt-5">
							<label htmlFor="message">Message</label>
							<textarea
								name="message"
								id="message"
								onChange={(e) => handleChange(e, 'message')}
								value={formData.message}
								className="resize-none h-14 xs:h-32 sm:h-48 focus-visible:outline-none mt-4 p-1 border border-slate-300"
							></textarea>
						</div>
						<div className="flex justify-center items-center mt-8">
							<button
								type="submit"
								className="bg-[#e2b2a0] text-white py-1 xs:py-2 lg:py-4 px-8 text-sm xs:text-base sm:text-xl md:text-2xl lg:text-3xl  font-semibold
                                
                            "
							>
								Send
							</button>
						</div>
					</form>
				</div>
				<div className="h-0 md:h-[300px]"></div>
			</section>
			<div
				id="message"
				className="animasi
                h-[400px] xs:h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] xl:h-[650px] w-full pr-6 
                xs:pr-8 sm:px-16 md:px-28 lg:px-32 xl:px-36 2xl:px-40
                pb-20 xs:pb-28 lg:pb-32 xl:pb-36 xs:pt-5 sm:pt-10 md:pt-5 lg:pt-20
            "
			>
				<h2 className="text-center p-2 pb-5 xs:pb-7 sm:pb-8 md:pb-9 lg:pb-10 xl:pb-12 font-bold text-lg xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
					PESAN
				</h2>
				<Swiper
					direction={'vertical'}
					slidesPerView={'auto'}
					freeMode={true}
					scrollbar={true}
					mousewheel={true}
					modules={[FreeMode, Scrollbar, Mousewheel]}
					className="!h-full"
				>
					<SwiperSlide className="!h-auto pr-2 xs:p-4 !flex !flex-col pb-10 !gap-y-5 md:!gap-y-10">
						<div className="shadow w-full rounded p-2">
							<p className="p-1 xs:p-2 lg:py-4 xl:py-5  font-bold text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
								Muhammad Edo Wardaya
							</p>
							<hr />
							<p className="p-1 xs:p-2 lg:py-4 xl:py-5  text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
								Wah selamat ya... semoga menjadi keluarga yang sakinah mawaddah
								warahmah
							</p>
							<hr />
							<p className="p-1 xs:p-2 lg:py-4 xl:py-5  italic">
								Yes, I will be there
							</p>
						</div>
						<div className="shadow w-full rounded p-2">
							<p className="p-1 xs:p-2 lg:py-4 xl:py-5  font-bold text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
								Tri Meliana Sari
							</p>
							<hr />
							<p className="p-1 xs:p-2 lg:py-4 xl:py-5  text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam
								debitis facilis laudantium perspiciatis magni molestias
								aspernatur vitae consequuntur et a!
							</p>
							<hr />
							<p className="p-1 xs:p-2 lg:py-4 xl:py-5  italic">
								Yes, I will be there
							</p>
						</div>
						<div className="shadow w-full rounded p-2">
							<p className="p-1 xs:p-2 lg:py-4 xl:py-5  font-bold text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
								Muhammad Yusuf
							</p>
							<hr />
							<p className="p-1 xs:p-2 lg:py-4 xl:py-5  text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut vel
								obcaecati officiis quia.
							</p>
							<hr />
							<p className="p-1 xs:p-2 lg:py-4 xl:py-5  italic">
								Yes, I will be there
							</p>
						</div>
						<div className="shadow w-full rounded p-2">
							<p className="p-1 xs:p-2 lg:py-4 xl:py-5  font-bold text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
								Ahmad
							</p>
							<hr />
							<p className="p-1 xs:p-2 lg:py-4 xl:py-5  text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
								in sit, ut voluptas molestiae veritatis pariatur blanditiis ipsa
								enim neque?
							</p>
							<hr />
							<p className="p-1 xs:p-2 lg:py-4 xl:py-5  italic">
								Yes, I will be there
							</p>
						</div>
						<div className="shadow w-full rounded p-2">
							<p className="p-1 xs:p-2 lg:py-4 xl:py-5  font-bold text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
								Squidward
							</p>
							<hr />
							<p className="p-1 xs:p-2 lg:py-4 xl:py-5  text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
								consectetur iusto libero, repellendus quis ab impedit tempore.
								Expedita, reiciendis, aliquid esse facilis eaque consequuntur et
								doloribus explicabo quod maxime dolorem!
							</p>
							<hr />
							<p className="p-1 xs:p-2 lg:py-4 xl:py-5  italic">
								Yes, I will be there
							</p>
						</div>
					</SwiperSlide>
				</Swiper>
			</div>
			<section
				id="quotes"
				className="relative flex flex-col items-center bg-[#ebf3f6] text-slate-600"
			>
				<BiSolidQuoteAltLeft className="absolute -top-5 md:-top-14 text-4xl md:text-8xl " />
				<h2 className="py-5 md:py-24 px-2 xs:px-8 md:px-20 font-dancing-script text-lg xs:text-2xl text-center w-[90%] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold">
					Whatever our souls are made of his and mine are the same
				</h2>
			</section>
			<section id="location" className="animasi">
				<MapInvitation targetLocation={[-6.655007, 106.710826]} />
			</section>
			<footer className="p-8 flex justify-center items-center mb-20 sm:mb-14 lg:mb-28">
				<div className="text-center mx-auto font-bold flex flex-col justify-center">
					<Image
						src="/icons/leaf.svg"
						alt="leaf icon"
						width={60}
						height={60}
						className="-rotate-[65deg] h-auto w-auto"
					/>
					<h2 className="font-great-vibes text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
						E & M
					</h2>
				</div>
			</footer>
			<StoreProvider>
				<PlayButton audioFile="Sheila_On_7_-_Hingga_Ujung_Waktu__Lyrics_(128k).mp3" />
			</StoreProvider>
			<nav className="sm:flex hidden sm:fixed bottom-0 left-0 right-0 bg-[#a8c5c9] justify-center text-white font-semibold py-1 sm:py-4 z-[888]">
				<ul className="flex items-center gap-x-4">
					<li className="hidden sm:block">
						<Link
							href="#date"
							className="block px-4 py-1"
							onClick={handleNavLink}
						>
							Date
						</Link>
					</li>
					<li className="hidden sm:block">
						<Link
							href="#about-us"
							className="block px-4 py-1"
							onClick={handleNavLink}
						>
							About Us
						</Link>
					</li>
					<li className="hidden sm:block">
						<Link
							href="#love-story"
							className="block px-4 py-1"
							onClick={handleNavLink}
						>
							Love Story
						</Link>
					</li>
					<li className="block sm:hidden lg:block">
						<Link
							href="#"
							className="flex flex-col items-center px-8 py-1 font-great-vibes text-gray-700"
						>
							<div className="relative w-5 h-5 xs:w-10 xs:h-10">
								<Image
									src="/icons/leaf.svg"
									alt="leaf icon"
									fill
									sizes="100%"
									className="-rotate-[65deg] w-auto h-auto"
								/>
							</div>
							<div className="text-sm sm:text-xl font-bold flex items-center gap-x-2">
								E <span className="text-sm">&</span> M
							</div>
						</Link>
					</li>
					<li className="hidden sm:block">
						<Link
							href="#program"
							className="block px-4 py-1"
							onClick={handleNavLink}
						>
							Program
						</Link>
					</li>
					<li className="hidden sm:block">
						<Link
							href="#contact"
							className="block px-4 py-1"
							onClick={handleNavLink}
						>
							Contact
						</Link>
					</li>
					<li className="hidden sm:block">
						<Link
							href="#location"
							className="block px-4 py-1"
							onClick={handleNavLink}
						>
							Location
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}
