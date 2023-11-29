import { json, redirect, ActionArgs, LoaderArgs } from '@remix-run/node'
import {
	Form,
	Link,
	Outlet,
	isRouteErrorResponse,
	useLoaderData,
	useParams,
	useRouteError,
	useSubmit,
} from '@remix-run/react'

import { prisma } from '../utils/db.server.ts'
import { ListRow } from '#app/components/lits-row.tsx'
import type { EventType } from '#app/utils/fake-data.ts'
import { invariantResponse } from '#app/utils/misc.tsx'
import { useState } from 'react'

import { EventsFakeData } from '#app/utils/fake-data.ts'

export async function loader() {
	const eventsData = await prisma.event.findMany()
	// invariantResponse(eventsData, ',events not found', { status: 404 })

	return json(eventsData)
}

export default function EventsRoute() {
	const eventsData = useLoaderData<Event[]>()

	return (
		<main>
			<h1>Events</h1>

			{eventsData.map(event => (
				<li key={event.id}>
					<a href={`event/${event.id}`}>{event.name}</a>
				</li>
			))}
		</main>
	)
}
