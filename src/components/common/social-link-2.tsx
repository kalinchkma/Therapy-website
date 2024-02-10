/** @format */

import React from 'react';

import { SocialLink, IconType } from '@/lib/definitions';

import Link from 'next/link';
import { cn } from '@/lib/utils';

import IconCreator from './icon-creator';

interface SocialLinkProps extends SocialLink {
	className?: string;
}

export default function SocialLinkCreator2({
	title,
	link,
	icon,
	className,
}: SocialLinkProps) {
	const lower_title = title?.toLowerCase();
	switch (lower_title) {
		case 'facebook':
			return (
				<Link href={link} className={cn('text-blue-700', className)}>
					<IconCreator icon={IconType.Facebook} />
				</Link>
			);
		case 'linkedin':
			return (
				<Link href={link} className={cn('text-blue-900', className)}>
					<IconCreator icon={IconType.LinkedIn} />
				</Link>
			);
		case 'youtube':
			return (
				<Link href={link} className={cn('text-red-500', className)}>
					<IconCreator icon={IconType.YouTube} />
				</Link>
			);
		case 'whatsapp':
			return (
				<Link href={link} className={cn('text-green-500', className)}>
					<IconCreator icon={IconType.WhatsApp} />
				</Link>
			);
		case 'old-twitter':
			return (
				<Link href={link} className={cn('text-sky-500', className)}>
					<IconCreator icon={IconType.Twitter} />
				</Link>
			);
		case 'twitter':
			return (
				<Link href={link} className={cn('text-zinc-900', className)}>
					<IconCreator icon={IconType.XTwitter} />
				</Link>
			);
		case 'instagram':
			return (
				<Link href={link} className={cn('text-pink-600', className)}>
					<IconCreator icon={IconType.Instagram} />
				</Link>
			);
		default:
			return (
				<Link
					href={link}
					className={cn(
						'flex items-center justify-center font-bold',
						className,
					)}>
					{title?.charAt(0)}
				</Link>
			);
	}
}
