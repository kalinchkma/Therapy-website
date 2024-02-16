/** @format */

import { getCommentsByPostId } from '@/methods/comments-method';

export async function POST(request: Request) {
	const req_body = await request.json();
	if (req_body.id) {
		const blog_comments = await getCommentsByPostId(Number(req_body.id));

		return Response.json(blog_comments);
	} else {
		return Response.json([]);
	}
}
