import { EventsFakeData } from '#app/utils/fake-data.ts'
import { LoaderArgs, json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import type { Event } from '#app/utils/fake-data.ts'
import { ListRow } from '#app/components/lits-row.tsx'
//loader
export async function loader({ params }: LoaderArgs) {
	console.log('params', params)
	if (!params.eventid) return json({ event: null })

	const event = EventsFakeData[0]

	return json({ event })
}

export default function EventId() {
	const { event } = useLoaderData()

	return (
		<section>
			<h1>Event data</h1>
			<section>
				<h2>{JSON.stringify(event.participants)}</h2>
				<p>Event description</p>
				<section>
					{/* {event.participants.map(participant => (
						<p>{participant.name}</p>
					))} */}
				</section>
			</section>
			{/* <Form method="post">
				{eventData.lists.map(row => (
					<div key={row.id}>{row.name}</div>
					// <ListRow
					// 	list={row}
					// 	key={`list-row-${row.id}`}
					// 	handleListEdited={() => {}}
					// />
				))}
			</Form> */}
		</section>
	)
}
