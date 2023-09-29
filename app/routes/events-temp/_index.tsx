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
import { EventsFakeData } from '#app/utils/fake-data.ts'

import { prisma } from '../../utils/db.server.ts'
import { ListRow } from '#app/components/lits-row.tsx'

import { invariantResponse } from '#app/utils/misc.tsx'
import { useState } from 'react'

export const action = async ({ request, params }: ActionArgs) => {
	console.log('action')

	return null
}

export default function EventsIndexRoute() {
	return (
		<main>
			<h1>Event index page</h1>
			<p>fake event data</p>
			{/* {eventsData.map(event => (
				<li key={event.id}>
					<Link to={`/events/${event.id}`}>{event.name}</Link>
				</li>
			))} */}
		</main>
	)
}
