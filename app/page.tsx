"use client";
import Card, { CardProps } from "@/components/Card";
import ControlCenter from "@/components/ControlCenter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { AnimatePresence, LayoutGroup, useAnimate } from "framer-motion";
import { motion } from "framer-motion";
import { Inter } from "next/font/google";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { FixedSizeList as List } from "react-window";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { differenceWith, isEqual, unionBy } from "lodash";
import { Eye } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

type Family = { family: string; variants: Array<string> };

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
	bg: "transparent",
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

	const [families, setFamilies] = useState<Array<Family>>([
		{
			family: "Inter",
			variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
		},
	]);
	const [selectedFamilies, setSelectedFamilies] = useState<Array<Family>>([
		{
			family: "Inter",
			variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
		},
	]);
	const [loadedFonts, setLoadedFonts] = useState<Array<Family>>([]);
	const [hoveredFont, setHoveredFont] = useState<Family | null>(null);

	const [query, setQuery] = useState("");
	const [searchResults, setResults] = useState<Array<Family>>([]);

	const [shown, show] = useState(false);
	const [clearMode, setClearMode] = useState(false);

	let hoverTimeoutId: any = null;


	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.toLowerCase();
		if (value) {
			setQuery(value);
			setResults(
				families.filter((item) => item.family.toLowerCase().includes(value))
			);
		} else {
			setQuery("");
		}
	};

	const checkIsLoaded = (font: Family) => {
		return loadedFonts.find((item: Family) => item.family === font.family)!!;
	};

	const previewFont = (font: Family) => {
		hoverTimeoutId = window.setTimeout(async () => {
			const exists = checkIsLoaded(font);
			if (!exists) {
				const fontLoader = require("webfontloader");
				await fontLoader.load({
					google: {
						families: [font.family + ":" + font.variants.join(",")],
					},
				});
				setLoadedFonts((prev) => [...prev, font]);
			}
			setHoveredFont(font);
		}, 1000);
	};

	const addFont = (font: Family) => {
		const exists = selectedFamilies.find((item) => item.family === font.family);
		if (!exists) {
			setSelectedFamilies((prev) => [...prev, font]);
		}
	};

	useEffect(() => {
		const fetchGoogleFonts = async () => {
			try {
				const response = await fetch(
					`https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.NEXT_PUBLIC_KEY}`
				);
				const data = await response.json();
				const fontFamilies = data.items.map((item: Family) => ({
					family: item.family,
					variants: item.variants,
				}));
				setFamilies(fontFamilies);
			} catch (error) {
				console.error("Error fetching Google Fonts:", error);
			}
		};

		fetchGoogleFonts();
	}, []);

	useEffect(() => {
		// webfontloader uses window object on import, so it needs to be initialized only after render
		if (typeof window !== "undefined" && selectedFamilies.length > 0) {
			const fontLoader = require("webfontloader");
			const filiterLoaded = differenceWith(
				selectedFamilies,
				loadedFonts,
				isEqual
			);
			if (filiterLoaded.length > 0) {
				fontLoader.load({
					google: {
						families: filiterLoaded.map(
							(family) => family.family + ":" + family.variants.join(",")
						),
					},
				});
				setLoadedFonts((prev) => unionBy(prev, filiterLoaded, "family"));
			}
		}
	}, [selectedFamilies]);

	const Row = ({ data, index, style }: any) => {
		return (
			<li
				key={index}
				style={style}
				className="flex justify-between items-center">
				<Button variant="link" onClick={() => addFont(data[index])}>
					{data[index].family}
				</Button>
				<Eye
					className="cursor-pointer mr-4"
					size={15}
					onMouseOver={() => previewFont(data[index])}
					onMouseOut={() => {
						setHoveredFont(null);
						window.clearTimeout(hoverTimeoutId);
					}}
				/>
			</li>
		);
	};

	return (
		<TooltipProvider>
			<main className="flex flex-col" ref={scope}>
				<LayoutGroup>
					{shown && (
						<motion.div
							initial={{ y: 0 }}
							animate={{ y: [0, -5, 0] }} // Bouncing animation
							transition={{ repeat: 10, duration: 0.5 }}
							className="flex justify-center absolute top-10 right-10 clear">
							<Button
								variant="link"
								onClick={() => setClearMode((prev) => !prev)}>
								{clearMode ? "show" : "hide"} stuff
							</Button>
						</motion.div>
					)}
					<AnimatePresence>
						{!clearMode && (
							<motion.div
								initial={{ opacity: 1 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className={cn("text-center", inter.className)}>
								<motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
									<h1 className="text-7xl font-bold px-4">
										The simplest font testing app
									</h1>
									<p className="mt-3 text-lg">
										We all know there’s too many fonts out there,
										<br /> so here’s an app that might make your life a bit
										easier
									</p>
								</motion.div>
								<div className="flex justify-center mt-5 h-[40px] relative">
									{shown && (
										<motion.div
											initial={{ width: 120, maxWidth: 120, opacity: 0 }}
											animate={{
												opacity: 1,
												maxWidth: 300,
												width: 300,
											}}
											exit={{ width: 120, maxWidth: 120, opacity: 0 }}
											className="absolute top-0">
											<Input
												type="text"
												name="search"
												placeholder="Search Google fonts or local fonts"
												className="search z-20 w-full text-center border-black bg-transparent"
												value={query}
												onChange={onSearch}
												autoComplete="off"
											/>
											{hoveredFont && (
												<motion.div
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													exit={{ opacity: 0 }}
													className="absolute top-0 w-fit -right-full p-4 rounded-md shadow-md z-[100] bg-[#faf9f6]">
													<p
														style={{
															fontFamily: hoveredFont?.family || "Inter",
															whiteSpace: "nowrap",
														}}>
														The quick brown fox jumps over the lazy dog
													</p>
												</motion.div>
											)}
											{searchResults.length > 0 && query && (
												<motion.ul
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													exit={{ opacity: 0 }}
													className="w-full shadow-md rounded-md bg-[#faf9f6] p-3 z-50 border-black border-[1px] mt-2 relative">
													<List
														className="w-full max-h-[200px] min-h-[100px]"
														height={searchResults.length * 10}
														width="auto"
														itemData={searchResults}
														itemCount={searchResults.length}
														itemSize={40}>
														{Row}
													</List>
												</motion.ul>
											)}
										</motion.div>
									)}
									{!shown && (
										<motion.div
											initial={{ opacity: 1, maxWidth: "auto" }}
											exit={{ opacity: 0, maxWidth: 0 }}>
											<Button className="start z-10" onClick={() => show(true)}>
												Start Testing
											</Button>
										</motion.div>
									)}
								</div>
								{shown && (
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
								{shown && (
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
							</motion.div>
						)}
					</AnimatePresence>

					<motion.ul
						layout="position"
						className="list flex flex-wrap w-full gap-5 justify-center mt-10 px-10">
						<AnimatePresence>
							{selectedFamilies.map((font, i) =>
								shown ? (
									<motion.div
										className="inline max-w-fit"
										style={{ flex: "1 1 25%" }}
										key={font.family}
										initial={{ opacity: 0, y: 100 }}
										animate={{ opacity: 1, y: 0 }}>
										<Card {...state} font={font} />
									</motion.div>
								) : null
							)}
						</AnimatePresence>
					</motion.ul>
				</LayoutGroup>
			</main>
		</TooltipProvider>
	);
}
