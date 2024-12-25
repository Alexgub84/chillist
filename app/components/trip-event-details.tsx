import type { User } from '@prisma/client'

interface TripEventDetailsProps {
	name: string
	participants: User[]
	owner: string
	startDate: Date
	endDate: Date
	createdAt: Date
	id: string
}

export function TripEventDetails({
	tripEventDetails,
}: {
	tripEventDetails: TripEventDetailsProps
}) {
	return (
		<section aria-label="trip event details" className="trip-event-details">
			<div>
				<label className="font-bold" htmlFor="tripEventName">
					Event name:
				</label>

				<input
					type="text"
					name="name"
					id="name"
					defaultValue={tripEventDetails.name}
					required
				/>
			</div>

			<div>
				<label className="font-bold" htmlFor="ownerName">
					Owner:
				</label>
				<input
					type="text"
					name="ownerName"
					id="ownerName"
					defaultValue={tripEventDetails.owner}
					required
				/>
			</div>

			<div>
				<label className="font-bold" htmlFor="participants">
					Participants:
				</label>
				<ul>
					{tripEventDetails.participants.map((participant) => (
						<li key={participant.id}>
							<input
								type="text"
								name="participantName"
								id="participantName"
								defaultValue={participant.name}
								required
							/>
							<a
								href={`/trip-event/${tripEventDetails.id}/${participant.name}`}
							>
								link
							</a>
						</li>
					))}
				</ul>
			</div>

			<div>
				<label className="font-bold" htmlFor="startDate">
					Start date:
				</label>
				<input
					type="date"
					name="startDate"
					id="startDate"
					defaultValue={
						new Date(tripEventDetails.startDate).toISOString().split('T')[0]
					}
					required
				/>
			</div>

			<div>
				<label className="font-bold" htmlFor="endDate">
					End date:
				</label>
				<input
					type="date"
					name="endDate"
					id="endDate"
					defaultValue={
						new Date(tripEventDetails.endDate).toISOString().split('T')[0]
					}
					required
				/>
			</div>

			<input
				type="hidden"
				name="createdAt"
				value={tripEventDetails.createdAt.toISOString()}
			/>
		</section>
	)
}
