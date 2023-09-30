import { EventsFakeData } from '#app/utils/fake-data.ts'
import { LoaderArgs, json } from '@remix-run/node'
import { Form, Link, useLoaderData } from '@remix-run/react'
import type { EventType } from '#app/utils/fake-data.ts'
import { ListRow } from '#app/components/lits-row.tsx'
//loader

export default function ParticipantId() {
	return <section>Participant</section>
}
