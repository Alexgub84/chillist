import { EventsFakeData } from '#app/utils/fake-data.ts'
import { LoaderArgs, json } from '@remix-run/node'
import { Form, Outlet, useLoaderData } from '@remix-run/react'
import type { Event } from '#app/utils/fake-data.ts'
import { ListRow } from '#app/components/lits-row.tsx'

export default function EventIndexRoute() {
	return (
		<section>
			<h2>Event</h2>
			<Outlet />
		</section>
	)
}
