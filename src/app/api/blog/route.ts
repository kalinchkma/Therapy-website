/** @format */

import { getBlogs } from '@/methods/blog-method';

export async function POST(request: Request) {
	const req_body = await request.json();
	if (req_body.keyword) {
		const allBlogs = await getBlogs(req_body.keyword);
		return Response.json(allBlogs);
	} else {
		const allBlogs = await getBlogs();
		return Response.json(allBlogs);
	}
}
