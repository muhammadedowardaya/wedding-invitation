// app/guest-invitation/[guestId]/page.tsx

import { prismaClient } from "@/prisma-client";

const GuestInvitationPage = async ({
	params,
}: {
	params: { id: string };
}) => {
	const { id } = params;

	const guest = await prismaClient.guest.findUnique({
		where: { id: parseInt(id) },
		include: { invitation: true },
	});

	if (!guest || !guest.invitation) {
		return <div>Undangan tidak ditemukan.</div>;
	}

	const { invitation } = guest;

	return (
		<div className="container mx-auto">
			<h1 className="text-2xl font-bold">Undangan Pernikahan</h1>
			<p>Nama Mempelai Wanita: {invitation.brideName}</p>
			<p>Nama Mempelai Pria: {invitation.groomName}</p>
			<p>
				Tanggal Pernikahan: {new Date(invitation.date).toLocaleDateString()}
			</p>
			<p>Lokasi: {invitation.location}</p>
			<p>Nama Tamu: {guest.name}</p>
			<p>Lokasi Tamu: {guest.location}</p>
		</div>
	);
};

export default GuestInvitationPage;
