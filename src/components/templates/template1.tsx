'use client';

import GuestLink from "../GuestLink";

export default function Template1Page({
	invitation,
}: {
	invitation: Invitation
}) {
	return (
		<div className="container mx-auto bg-green-700 text-white">
			<h1 className="text-2xl font-bold">Undangan Pernikahan</h1>
			<p>Nama Mempelai Wanita: {invitation.brideName}</p>
			<p>Nama Mempelai Pria: {invitation.groomName}</p>
			<p>
				Tanggal Pernikahan: {new Date(invitation.date).toLocaleDateString()}
			</p>
			<p>Lokasi: {invitation.location}</p>
			<h2 className="text-xl font-bold mt-4">Daftar Tamu</h2>
			<ul>
				{invitation.guests.map((guest) => (
					<GuestLink key={guest.id} guest={guest} />
				))}
			</ul>
		</div>
	);
}
