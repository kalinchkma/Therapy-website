/** @format */

import React from 'react';

import { SocialLink, IconType } from '@/lib/definitions';
import {
	FaSquareFacebook,
	FaLinkedin,
	FaSquareWhatsapp,
	FaSquareYoutube,
	FaSquareXTwitter,
	FaTwitter,
	FaInstagram,
} from 'react-icons/fa6';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SocialLinkProps extends SocialLink {
	className?: string;
}

export default function SocialLinkCreator({
	title,
	link,
	icon,
	className,
}: SocialLinkProps) {
	switch (icon) {
		case IconType.Facebook:
			return (
				<Link href={link} className={cn('text-blue-700', className)}>
					<FaSquareFacebook />
				</Link>
			);
		case IconType.LinkedIn:
			return (
				<Link href={link} className={cn('text-blue-900', className)}>
					<FaLinkedin />
				</Link>
			);
		case IconType.YouTube:
			return (
				<Link href={link} className={cn('text-red-500', className)}>
					<FaSquareYoutube />
				</Link>
			);
		case IconType.WhatsApp:
			return (
				<Link href={link} className={cn('text-green-500', className)}>
					<FaSquareWhatsapp />
				</Link>
			);
		case IconType.Twitter:
			return (
				<Link href={link} className={cn('text-sky-500', className)}>
					<FaTwitter />
				</Link>
			);
		case IconType.XTwitter:
			return (
				<Link href={link} className={cn('text-zinc-900', className)}>
					<FaSquareXTwitter />
				</Link>
			);
		case IconType.Instagram:
			return (
				<Link href={link} className={cn('text-pink-600', className)}>
					<FaInstagram />
				</Link>
			);
	}
}
