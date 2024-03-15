/** @format */

import React from 'react';
import AddProduct from './add-product';
import { fetchAllProduct } from '@/methods/product-method';
import ProductCardD from './product-card-d';

export default async function ManageShopPageComponent() {
	// fetch alll product
	const all_product = await fetchAllProduct();
	const host = process.env.HOST!;
	return (
		<div className='w-full flex flex-col p-4 gap-3'>
			<AddProduct />
			{/* all product fetch */}
			<div className='grid grid-cols-3 gap-5'>
				{all_product.map((product, index) => (
					<ProductCardD key={index} product={product} host={host} />
				))}
			</div>
		</div>
	);
}
