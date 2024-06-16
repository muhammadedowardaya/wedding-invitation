// app/invitations/[id]/page.tsx
import Template1Page from '@/components/templates/template1';
import Template2Page from '@/components/templates/template2';
import { prismaClient } from '@/prisma-client';

const InvitationPage = async ({ params }: { params: { id: string } }) => {
	const { id } = params;

	const invitation = await prismaClient.invitation.findUnique({
		where: { id: parseInt(id, 10) },
		include: { guests: true },
	});

	if (!invitation) {
		return <div>Undangan tidak ditemukan.</div>;
	}

	switch (invitation.templateId) {
		case 1:
			return <Template1Page invitation={invitation} />;
		default:
			return <Template2Page invitation={invitation} />;
	}
};

export default InvitationPage;
