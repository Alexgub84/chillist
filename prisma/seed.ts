import { faker } from '@faker-js/faker'
import { promiseHash } from 'remix-utils'
import { v4 as uuidv4 } from 'uuid'
import { prisma } from '#app/utils/db.server.ts'
import {
	createPassword,
	createUser,
	getNoteImages,
	getUserImages,
	img,
} from '#tests/db-utils.ts'
import { connect } from 'node:http2'

async function seed() {
	console.log('🌱 Seeding...')
	console.time(`🌱 Database has been seeded`)

	console.time('🧹 Cleaned up the database...')
	await prisma.event.deleteMany()
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

	await prisma.event.create({
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
			lists: '["Grocery","Clothes","Electronics"]',
		},
	})

	console.timeEnd('🧹 Cleaned up the database...')

	console.timeEnd(`🌱 Database has been seeded`)
}

seed()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
