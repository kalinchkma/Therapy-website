/** @format */

import React from 'react';
import PageTitle from '../common/page-title';
import PageBreadcrumb from '../common/page-breadcrumb';
import ContentWrapper from '../common/content-wrapper';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '../ui/pagination';

import ProductCard from '../common/product-card';
import IconCreator from '../common/icon-creator';
import { IconType } from '@/lib/definitions';
import Link from 'next/link';
import {
	fetchAllProduct,
	fetchAllProductClient,
} from '@/methods/product-method';
import AllProducs from './all-products';
import SearchProduct from './search-product';

export default async function ShopPageComponent({
	search,
}: {
	search: string;
}) {
	const all_products = await fetchAllProductClient(search);
	console.log(search);
	return (
		<div className='w-full'>
			<PageTitle title='Shop' />
			<PageBreadcrumb
				paths={[
					{ name: 'Home', url: '/' },
					{ name: 'Shop', url: '/shop' },
				]}
			/>
			<ContentWrapper className='py-12 '>
				<div className='flex flex-col items-center justify-center md:items-start md:justify-start md:grid md:grid-cols-3 lg:grid-cols-4 gap-3'>
					{/* left side of shop page */}
					<div className='lg:col-span-1 md:col-span-3 flex flex-col p-1 w-full'>
						{/* Search */}
						<SearchProduct />
						{/* keywords */}
						<div className='flex flex-col p-1 my-5'>
							<h4 className='text-xl text-zinc-700 font-bold border-b-2 py-2 mb-5'>
								Keywords
							</h4>
							<div className='flex flex-wrap gap-2'>
								<Link
									href={'/'}
									className='text-blue-400 block col-span-1 hover:text-blue-500 transition-all'>
									#Heart-attack
								</Link>
								<Link
									href={'/'}
									className='text-blue-400 block col-span-1 hover:text-blue-500 transition-all'>
									#Physio-therapy
								</Link>
								<Link
									href={'/'}
									className='text-blue-400 block col-span-1 hover:text-blue-500 transition-all'>
									#Massage
								</Link>
								<Link
									href={'/'}
									className='text-blue-400 block col-span-1 hover:text-blue-500 transition-all'>
									#Mental-therapy
								</Link>
								<Link
									href={'/'}
									className='text-blue-400 block col-span-1 hover:text-blue-500 transition-all'>
									#Medic
								</Link>
							</div>
						</div>
					</div>
					{/* right side of shop page */}
					<div className='col-span-3 w-full'>
						<div className='w-full flex items-center justify-between'>
							{/* result count */}
							<h5 className='text-base text-zinc-500'>
								Showing all {all_products.length} result
							</h5>
							{/* sort section */}
							<Select>
								<SelectTrigger className='w-[200px]'>
									<SelectValue placeholder='Default sorting' />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Default sorting</SelectLabel>
										<SelectItem value='0'>Sort by latest</SelectItem>
										<SelectItem value='1'>
											Sort by price: low to high
										</SelectItem>
										<SelectItem value='2'>
											Sort by price: high to low
										</SelectItem>
										<SelectItem value='3'>Sort by average rating</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						{/* Shop content */}
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4 gap-4'>
							<AllProducs products={all_products} />
						</div>
						{/* pagination */}
						<div className='flex w-full justify-start items-start py-2 bg-zinc-100'>
							<Pagination>
								<PaginationContent className='flex w-full items-center justify-center'>
									<PaginationItem>
										<PaginationPrevious href='#' />
									</PaginationItem>
									<PaginationItem>
										<PaginationLink href='#'>1</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationLink href='#' isActive>
											2
										</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationLink href='#'>3</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationEllipsis />
									</PaginationItem>
									<PaginationItem>
										<PaginationNext href='#' />
									</PaginationItem>
								</PaginationContent>
							</Pagination>
						</div>
					</div>
				</div>
			</ContentWrapper>
		</div>
	);
}
