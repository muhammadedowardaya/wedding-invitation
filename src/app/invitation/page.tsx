'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function InvitationPage() {
	const pathname = usePathname();
	const router = useRouter();

	if (pathname === `/invitation`) {
		router.push('/');
	}
}
