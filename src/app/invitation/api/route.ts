// app/api/invitations/route.ts
import { prismaClient } from '@/prisma-client';
import { NextResponse } from 'next/server';

export async function GET() {
	return NextResponse.json({ info: 'pusing gaes' });
}

export async function POST(request: Request) {
	const { brideName, groomName, date, location, guestName, templateId } =
		await request.json();
	const data = await request.json();
	try {
		const invitation = await prismaClient.invitation.create({
			data: {
				brideName,
				groomName,
				date: new Date(date),
				location,
				templateId,
			},
		});
		return NextResponse.json({ success: true, invitationId: invitation.id });
	} catch (error) {
		return NextResponse.json({ success: false, error: data });
	}
}
