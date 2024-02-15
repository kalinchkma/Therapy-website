/** @format */

import { getBlogs } from '@/methods/blog-method';

export async function GET(request: Request) {
	const allBlogs = await getBlogs();
	return Response.json(allBlogs);
}
