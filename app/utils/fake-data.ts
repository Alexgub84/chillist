export interface ListRow {
	id: string
	name: string
	ownerName: string | undefined
	price: number | undefined
	notes: string
	amountType: 'units' | 'grams'
	amount: number | undefined
	status: 'PENDING' | 'PURCHASED'
	createdAt: Date
	updatedAt: Date
}

export interface Event {
	id: string
	name: string
	participants: string[]
	startDate: Date
	endDate: Date
	createdAt: Date
	eventOwner: string
	lists: ListRow[]
}

export const EventsFakeData = [
	{
		id: '1',
		name: 'Trip 1',
		participants: [
			{
				id: 'p1',
				name: 'John Doe',
				createdAt: new Date('2023-08-01T00:00:00Z'),
				updatedAt: new Date('2023-08-01T00:00:00Z'),
				eventId: '1',
			},
			{
				id: 'p2',
				name: 'Jane Doe',
				createdAt: new Date('2023-08-01T00:00:00Z'),
				updatedAt: new Date('2023-08-01T00:00:00Z'),
				eventId: '1',
			},
		],
		startDate: new Date('2023-08-01T00:00:00Z'),
		endDate: new Date('2023-08-05T00:00:00Z'),
		createdAt: new Date('2023-08-01T00:00:00Z'),
		eventOwner: 'John Doe',
		lists: [
			{
				id: '1',
				name: 'Tent',
				ownerName: 'John Doe',
				price: 100,
				amountType: 'units' as const,
				amount: 1,
				notes: 'This is a 2-person tent',
				status: 'PENDING' as const,
				createdAt: new Date('2023-08-01T00:00:00Z'),
				updatedAt: new Date('2023-08-01T00:00:00Z'),
			},
			{
				id: '2',
				name: 'Sleeping Bag',
				ownerName: undefined,
				price: 150,
				amountType: 'units' as const,
				amount: 1,
				notes: 'This is a warm sleeping bag',
				status: 'PURCHASED' as const,
				createdAt: new Date('2023-08-02T00:00:00Z'),
				updatedAt: new Date('2023-08-02T00:00:00Z'),
			},
			{
				id: '3',
				name: 'Camping Stove',
				ownerName: 'John Smith',
				price: 200,
				amountType: 'units' as const,
				amount: 1,
				notes: 'This is a portable camping stove',
				status: 'PENDING' as const,
				createdAt: new Date('2023-08-03T00:00:00Z'),
				updatedAt: new Date('2023-08-03T00:00:00Z'),
			},
			{
				id: '4',
				name: 'Backpack',
				ownerName: undefined,
				price: 250,
				amountType: 'units' as const,
				amount: 1,
				notes: 'This is a 60L backpack',
				status: 'PURCHASED' as const,
				createdAt: new Date('2023-08-04T00:00:00Z'),
				updatedAt: new Date('2023-08-04T00:00:00Z'),
			},
			{
				id: '5',
				name: 'Camping Lantern',
				ownerName: 'Jane Doe',
				price: 300,
				amountType: 'units' as const,
				amount: 1,
				notes: 'This is a rechargeable camping lantern',
				status: 'PENDING' as const,
				createdAt: new Date('2023-08-05T00:00:00Z'),
				updatedAt: new Date('2023-08-05T00:00:00Z'),
			},
		],
	},
]
