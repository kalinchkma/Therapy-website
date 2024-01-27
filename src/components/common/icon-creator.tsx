/** @format */

import React from 'react';

import { IconType } from '@/lib/definitions';
import {
	FaSquareFacebook,
	FaLinkedin,
	FaSquareWhatsapp,
	FaSquareYoutube,
	FaSquareXTwitter,
	FaTwitter,
	FaInstagram,
	FaHouseChimney,
	FaLocationDot,
	FaAngleLeft,
	FaAngleRight,
} from 'react-icons/fa6';
import { AiFillSchedule } from 'react-icons/ai';
import { MdAttachEmail } from 'react-icons/md';
import { IoMdChatboxes } from 'react-icons/io';
import { MdContactPhone } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { cn } from '@/lib/utils';

interface IconCreatorProps {
	icon: IconType;
	className?: string;
}

export default function IconCreator({ icon, className }: IconCreatorProps) {
	switch (icon) {
		case IconType.Facebook:
			return <FaSquareFacebook className={cn(className)} />;
		case IconType.LinkedIn:
			return <FaLinkedin className={cn(className)} />;
		case IconType.Instagram:
			return <FaInstagram className={cn(className)} />;
		case IconType.Email:
			return <MdAttachEmail className={cn(className)} />;
		case IconType.House:
			return <FaHouseChimney className={cn(className)} />;
		case IconType.Location:
			return <FaLocationDot className={cn(className)} />;
		case IconType.Message:
			return <IoMdChatboxes className={cn(className)} />;
		case IconType.Contact:
			return <MdContactPhone className={cn(className)} />;
		case IconType.Twitter:
			return <FaTwitter className={cn(className)} />;
		case IconType.WhatsApp:
			return <FaSquareWhatsapp className={cn(className)} />;
		case IconType.XTwitter:
			return <FaSquareXTwitter className={cn(className)} />;
		case IconType.YouTube:
			return <FaSquareYoutube className={cn(className)} />;
		case IconType.LeftArrow:
			return <FaAngleLeft className={cn(className)} />;
		case IconType.RightArrow:
			return <FaAngleRight className={cn(className)} />;
		case IconType.Schedule:
			return <AiFillSchedule className={cn(className)} />;
		case IconType.Star:
			return <FaStar className={cn(className)} />;
		case IconType.Search:
			return <FaSearch className={cn(className)} />;
	}
}
