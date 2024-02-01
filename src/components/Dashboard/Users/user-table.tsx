/** @format */

'use client';

import * as React from 'react';

import { RxCaretSort } from 'react-icons/rx';
import { IoChevronDown } from 'react-icons/io5';
import { HiDotsHorizontal } from 'react-icons/hi';

import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { UserDataCol } from './columns';
import {
	makeAdmin,
	makeClient,
	makeMember,
	deleteUser,
	changeTeamMemberPosition,
} from '@/actions/users-actions';
import AddNewUser from './add-new-user';
import { UsersType } from '@/lib/definitions';
import UpdateUserSummary from './update-user-summary';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

export const columns: ColumnDef<UserDataCol>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Select row'
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => <div className='capitalize'>{row.getValue('name')}</div>,
	},
	{
		accessorKey: 'email',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Email
					<RxCaretSort className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => <div className='lowercase'>{row.getValue('email')}</div>,
	},
	{
		accessorKey: 'user_type',
		header: () => <div className='text-right'>User Type</div>,
		cell: ({ row }) => {
			return (
				<div className='text-right font-medium'>
					{row.getValue('user_type')}
				</div>
			);
		},
	},
	{
		accessorKey: 'designation',
		header: () => <div className='text-center'>Member Position</div>,
		cell: ({ row }) => {
			const user = row.original;
			const change_team_member_position = changeTeamMemberPosition.bind(
				null,
				Number(user.id),
			);
			return (
				<form
					className='text-right font-medium flex gap-2 items-center justify-center'
					action={change_team_member_position}>
					<Input
						className='max-w-[150px]'
						defaultValue={row.getValue('designation')}
						name='position'
					/>
					<Button variant='ghost' type='submit'>
						Change
					</Button>
				</form>
			);
		},
	},
	{
		accessorKey: 'description',
		header: () => <div className='text-right'>Member summary</div>,
		cell: ({ row }) => {
			const user = row.original;
			return (
				<div className='text-right font-medium'>
					{user.user_type === UsersType['team-member'] ||
					user.user_type === UsersType.admin ? (
						<UpdateUserSummary
							default_sum={user.description}
							id={Number(user.id)}
						/>
					) : (
						// <span>Test</span>
						<span>{row.getValue('designation')}</span>
					)}
				</div>
			);
		},
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			const user = row.original;
			const make_member = makeMember.bind(null, Number(user.id));
			const make_client = makeClient.bind(null, Number(user.id));
			const make_admin = makeAdmin.bind(null, Number(user.id));
			const delete_user = deleteUser.bind(null, Number(user.id));
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='h-8 w-8 p-0'>
							<span className='sr-only'>Open menu</span>
							<HiDotsHorizontal className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<form action={delete_user}>
								<button type='submit'>Delete User</button>
							</form>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<form action={make_member}>
								<button type='submit'>Make Team Member</button>
							</form>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<form action={make_admin}>
								<button type='submit'>Make Admin</button>
							</form>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<form action={make_client}>
								<button type='submit'>Make Client</button>
							</form>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

export default function UserDataTable({ data }: { data: UserDataCol[] }) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	return (
		<div className='w-full'>
			<div className='flex items-center py-4'>
				<Input
					placeholder='Filter emails...'
					value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
					onChange={(event) =>
						table.getColumn('email')?.setFilterValue(event.target.value)
					}
					className='max-w-sm'
				/>
				{/* Add new user */}
				<AddNewUser label='add new user' />
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' className='ml-auto'>
							Columns <IoChevronDown className='ml-2 h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className='capitalize'
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className='flex items-center justify-end space-x-2 py-4'>
				<div className='flex-1 text-sm text-muted-foreground'>
					{table.getFilteredSelectedRowModel().rows.length} of{' '}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className='space-x-2'>
					<Button
						variant='outline'
						size='sm'
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}>
						Previous
					</Button>
					<Button
						variant='outline'
						size='sm'
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
