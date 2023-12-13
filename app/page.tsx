"use client";
import Card, { CardProps } from "@/components/Card";
import ControlCenter from "@/components/ControlCenter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, useAnimate } from "framer-motion";
import { motion } from "framer-motion";
import { useReducer, useState } from "react";

export type actionType =
	| "hSize+"
	| "hSize-"
	| "hWeight+"
	| "hWeight-"
	| "hBG"
	| "hLH+"
	| "hLH-"
	| "hLS+"
	| "hLS-"
	| "pSize+"
	| "pSize-"
	| "pWeight+"
	| "pWeight-"
	| "pBG"
	| "pLH+"
	| "pLH-"
	| "pLS+"
	| "pLS-";

const reducer = (
	state: CardProps,
	action: { type: actionType; payload?: any }
) => {
	switch (action.type) {
		case "hSize+":
			return { ...state, hSize: state.hSize + 1 };
		case "hSize-":
			if (state.hSize - 1 > 0) {
				console.log("hello");
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

		case "hBG":
			return { ...state, hBG: action.payload };

		case "hLH+":
			return { ...state, hLH: state.hLH + 0.1 };
		case "hLH-":
			if (state.hLH - 0.1 > 0) {
				return { ...state, hLH: state.hLH - 0.1 };
			}
			return state;

		case "hLS+":
			return { ...state, hLH: state.hLS + 1 };
		case "hLS-":
			if (state.hLS - 1 > -1) {
				return { ...state, hLH: state.hLH - 1 };
			}
			return state;

		case "pSize+":
			return { ...state, pSize: state.pSize + 1 };
		case "pSize-":
			if (state.hSize - 1 > 0) {
				return { ...state, pSize: state.pSize - 1 };
			}
			return state;

		case "pWeight+":
			if (state.hWeight + 100 <= 900) {
				return { ...state, pWeight: state.pWeight + 100 };
			}
			return state;
		case "pWeight-":
			if (state.hWeight - 100 >= 100) {
				return { ...state, pWeight: state.pWeight - 100 };
			}
			return state;

		case "pBG":
			return { ...state, pBG: action.payload };

		case "pLH+":
			return { ...state, pLH: state.pLH + 0.1 };
		case "pLH-":
			if (state.hLH - 0.1 > 0) {
				return { ...state, pLH: state.pLH - 0.1 };
			}
			return state;

		case "pLS+":
			return { ...state, pLH: state.pLS + 1 };
		case "pLS-":
			if (state.hLS - 1 > -1) {
				return { ...state, pLH: state.pLH - 1 };
			}
			return state;

		default:
			throw new Error("Unknown action type");
	}
};

const initialState = {
	hSize: 32,
	hWeight: 700,
	hBG: "transparent",
	hLH: 1,
	hLS: 1,
	pSize: 16,
	pWeight: 400,
	pBG: "transparent",
	pLH: 1.5,
	pLS: 0,
};

export default function Home() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [scope, animate] = useAnimate();
	const [shown, show] = useState(true);

	const init = () => {
		show(false);
		animate(".control-center", {
			opacity: 1,
			right: 20,
			animationDuration: 1000,
		});
	};

	return (
		<main className="flex flex-col" ref={scope}>
			<div className="text-center mt-10">
				<h1 className="text-7xl font-bold">The coolest font testing app</h1>
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
				<ControlCenter dispatch={dispatch} state={state} />
			</div>

			<ul className="list flex flex-wrap w-full gap-5 justify-center mt-10 px-10">
				<AnimatePresence>
					{[1, 2, 3].map((a, i) =>
						!shown ? (
							<motion.div
								className="inline max-w-fit"
								style={{ flex: "1 1 25%" }}
								key={i}
								initial={{ opacity: 0, y: 100 }}
								animate={{ opacity: 1, y: 0 }}>
								<Card {...state} />
							</motion.div>
						) : null
					)}
				</AnimatePresence>
			</ul>
		</main>
	);
}
