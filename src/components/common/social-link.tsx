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

import IconCreator from './icon-creator';

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
					<IconCreator icon={icon} />
				</Link>
			);
		case IconType.LinkedIn:
			return (
				<Link href={link} className={cn('text-blue-900', className)}>
					<IconCreator icon={icon} />
				</Link>
			);
		case IconType.YouTube:
			return (
				<Link href={link} className={cn('text-red-500', className)}>
					<IconCreator icon={icon} />
				</Link>
			);
		case IconType.WhatsApp:
			return (
				<Link href={link} className={cn('text-green-500', className)}>
					<IconCreator icon={icon} />
				</Link>
			);
		case IconType.Twitter:
			return (
				<Link href={link} className={cn('text-sky-500', className)}>
					<IconCreator icon={icon} />
				</Link>
			);
		case IconType.XTwitter:
			return (
				<Link href={link} className={cn('text-zinc-900', className)}>
					<IconCreator icon={icon} />
				</Link>
			);
		case IconType.Instagram:
			return (
				<Link href={link} className={cn('text-pink-600', className)}>
					<IconCreator icon={icon} />
				</Link>
			);
	}
}
