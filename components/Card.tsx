import React from "react";

type mixed = string | number;

interface Props {
	hSize?: mixed;
	hWeight?: string;
	hBG?: string;
	hLH?: mixed;
	hLS?: mixed;
	pSize?: mixed;
	pWeight?: string;
	pBG?: string;
	pLH?: mixed;
	pLS?: mixed;
}

const Card = (props: Props) => {
	const { hSize, hBG, hLH, hLS, pSize, pBG, pLH, pLS } = props;

	return (
		<li className=" rounded-md p-5 shadow-md">
			<h1 className={"text-2xl font-bold whitespace-nowrap"}>
				I honestly couldn't <br /> come up with a title{" "}
			</h1>
			<p className="mt-2">
				Aye, fight and you may die. Run and you'll live -- at least a while.
				<br /> And dying in your beds many years from now, would you be willing
				to trade all the days <br />
				from this day to that for one chance, just one chance
				<br /> to come back here and tell our enemies
				<br /> that they may take our lives, but they'll never take our
				freedom!!!
			</p>
		</li>
	);
};

export default Card;
