/** @format */

import React from 'react';
import ProductCard from './product-card';

type Product = {
	id: number;
	description: string | null;
	title: string;
	image: string;
	price: number;
};

export default function AllProducs({ products }: { products: Product[] }) {
	const host = process.env.HOST!;
	return (
		<>
			{products.map((product, index) => (
				<ProductCard key={index} product={product} host={host} />
			))}
		</>
	);
}
