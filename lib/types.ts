export type Family = { family: string; variants: Array<string> };

export type actionType =
	| "bg"
	| "hSize+"
	| "hSize-"
	| "hWeight+"
	| "hWeight-"
	| "hColor"
	| "hLH+"
	| "hLH-"
	| "hLS+"
	| "hLS-"
	| "pSize+"
	| "pSize-"
	| "pWeight+"
	| "pWeight-"
	| "pColor"
	| "pLH+"
	| "pLH-"
	| "pLS+"
	| "pLS-";

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
	font?: { family: string; variants: Array<string> };
}
