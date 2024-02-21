/** @format */
'use client';
import React from 'react';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import AllProducs from './all-products';
import SearchProduct from './search-product';

type Product = {
	title: string;
	image: string;
	id: number;
	description: string | null;
	price: number;
};

export default function ShopWrapper({
	all_products,
}: {
	all_products: Product[];
}) {
	return (
		<>
			<div className='flex flex-col items-center justify-center md:items-start md:justify-start md:grid md:grid-cols-3 lg:grid-cols-4 gap-3'>
				{/* right side of shop page */}
				<div className='col-span-3 lg:col-span-4 w-full'>
					<div className='w-full flex flex-col md:flex-row items-center justify-between'>
						<div className='w-full md:w-auto flex flex-wrap items-center justify-center gap-2'>
							<SearchProduct />
							{/* result count */}
							<h5 className='text-base text-zinc-500'>
								Showing all {all_products.length} result
							</h5>
						</div>
						{/* sort section */}
						<Select>
							<SelectTrigger className='w-full md:w-[200px]'>
								<SelectValue placeholder='Default sorting' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Default sorting</SelectLabel>
									<SelectItem value='0'>Sort by latest</SelectItem>
									<SelectItem value='1'>Sort by price: low to high</SelectItem>
									<SelectItem value='2'>Sort by price: high to low</SelectItem>
									<SelectItem value='3'>Sort by average rating</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					{/* Shop content */}
					{all_products.length > 0 ? (
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4 gap-4'>
							<AllProducs products={all_products} />
						</div>
					) : (
						<div className='flex items-start justify-center py-10'>
							No product found
						</div>
					)}
				</div>
			</div>
		</>
	);
}
