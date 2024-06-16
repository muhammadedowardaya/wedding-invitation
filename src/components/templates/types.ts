type Guest = {
	id: number;
	name: string;
	location: string;
};

type Invitation = {
	brideName: string;
	groomName: string;
	date: Date;
	location: string;
	templateId: number;
	guests: Guest[];
};
