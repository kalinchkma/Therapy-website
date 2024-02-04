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

import { Service } from './columns';
import AddNewService from './add-new-service';
import Image from 'next/image';
import UpdateServiceName from './update-service-name';
import UpdateServiceDescription from './update-service-description';
import UpdateServicePrice from './update-service-price';
import {
	deleteService,
	updateServicePublishState,
} from '@/actions/services-actions';
import UpdateServiceImage from './update-service-image';
import UpdateServiceContent from './update-service-content';

export const columns: ColumnDef<Service>[] = [
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
		accessorKey: 'thumbnailImage',
		header: 'Thumbnail image',
		cell: ({ row }) => {
			const service = row.original;
			return (
				<div className='capitalize line-clamp-2 relative'>
					<Image
						src={row.getValue('thumbnailImage')}
						width={'100'}
						height={'100'}
						alt='service image'
					/>
					<div className='w-full h-full absolute top-0 left-0 flex items-end justify-center'>
						<UpdateServiceImage id={service.id} />
					</div>
				</div>
			);
		},
	},

	{
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Name
					<RxCaretSort className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			const service = row.original;
			return (
				<div className='capitalize max-w-[200px] flex flex-col gap-3'>
					<p className='line-clamp-2'>{row.getValue('name')}</p>
					<UpdateServiceName
						id={Number(service.id)}
						value={row.getValue('name')}
					/>
				</div>
			);
		},
	},
	{
		accessorKey: 'description',
		header: 'Description',
		cell: ({ row }) => {
			const service = row.original;
			return (
				<div className='capitalize max-w-[200px] flex flex-col gap-3'>
					<p className='line-clamp-2'>{row.getValue('description')}</p>
					<UpdateServiceDescription
						id={Number(service.id)}
						value={row.getValue('description')}
					/>
				</div>
			);
		},
	},
	{
		accessorKey: 'price',
		header: () => <div className='text-center'>Price In Taka</div>,
		cell: ({ row }) => {
			const service = row.original;
			const format = `${Number(service.price)} Tk`;
			return (
				<div className='text-center font-medium flex flex-col'>
					{format}
					<UpdateServicePrice id={service.id} value={service.price!} />
				</div>
			);
		},
	},

	{
		accessorKey: 'published',
		header: 'Published',
		cell: ({ row }) => (
			<div className='capitalize line-clamp-2 max-w-[200px]'>
				{row.getValue('published') ? 'Published' : 'Not Published'}
			</div>
		),
	},

	{
		accessorKey: 'content',
		header: () => <div className='text-center'>Content</div>,
		cell: ({ row }) => {
			const service = row.original;
			return (
				<div className='text-center font-medium'>
					<UpdateServiceContent
						id={service.id}
						currContent={service.content!}
					/>
				</div>
			);
		},
	},

	{
		id: 'actions',
		header: () => <div className='text-left'>Actions</div>,
		cell: ({ row }) => {
			const service = row.original;
			const update_service_status = updateServicePublishState.bind(
				null,
				service.id,
			);
			const delete_service = deleteService.bind(null, service.id);
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
							{service.published ? (
								<form action={update_service_status}>
									<button type='submit'>Unpublish Service</button>
								</form>
							) : (
								<form action={update_service_status}>
									<button type='submit'>Publish Service</button>
								</form>
							)}
						</DropdownMenuItem>
						<DropdownMenuItem>
							<form action={delete_service}>
								<button type='submit'>Delete Service</button>
							</form>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

export default function ServiceDataTable({ data }: { data: Service[] }) {
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
					placeholder='Filter name...'
					value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
					onChange={(event) =>
						table.getColumn('name')?.setFilterValue(event.target.value)
					}
					className='max-w-sm'
				/>
				<AddNewService />
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
									No services found
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
