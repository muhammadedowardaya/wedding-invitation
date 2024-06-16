'use client';
// pages/invitationForm.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';

type Guest = {
	id: number;
	name: string;
	location: string;
};

type FormData = {
	templateId: number;
	brideName: string;
	groomName: string;
	date: string;
	location: string;
	guests: Guest[];
};

const InvitationForm = ({ params }: { params: { id: string } }) => {
	const router = useRouter();
	const { id } = params;

	// const [location, setLocation] = useState<{ lat: number; lng: number }>({
	// 	lat: 0,
	// 	lng: 0,
	// });

	const [formData, setFormData] = useState<FormData>({
		brideName: '',
		groomName: '',
		date: '',
		location: '',
		templateId: parseInt(id),
		guests: [],
	});

	const [newGuest, setNewGuest] = useState<Guest>({
		id: 0,
		name: '',
		location: '',
	});
	const [editingIndex, setEditingIndex] = useState<number | null>(null);

	const [searchTerm, setSearchTerm] = useState<string>('');

	const handleNewGuestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setNewGuest((prevGuest) => ({ ...prevGuest, [name]: value }));
	};

	const handleAddGuest = () => {
		setFormData((prevFormData) => ({
			...prevFormData,
			guests: [...prevFormData.guests, { ...newGuest, id: Date.now() }],
		}));
		setNewGuest({ id: 0, name: '', location: '' });
	};

	const handleEditGuestChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => {
			const newGuests = [...prevFormData.guests];
			newGuests[index] = { ...newGuests[index], [name]: value };
			return { ...prevFormData, guests: newGuests };
		});
	};

	const handleDeleteGuest = (index: number) => {
		setFormData((prevFormData) => {
			const newGuests = prevFormData.guests.filter((_, i) => i !== index);
			return { ...prevFormData, guests: newGuests };
		});
	};

	const handleEditGuest = (index: number) => {
		setEditingIndex(index);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// if (location.lat === 0 && location.lng === 0) {
		// 	alert('Please set a location.');
		// 	return;
		// }

		try {
			const response = await fetch('/api/invitations', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					...formData,
					// location: `Lat: ${location.lat}, Lng: ${location.lng}`,
				}),
			});
			const data = await response.json();
			if (data.success) {
				router.push(`/invitation/${data.invitationId}`);
			} else {
				alert('Failed to create invitation');
			}
		} catch (error) {
			console.error('Error:', error);
			alert('Failed to save invitation');
		}
	};

	return (
		<div className="flex justify-center flex-col items-center">
			<h1 className="text-2xl font-bold py-4 mb-4">Customize Invitation</h1>
			<form onSubmit={handleSubmit} className="w-full max-w-[600px] py-4">
				<div className="mb-4">
					<label className="block text-sm font-bold mb-2">
						Nama Mempelai Wanita
					</label>
					<input
						type="text"
						name="brideName"
						value={formData.brideName}
						onChange={(e) =>
							setFormData({ ...formData, brideName: e.target.value })
						}
						className="border p-2 w-full"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-bold mb-2">
						Nama Mempelai Pria
					</label>
					<input
						type="text"
						name="groomName"
						value={formData.groomName}
						onChange={(e) =>
							setFormData({ ...formData, groomName: e.target.value })
						}
						className="border p-2 w-full"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-bold mb-2">Tanggal</label>
					<input
						type="date"
						name="date"
						value={formData.date}
						onChange={(e) => setFormData({ ...formData, date: e.target.value })}
						className="border p-2 w-full"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-bold mb-2">Lokasi</label>
					
				</div>
				<div className="mb-4">
					<label className="block text-sm font-bold mb-2">Guests</label>
					{formData.guests.map((guest, index) => (
						<div key={guest.id} className="flex items-center mb-2">
							{editingIndex === index ? (
								<>
									<input
										type="text"
										name="name"
										value={guest.name}
										onChange={(e) => handleEditGuestChange(e, index)}
										className="border p-2 w-full mr-2"
									/>
									<button
										type="button"
										onClick={() => setEditingIndex(null)}
										className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
									>
										Save
									</button>
								</>
							) : (
								<>
									<span className="w-full">{guest.name}</span>
									<button
										type="button"
										onClick={() => handleEditGuest(index)}
										className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700 mr-2"
									>
										Edit
									</button>
									<button
										type="button"
										onClick={() => handleDeleteGuest(index)}
										className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
									>
										Delete
									</button>
								</>
							)}
						</div>
					))}
					<div className="flex items-center mt-2">
						<input
							type="text"
							name="name"
							value={newGuest.name}
							onChange={handleNewGuestChange}
							className="border p-2 w-full mr-2"
							placeholder="Guest name"
						/>
						<button
							type="button"
							onClick={handleAddGuest}
							className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
						>
							Add Guest
						</button>
					</div>
				</div>
				<button
					type="submit"
					className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 w-full"
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default InvitationForm;
