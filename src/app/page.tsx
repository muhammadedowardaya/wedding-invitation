'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AiFillTikTok } from 'react-icons/ai';
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa';

const templates = [
	{ id: 1, name: 'Template 1', thumbnail: '/icons/mail-invitation.svg' },
	{ id: 2, name: 'Template 2', thumbnail: '/icons/mail-invitation.svg' },
	// Tambahkan lebih banyak template sesuai kebutuhan
];

type FormData = {
	name: string;
	message: string;
};

export default function Home() {
	const [formData, setFormData] = useState<FormData>({
		name: '',
		message: '',
	});

	const [isFocused, setIsFocused] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		field: keyof FormData
	) => {
		setFormData({ ...formData, [field]: e.target.value });
	};

	return (
		<div className="bg-[#e7f3f3] font-raleway overflow-x-hidden">
			<header className="px-10">
				<nav className="flex items-center justify-between py-2">
					<div className="font-dancing-script font-bold text-xl">My Brand</div>
					<ul className="flex gap-x-4 text-slate-700">
						<li>
							<Link href="#" className='py-2 px-4'>Home</Link>
						</li>
						<li>
							<Link href="#" className='py-2 px-4'>Layanan</Link>
						</li>
						<li>
							<Link href="#" className='py-2 px-4'>Galeri</Link>
						</li>
						<li>
							<Link href="#" className='py-2 px-4'>Testimoni</Link>
						</li>
						<li>
							<Link href="#">Kontak</Link>
						</li>
					</ul>
				</nav>
				<section
					className="grid relative pt-10"
					style={{ gridTemplateColumns: '2fr 1.5fr' }}
				>
					<div className="p-14 pb-28">
						<h1 className="md:text-7xl font-great-vibes">This is my Brand!</h1>
						<p className="md:text-xl">
							Buat Perayaan mu lebih menyenangkan dengan kehadiran orang spesial
							atau teman terbaik mu!
						</p>
						<button className="md:text-base mt-8 text-white py-2 px-4 bg-gradient-to-tr from-[#293435] to-[#758997]">
							Buat Undangan
						</button>
					</div>
					<div className="relative">
						<a
							href="https://storyset.com/event"
							target="_blank"
							className="relative -bottom-6 block w-full h-full"
						>
							<Image
								src="/assets/celebrate.svg"
								alt="banner"
								fill
								sizes="100%"
								className="transform -scale-x-[1] z-10"
							/>
						</a>
						<Image
							src="/assets/blob.svg"
							alt="banner"
							fill
							sizes="100%"
							className="relative scale-150"
						/>
					</div>
				</section>
			</header>
			<section className="bg-white">
				<h2 className="font-cinzel md:text-3xl p-20 font-bold text-center text-slate-700">
					Buat undangan online yang memukau dengan mudah! Pilih dari berbagai
					template yang tersedia dan sesuaikan dengan jenis undangan yang Anda
					inginkan
				</h2>
			</section>
			<section className="text-slate-700 py-14">
				<div className="py-8">
					<h2 className="md:text-3xl font-bold p-5 text-center">
						Jenis Layanan Undangan
					</h2>
					<p className="text-center md:text-xl">
						Terdapat beberapa jenis template undangan yang tersedia, anda dapat
						pilih sesuai kebutuhan
					</p>
				</div>
				<div className="flex gap-x-10 justify-center items-start">
					<div className="bg-[#f6f9ff] w-72 h-max p-6">
						<div className="w-full h-60 bg-white relative">
							<Image
								src="/assets/wedding.jpg"
								fill
								sizes="100%"
								alt="wedding photo"
								objectFit="cover"
								objectPosition="center"
							/>
						</div>
						<h3 className="font-bold text-xl pt-4 text-center mb-2">
							Pernikahan
						</h3>
						<p>Undangan dengan tema pernikahan</p>
					</div>
					<div className="bg-[#f6f9ff] w-72 h-max p-6">
						<div className="w-full h-60 bg-white relative">
							<Image
								src="/assets/birthday.jpg"
								fill
								sizes="100%"
								alt="wedding photo"
								objectFit="cover"
								objectPosition="center"
							/>
						</div>
						<h3 className="font-bold text-xl pt-4 text-center mb-2">
							Ulang Tahun
						</h3>
						<p>Undangan dengan tema ulang tahun</p>
					</div>
					<div className="bg-[#f6f9ff] w-72 h-max p-6">
						<div className="w-full h-60 bg-white relative">
							<Image
								src="/assets/general.jpg"
								fill
								sizes="100%"
								alt="wedding photo"
								objectFit="cover"
								objectPosition="center"
							/>
						</div>
						<h3 className="font-bold text-xl pt-4 text-center mb-2">Umum</h3>
						<p>
							Undangan dengan tema umum, anda dapat memberikan informasi secara
							umum seperti untuk undangan rapat atau yang lainnya tanpa tema
							khusus
						</p>
					</div>
				</div>
			</section>
			<section className="bg-white p-20 text-slate-600">
				<div className="bg-[#e7f3f3] py-20 h-[400px]">
					<h2 className="md:text-3xl font-bold text-center">
						Punya pertanyaan? <br /> tanyakan disini
					</h2>
					<form
						action=""
						className="w-[500px] mx-auto bg-white py-12 px-10 mt-10 text-slate-500 relative border-b-[6px] border-[#f4e8e3]"
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

						<div className="flex flex-col mt-5">
							<label htmlFor="message">Message</label>
							<textarea
								name="message"
								id="message"
								onChange={(e) => handleChange(e, 'message')}
								className="resize-none h-48 focus-visible:outline-none mt-4 p-1 border border-slate-300"
							>
								{formData.message}
							</textarea>
						</div>
						<div className="flex justify-center items-center mt-8">
							<button
								type="submit"
								className="bg-[#e2b2a0] text-white py-2 px-8 text-2xl font-semibold
                                
                            "
							>
								Send
							</button>
						</div>
					</form>
				</div>
				<div className="h-[300px]"></div>
			</section>
			<footer className="p-4 flex items-center justify-between">
				<div className="font-dancing-script text-2xl">This is My Brand!</div>
				<div className=" p-2 flex items-center gap-x-2">
					<div className="w-10 h-10 ">
						<FaInstagram size="100%" />
					</div>
					<div className="w-10 h-10 ">
						<FaFacebookSquare size="100%" />
					</div>
					<div className="w-10 h-10 ">
						<AiFillTikTok size="100%" />
					</div>
				</div>
			</footer>
		</div>
	);
}
