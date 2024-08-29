import { json, redirect } from '@remix-run/node'
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

import { prisma } from '#app/utils/db.server.ts'
import { TripEvent } from '@prisma/client'

export async function loader() {
	const tripEventsData = await prisma.tripEvent.findMany()
	// invariantResponse(eventsData, ',events not found', { status: 404 })

	return json(tripEventsData)
}

export default function TripEventsRoute() {
	const tripEventsData = useLoaderData<TripEvent[]>()

	return (
		<main>
			<h1>Events</h1>
			<ul>
				{tripEventsData.map((tripEvent) => (
					<li key={tripEvent.id}>
						<Link className="underline" to={`/trip-event/${tripEvent.id}`}>
							{tripEvent.name}
						</Link>
					</li>
				))}
			</ul>
		</main>
	)
}
