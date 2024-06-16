// app/api/invitations/route.ts
import { prismaClient } from '@/prisma-client';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	const url = new URL(request.url);
	const id = url.searchParams.get('id');

	if (!id) {
		return NextResponse.json({ error: 'ID is required' }, { status: 400 });
	}

	const invitation = await prismaClient.invitation.findUnique({
		where: { id: Number(id) },
	});

	if (!invitation) {
		return NextResponse.json(
			{ error: 'Invitation not found' },
			{ status: 404 }
		);
	}

	return NextResponse.json(invitation, { status: 200 });
}

export async function POST(request: Request) {
	try {
		const { brideName, groomName, date, location, guests, templateId } =
			await request.json();

		if (
			!brideName ||
			!groomName ||
			!date ||
			!location ||
			!guests ||
			guests.length === 0
		) {
			return NextResponse.json(
				{ success: false, error: 'Missing fields' },
				{ status: 400 }
			);
		}

		const invitation = await prismaClient.invitation.create({
			data: {
				brideName,
				groomName,
				date: new Date(date),
				location,
				templateId,
				guests: {
					create: guests.map((guest: { name: string; location: string }) => ({
						name: guest.name,
						location: guest.location,
					})),
				},
			},
		});

		return NextResponse.json({ success: true, invitationId: invitation.id });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ success: false, error: 'Database error' },
			{ status: 500 }
		);
	}
}
