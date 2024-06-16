'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const GuestLink = ({
	guest,
}: {
	guest: { id: number; name: string; location: string };
}) => {
	const [copied, setCopied] = useState(false);
	const [guestLink, setGuestLink] = useState('');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setGuestLink(`${window.location.origin}/guest-invitation/${guest.id}`);
		}
	}, [guest.id]);

	const handleCopy = () => {
		navigator.clipboard.writeText(guestLink);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleShare = () => {
		if (navigator.share) {
			navigator.share({
				title: 'Undangan Pernikahan',
				text: `Undangan untuk ${guest.name}`,
				url: guestLink,
			});
		} else {
			handleCopy();
		}
	};

	return (
		<li>
			{guest.name} - {guest.location} -{' '}
			<Link href={guestLink}>
				<div className="text-blue-500">Lihat Undangan</div>
			</Link>
			<button onClick={handleCopy} className="ml-2 text-blue-500">
				{copied ? 'Tersalin!' : 'Salin Link'}
			</button>
			<button onClick={handleShare} className="ml-2 text-blue-500">
				Bagikan
			</button>
		</li>
	);
};

export default GuestLink;
