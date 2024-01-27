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
import Image from 'next/image';
import ProductCard from '../common/product-card';

export default function ShopPageComponent() {
	return (
		<div className='w-full'>
			<PageTitle title='Shop' />
			<PageBreadcrumb
				paths={[
					{ name: 'Home', url: '/' },
					{ name: 'Shop', url: '/shop' },
				]}
			/>
			<ContentWrapper className='py-12'>
				<div className='flex items-center justify-center md:grid md:grid-cols-3 lg:grid-cols-4'>
					{/* left side of shop page */}
					<div className='col-span-1'>
						<div className='flex flex-row'>
							<form></form>
						</div>
					</div>
					{/* right side of shop page */}
					<div className='col-span-3'>
						<div className='w-full flex items-center justify-between'>
							{/* pagination */}
							<h5>Showing all 7 result</h5>
							<div className=''>
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
						</div>
						{/* Shop content */}
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
							<ProductCard />
						</div>
						<div className='flex w-full justify-start'>
							<Pagination>
								<PaginationContent>
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
