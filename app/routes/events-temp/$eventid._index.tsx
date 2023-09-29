import { json, redirect, ActionArgs, LoaderArgs } from '@remix-run/node'
import {
	Form,
	isRouteErrorResponse,
	useLoaderData,
	useParams,
	useRouteError,
	useSubmit,
} from '@remix-run/react'

import { prisma } from '../../utils/db.server.ts'
import { ListRow } from '#app/components/lits-row.tsx'

import { invariantResponse } from '#app/utils/misc.tsx'
import { useState } from 'react'

// export async function loader({ params }: LoaderArgs) {
// 	return null
// }

// export const action = async ({ request, params }: ActionArgs) => {
// 	return null
// }

export default function EventIndex() {
	return (
		<section>
			<h1>Index</h1>

			{/* <Form method="post">
				{lists.map(row => (
					<ListRow
						list={row}
						key={`list-row-${row.id}`}
						handleListEdited={handleListEdited}
					/>
				))}
			</Form> */}
		</section>
	)
}
