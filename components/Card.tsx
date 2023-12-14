import { cn } from "@/lib/utils";
import React from "react";

type mixed = number;

export interface CardProps {
	bg: string;
	hSize: number;
	hWeight: number;
	hColor: string;
	hLH: number;
	hLS: number;
	pSize: number;
	pWeight: number;
	pColor: string;
	pLH: number;
	pLS: number;
	font?: string;
}

const Card = (props: CardProps) => {
	const {
		bg,
		hSize,
		hWeight,
		hColor,
		hLH,
		hLS,
		pSize,
		pWeight,
		pColor,
		pLH,
		pLS,
		font,
	} = props;

	const hStyle = {
		fontSize: `${hSize}px`,
		color: hColor,
		fontWeight: hWeight,
		lineHeight: hLH,
		letterSpacing: hLS,
	};

	const pStyle = {
		fontSize: `${pSize}px`,
		color: pColor,
		fontWeight: pWeight,
		lineHeight: pLH,
		letterSpacing: pLS,
	};

	return (
		<li
			className="rounded-md p-5 shadow-md w-full flex flex-col gap-3 min-w-fit max-w-fit"
			style={{ backgroundColor: bg, fontFamily: font }}>
			<h1
				className={cn("text-2xl font-bold whitespace-nowrap leading-none")}
				style={hStyle}>
				I honestly couldn't <br /> come up with a title{" "}
			</h1>
			<p className="mt-2 whitespace-nowrap" style={pStyle}>
				Aye, fight and you may die. <br /> Run and you'll live -- at least a
				while.
				<br /> And dying in your beds many years from now, <br /> would you be
				willing to trade all the days <br />
				from this day to that for one chance, just one chance
				<br /> to come back here and tell our enemies
				<br /> that they may take our lives, but they'll never take our
				freedom!!!
			</p>
		</li>
	);
};

export default Card;
