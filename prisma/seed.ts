import { v4 as uuidv4 } from 'uuid'
import { prisma } from '#app/utils/db.server.ts'

async function seed() {
	console.log('🌱 Seeding...')
	console.time(`🌱 Database has been seeded`)

	console.time('🧹 Cleaned up the database...')
	await prisma.listRow.deleteMany()
	await prisma.tripEvent.deleteMany()
	await prisma.user.deleteMany()

	const userAlex = await prisma.user.create({
		data: {
			id: uuidv4(),
			name: 'Alex',
			email: 'alex.gub@gmail.com',
			createdAt: new Date(),
		},
	})

	const userKfir = await prisma.user.create({
		data: {
			id: uuidv4(),
			name: 'Kfir',
			email: 'kfirfuks@gmail.com',
			createdAt: new Date(),
		},
	})

	const tripEvent = await prisma.tripEvent.create({
		data: {
			id: uuidv4(),
			name: 'Our first trip',
			participants: {
				connect: [
					{
						id: userAlex.id,
					},
					{
						id: userKfir.id,
					},
				],
			},
			startDate: new Date(),
			endDate: new Date(),
			createdAt: new Date(),
			owner: 'Alex',
		},
	})

	await prisma.listRow.create({
		data: {
			id: uuidv4(),
			name: 'List Item 1',
			ownerName: 'Alex',
			price: 10.5,
			notes: 'Some notes',
			amountType: 'units',
			amount: 2,
			status: 'PENDING',
			createdAt: new Date(),
			updatedAt: new Date(),
			tripEventId: tripEvent.id,
		},
	})

	console.timeEnd('🧹 Cleaned up the database...')

	console.timeEnd(`🌱 Database has been seeded`)
}

seed()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
