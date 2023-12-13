import { cn } from "@/lib/utils";
import React from "react";

type mixed = number;

export interface CardProps {
	hSize: number;
	hWeight: number;
	hBG: string;
	hLH: number;
	hLS: number;
	pSize: number;
	pWeight: number;
	pBG: string;
	pLH: number;
	pLS: number;
}

const Card = (props: CardProps) => {
	const { hSize, hWeight, hBG, hLH, hLS, pSize, pWeight, pBG, pLH, pLS } =
		props;

	const hStyle = {
		fontSize: `${hSize}px`,
		fontWeight: hWeight,
		backgroundColor: hBG,
		lineHeight: hLH,
		letterSpacing: hLS,
	};

	const pStyle = {
		fontSize: `${pSize}px`,
		fontWeight: pWeight,
		backgroundColor: pBG,
		lineHeight: pLH,
		letterSpacing: pLS,
	};

	return (
		<li className="rounded-md p-5 shadow-md w-full flex flex-col gap-3 min-w-fit max-w-fit">
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
