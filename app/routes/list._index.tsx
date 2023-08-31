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

export interface TripInfo {
	id: string
	name: string
	participants: string[]
	startDate: Date
	endDate: Date
	createdAt: Date
	tripOwner: string
}

const tripInfoFakeData = {
	id: '1',
	name: 'Trip 1',
	participants: ['John Doe', 'Jane Doe'],
	startDate: new Date('2023-08-01T00:00:00Z'),
	endDate: new Date('2023-08-05T00:00:00Z'),
	createdAt: new Date('2023-08-01T00:00:00Z'),
	tripOwner: 'John Doe',
}

const listFakeData = [
	{
		id: '1',
		name: 'Tent',
		ownerName: 'John Doe',
		price: 100,
		amountType: 'units',
		amount: 1,
		notes: 'This is a 2-person tent',
		status: 'PENDING',
		createdAt: new Date('2023-08-01T00:00:00Z'),
		updatedAt: new Date('2023-08-01T00:00:00Z'),
	},
	{
		id: '2',
		name: 'Sleeping Bag',
		ownerName: undefined,
		price: 150,
		amountType: 'units',
		amount: 1,
		notes: 'This is a warm sleeping bag',
		status: 'PURCHASED',
		createdAt: new Date('2023-08-02T00:00:00Z'),
		updatedAt: new Date('2023-08-02T00:00:00Z'),
	},
	{
		id: '3',
		name: 'Camping Stove',
		ownerName: 'John Smith',
		price: 200,
		amountType: 'units',
		amount: 1,
		notes: 'This is a portable camping stove',
		status: 'PENDING',
		createdAt: new Date('2023-08-03T00:00:00Z'),
		updatedAt: new Date('2023-08-03T00:00:00Z'),
	},
	{
		id: '4',
		name: 'Backpack',
		ownerName: undefined,
		price: 250,
		amountType: 'units',
		amount: 1,
		notes: 'This is a 60L backpack',
		status: 'PURCHASED',
		createdAt: new Date('2023-08-04T00:00:00Z'),
		updatedAt: new Date('2023-08-04T00:00:00Z'),
	},
	{
		id: '5',
		name: 'Camping Lantern',
		ownerName: 'Jane Doe',
		price: 300,
		amountType: 'units',
		amount: 1,
		notes: 'This is a rechargeable camping lantern',
		status: 'PENDING',
		createdAt: new Date('2023-08-05T00:00:00Z'),
		updatedAt: new Date('2023-08-05T00:00:00Z'),
	},
]

export default function List() {
	return (
		<main>
			<h1>List</h1>

			<form>
				{listFakeData.map(row => (
					<div key={row.id}>
						<label htmlFor="name">Name: </label>
						<input type="text" name="name" id="name" value={row.name} />
						<label htmlFor="ownerName">Owner Name</label>
						<select
							name="ownerName"
							id="ownerName"
							value={row.ownerName ? row.ownerName : ''}
						>
							{tripInfoFakeData.participants.map(participant => (
								<option key={participant} value={participant}>
									{participant}
								</option>
							))}
						</select>
						<label htmlFor="price">Price: </label>
						<input
							type="number"
							name="price"
							id="price"
							value={row.price ? row.price : ''}
						/>
						<label htmlFor="amount">Amount</label>
						<input type="number" name="amount" id="amount" value={row.} />
						<label htmlFor="status">Status: </label>
						<select name="status" id="status" value={row.status}>
							<option value="PENDING">PENDING</option>
							<option value="PURCHASED">PURCHASED</option>
						</select>
						<label htmlFor="notes">Notes: </label>
						<input type="text" name="notes" id="notes" value={row.notes} />
					</div>
				))}
			</form>
		</main>
	)
}
