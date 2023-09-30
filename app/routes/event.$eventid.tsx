import { EventsFakeData } from '#app/utils/fake-data.ts'
import { LoaderArgs, json } from '@remix-run/node'
import { Form, Link, useLoaderData } from '@remix-run/react'
import type { EventType, ListRowType } from '#app/utils/fake-data.ts'
import { ListRow } from '#app/components/lits-row.tsx'
import { invariantResponse } from '#app/utils/misc.tsx'
//loader
export async function loader({ params }: LoaderArgs) {
	console.log('params', params)
	if (!params.eventid) return json({ event: null })

	const event = EventsFakeData[0]
	invariantResponse(event, ',event not found', { status: 404 })

	return json(event)
}

export default function EventId() {
	const event = useLoaderData<EventType>()

	return (
		<section>
			<h1>Event data</h1>
			<section>
				<h2>{event.name}</h2>

				<p>Event description</p>
				<section>
					<ul>
						{(event.participants ?? []).map((participant: any) => (
							<li>
								<Link to={`/participant/${participant.id}`}>
									{participant.name}
								</Link>
							</li>
						))}
					</ul>
				</section>
			</section>
			<Form method="post">
				{event.lists.map(row => {
					return (
						<ListRow
							list={row}
							key={`list-row-${row.id}`}
							handleListEdited={() => {}}
						/>
					)
				})}
			</Form>
		</section>
	)
}
