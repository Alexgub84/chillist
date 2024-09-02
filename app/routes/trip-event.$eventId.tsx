import { json, redirect } from '@remix-run/node'
import type { LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node'
import { Form, Link, useLoaderData } from '@remix-run/react'
import { z } from 'zod'

import type { Prisma } from '@prisma/client'

import { prisma } from '#app/utils/db.server.ts'
import { ListRow } from '#app/components/list-row.tsx'
import { TripEventDetails } from '#app/components/trip-event-details.tsx'

type LoaderData = Prisma.TripEventGetPayload<{
	include: { participants: true; lists: true }
}>

const listRowSchema = z.object({
	id: z.string().uuid().optional(),
	name: z.string(), // String for name
	ownerName: z.string().nullable(), // Nullable string for ownerName
	price: z.number().nullable(), // Optional float for price
	notes: z.string(), // String for notes
	amountType: z.enum(['units', 'grams']), // Enum for amountType
	amount: z.number().nullable(), // Optional float for amount
	status: z.enum(['PENDING', 'PURCHASED']), // Enum for status
	createdAt: z.date().default(new Date()), // Date for createdAt with default value
	updatedAt: z.date().default(new Date()), // Date for updatedAt with default value
	tripEventId: z.string(), // String for tripEventId
	action: z.enum(['create', 'update']), // Enum for action
})

export const action = async ({ params, request }: ActionFunctionArgs) => {
	const formData = await request.formData()
	const data = Object.fromEntries(formData.entries())
	const parsedData = {
		id: data.id ? (data.id as string) : undefined, // Allow id to be undefined for creation
		name: data.name as string,
		ownerName: data.ownerName ? String(data.ownerName) : null,
		price: data.price ? parseFloat(data.price as string) : null,
		notes: data.notes as string,
		amountType: data.amountType as 'units' | 'grams',
		amount: data.amount ? parseFloat(data.amount as string) : null,
		status: data.status as 'PENDING' | 'PURCHASED',
		tripEventId: data.tripEventId as string,
		createdAt: new Date(data.createdAt as string),
		updatedAt: new Date(data.updatedAt as string),
		action: data.action,
	}

	const result = listRowSchema.safeParse(parsedData)

	if (!result.success) {
		console.error('Validation failed:', result.error.errors)
		return { errors: result.error.errors }
	}

	const {
		id,
		name,
		ownerName,
		price,
		notes,
		amountType,
		amount,
		status,
		action,
		tripEventId,
	} = result.data

	try {
		if (action === 'create') {
			await prisma.listRow.create({
				data: {
					name,
					ownerName,
					price,
					notes,
					amountType,
					amount,
					status,
					tripEventId,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			})
		} else {
			await prisma.listRow.update({
				where: { id },
				data: {
					name,
					ownerName: ownerName ?? undefined, // Ensure Prisma accepts the data format
					price: price ?? undefined, // Ensure Prisma accepts the data format
					notes,
					amountType,
					amount: amount ?? undefined, // Ensure Prisma accepts the data format
					status,
					tripEventId,
					updatedAt: new Date(), // Set updatedAt to the current date and time
				},
			})
		}
	} catch (error) {
		console.error('Failed to update ListRow:', error)
		throw new Error('Failed to update the list row. Please try again.')
	}
	return redirect(`/trip-event/${params.eventId}`)
}

export async function loader({ params }: LoaderFunctionArgs) {
	if (!params.eventId) return json({ event: null })

	const tripEvent = await prisma.tripEvent.findUnique({
		where: { id: params.eventId },
		include: { participants: true, lists: true },
	})

	return json(tripEvent)
}

export default function EventRoute() {
	const tripEvent = useLoaderData<LoaderData>()
	const participantsNames = tripEvent.participants.map(
		(participant) => participant.name,
	)
	const defaultListRowData = {
		id: '',
		name: '',
		ownerName: '',
		price: 0,
		notes: '',
		amountType: 'units',
		amount: 0,
		status: 'PENDING',
		createdAt: new Date(),
		updatedAt: new Date(),
		tripEventId: tripEvent.id,
	}

	const tripEventDetails = {
		name: tripEvent.name,
		participants: tripEvent.participants.map((participant) => ({
			...participant,
			createdAt: new Date(participant.createdAt),
			updatedAt: participant.updatedAt ? new Date(participant.updatedAt) : null,
		})),
		owner: tripEvent.owner || 'empty',
		startDate: new Date(tripEvent.startDate),
		endDate: new Date(tripEvent.endDate),
		createdAt: new Date(tripEvent.createdAt),
	}

	return (
		<section>
			<section>
				<TripEventDetails tripEventDetails={tripEventDetails} />
			</section>

			<section className="gap-2">
				{tripEvent.lists.map((list) => {
					return (
						<Form method="post" key={list.id}>
							<ListRow
								list={list}
								action="update"
								participants={participantsNames}
							/>
						</Form>
					)
				})}
			</section>
			<h2 className="mt-2">Add new list item</h2>
			<Form method="post">
				<ListRow
					list={defaultListRowData}
					action="create"
					participants={participantsNames}
				/>
			</Form>
		</section>
	)
}
