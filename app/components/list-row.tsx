import type { ListRow as ListRowType } from '@prisma/client'
import clsx from 'clsx'

interface ListRowProps {
	list: Omit<ListRowType, 'createdAt' | 'updatedAt'> & {
		createdAt: string | Date // Accept both string and Date types
		updatedAt: string | Date // Accept both string and Date types
	}
	action: 'create' | 'update'
}

export function ListRow({ list, action }: ListRowProps) {
	const isCreating = action === 'create'

	return (
		<div
			className={clsx(
				'w-fit rounded border border-gray-300 p-2',
				action === 'create'
					? 'bg-gray-100'
					: list.status === 'PURCHASED'
						? 'bg-green-200'
						: 'bg-yellow-200',
			)}
		>
			<label htmlFor="name">Name: </label>
			<input
				type="text"
				name="name"
				id="name"
				defaultValue={list.name}
				required
				readOnly={!isCreating} // Editable only if creating
			/>

			<label htmlFor="ownerName">Owner Name: </label>
			<input
				type="text"
				name="ownerName"
				id="ownerName"
				defaultValue={list.ownerName || ''}
			/>

			<label htmlFor="price">Price: </label>
			<input
				type="number"
				name="price"
				id="price"
				defaultValue={list.price !== null ? list.price : 0}
				step="1"
			/>

			<label htmlFor="notes">Notes: </label>
			<input type="text" name="notes" id="notes" defaultValue={list.notes} />

			<label htmlFor="amountType">Amount Type: </label>
			<select name="amountType" id="amountType" defaultValue={list.amountType}>
				<option value="units">Units</option>
				<option value="grams">Grams</option>
			</select>

			<label htmlFor="amount">Amount: </label>
			<input
				type="number"
				name="amount"
				id="amount"
				defaultValue={list.amount !== null ? list.amount : ''}
				step="1"
			/>

			<label htmlFor="status">Status: </label>
			<select name="status" id="status" defaultValue={list.status}>
				<option value="PENDING">PENDING</option>
				<option value="PURCHASED">PURCHASED</option>
			</select>

			<input type="hidden" name="id" value={list.id} />
			<input type="hidden" name="action" value={action} />
			<input
				type="hidden"
				name="createdAt"
				value={new Date(list.createdAt).toISOString()}
			/>
			<input
				type="hidden"
				name="updatedAt"
				value={new Date(list.updatedAt).toISOString()}
			/>
			<input type="hidden" name="tripEventId" value={list.tripEventId} />

			<button className="rounded bg-green-300 p-2" type="submit">
				{isCreating ? 'Create' : 'Save'}
			</button>
		</div>
	)
}
