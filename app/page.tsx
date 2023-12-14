"use client";
import Card, { CardProps } from "@/components/Card";
import ControlCenter from "@/components/ControlCenter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AnimatePresence, useAnimate } from "framer-motion";
import { motion } from "framer-motion";
import { Inter } from "next/font/google";
import { useEffect, useReducer, useRef, useState } from "react";
import WebFontLoader from "webfontloader";

const inter = Inter({ subsets: ["latin"] });

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

const reducer = (
	state: CardProps,
	action: { type: actionType; payload?: any }
) => {
	switch (action.type) {
		case "bg":
			return { ...state, bg: action.payload };

		case "hSize+":
			return { ...state, hSize: state.hSize + 1 };
		case "hSize-":
			if (state.hSize - 1 > 0) {
				return { ...state, hSize: state.hSize - 1 };
			}
			return state;

		case "hWeight+":
			if (state.hWeight + 100 <= 900) {
				return { ...state, hWeight: state.hWeight + 100 };
			}
			return state;
		case "hWeight-":
			if (state.hWeight - 100 >= 100) {
				return { ...state, hWeight: state.hWeight - 100 };
			}
			return state;

		case "hColor":
			return { ...state, hColor: action.payload };

		case "hLH+":
			console.log(state.hLH);
			return { ...state, hLH: state.hLH + 0.1 };
		case "hLH-":
			if (state.hLH - 0.1 > 0) {
				return { ...state, hLH: state.hLH - 0.1 };
			}
			return state;

		case "hLS+":
			return { ...state, hLS: state.hLS + 1 };
		case "hLS-":
			if (state.hLS - 1 > -1) {
				return { ...state, hLS: state.hLS - 1 };
			}
			return state;

		case "pSize+":
			return { ...state, pSize: state.pSize + 1 };
		case "pSize-":
			if (state.pSize - 1 > 0) {
				return { ...state, pSize: state.pSize - 1 };
			}
			return state;

		case "pWeight+":
			if (state.pWeight + 100 <= 900) {
				return { ...state, pWeight: state.pWeight + 100 };
			}
			return state;
		case "pWeight-":
			if (state.pWeight - 100 >= 100) {
				return { ...state, pWeight: state.pWeight - 100 };
			}
			return state;

		case "pColor":
			return { ...state, pColor: action.payload };

		case "pLH+":
			return { ...state, pLH: state.pLH + 0.1 };
		case "pLH-":
			if (state.pLH - 0.1 > 0) {
				return { ...state, pLH: state.pLH - 0.1 };
			}
			return state;

		case "pLS+":
			return { ...state, pLS: state.pLS + 1 };
		case "pLS-":
			if (state.pLS - 1 > -1) {
				return { ...state, pLS: state.pLS - 1 };
			}
			return state;

		default:
			throw new Error("Unknown action type");
	}
};

const initialState = {
	hSize: 32,
	bg: "#fff",
	hColor: "#000",
	hWeight: 700,
	hLH: 1,
	hLS: 0,
	pSize: 16,
	pWeight: 400,
	pColor: "#000",
	pLH: 1.5,
	pLS: 0,
};

export default function Home() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [scope, animate] = useAnimate();
	const [families, setFamilies] = useState(["Inter"]);
	const [shown, show] = useState(true);
	const init = () => {
		show(false);
	};

	useEffect(() => {
		WebFontLoader.load({ google: { families, } });
	}, [families]);

	return (
		<main className="flex flex-col" ref={scope}>
			<div className={cn("text-center mt-10", inter.className)}>
				<h1 className="text-7xl font-bold">The simplest font testing app</h1>
				<p className="mt-3 text-lg">
					We all know there’s too many fonts out there,
					<br /> so here’s an app that might make your life a bit easier
				</p>
				<div className="flex justify-center mt-5 h-[40px] relative">
					{!shown && (
						<motion.div
							initial={{ width: 120, maxWidth: 120, opacity: 0 }}
							animate={{
								opacity: 1,
								maxWidth: 300,
								width: 300,
							}}
							className="absolute top-0">
							<Input
								placeholder="Search Google fonts or local fonts"
								className="search  z-20 w-full text-center border-black bg-transparent"
							/>
						</motion.div>
					)}
					<AnimatePresence>
						{shown && (
							<motion.div
								initial={{ opacity: 1, maxWidth: "auto" }}
								exit={{ opacity: 0, maxWidth: 0 }}>
								<Button className="start z-10" onClick={init}>
									Start Testing
								</Button>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
				<AnimatePresence>
					{!shown && (
						<motion.div
							initial={{ opacity: 0, left: -50 }}
							animate={{
								opacity: 1,
								left: 5,
							}}
							className="control-center fixed top-1/2 left-2 -translate-y-1/2 border-[2px] border-black p-5 bg-white rounded-xl shadow-lg scale-75">
							<ControlCenter dispatch={dispatch} state={state} />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			<AnimatePresence>
				{!shown && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="flex items-center flex-col my-5">
						<span>Background Color</span>
						<Input
							type="color"
							className="w-[100px]"
							onChange={(e) =>
								dispatch({ type: "bg", payload: e.target.value })
							}
						/>
					</motion.div>
				)}
			</AnimatePresence>
			<ul className="list flex flex-wrap w-full gap-5 justify-center mt-10 px-10">
				<AnimatePresence>
					{families.map((font, i) =>
						!shown ? (
							<motion.div
								className="inline max-w-fit"
								style={{ flex: "1 1 25%" }}
								key={i}
								initial={{ opacity: 0, y: 100 }}
								animate={{ opacity: 1, y: 0 }}>
								<Card {...state} font={font} />
							</motion.div>
						) : null
					)}
				</AnimatePresence>
			</ul>
		</main>
	);
}
