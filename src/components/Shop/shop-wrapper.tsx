/** @format */

// ---------------

/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState } from 'react';
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
	const [products, setProducts] = useState<Product[]>(all_products);

	const [sortKey, setSortKey] = useState<string | undefined>();

	useEffect(() => {
		const copy_prod = structuredClone(products);
		if (sortKey === '1') {
			const sorted = copy_prod.sort((a, b) => {
				return a.price - b.price;
			});
			setProducts(sorted);
		} else {
			const sorted = copy_prod.sort((a, b) => {
				return b.price - a.price;
			});
			setProducts(sorted);
		}
	}, [sortKey]);

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
						<Select
							onValueChange={(e) => {
								setSortKey(e);
							}}>
							<SelectTrigger className='w-full md:w-[200px]'>
								<SelectValue placeholder='Default sorting' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Default sorting</SelectLabel>

									<SelectItem value='1'>Sort by price: low to high</SelectItem>
									<SelectItem value='2'>Sort by price: high to low</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					{/* Shop content */}
					{products.length > 0 ? (
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4 gap-4'>
							<AllProducs products={products} />
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
