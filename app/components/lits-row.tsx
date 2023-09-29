import { Form, Link, useSubmit } from '@remix-run/react'

import type { ListRow } from '#app/utils/fake-data.ts'

export function ListRow({
	list,
	handleListEdited,
}: {
	list: ListRow
	handleListEdited: (event: React.ChangeEvent<HTMLSelectElement>) => void
}) {
	return (
		<div key={list.id}>
			<label htmlFor={`name-${list.id}-${list.name}`}>Name: </label>
			<input
				type="text"
				name="name"
				id={`name-${list.id}-${list.name}`}
				value={list.name}
				readOnly
			/>
			{/* <label htmlFor="ownerName">Owner Name</label> */}
			{/* <select
				name="ownerName"
				id="ownerName"
				defaultValue={list.ownerName ? list.ownerName : ''}
			>
				{list.participants.map(participant => (
					<option key={participant} value={participant}>
						{participant}
					</option>
				))}
			</select> */}
			<label htmlFor={`price-${list.id}-${list.price}`}>Price: </label>
			<input
				type="number"
				name="price"
				id={`price-${list.id}-${list.price}`}
				value={list.price ? list.price : ''}
				readOnly
			/>
			<label htmlFor={`amount-${list.id}-${list.amount}`}>Amount</label>
			<input
				type="number"
				name="amount"
				id={`amount-${list.id}-${list.amount}`}
				value={list.amount}
				readOnly
			/>
			<label htmlFor={`status-${list.id}-${list.status}`}>Status: </label>
			<select
				name="status"
				id={`status-${list.id}-${list.status}`}
				defaultValue={list.status}
				// onSelect={handleListEdited}
			>
				<option value="PENDING">PENDING</option>
				<option value="PURCHASED">PURCHASED</option>
			</select>
			<label htmlFor={`notes-${list.id}-${list.notes}`}>Notes: </label>
			<input
				type="text"
				name="notes"
				id={`notes-${list.id}-${list.notes}`}
				defaultValue={list.notes}
			/>
			<button type="submit">save</button>
		</div>
	)
}
