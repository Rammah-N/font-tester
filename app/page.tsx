"use client";
import Card from "@/components/Card";
import ControlCenter from "@/components/ControlCenter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { AnimatePresence, LayoutGroup, useAnimate } from "framer-motion";
import { motion } from "framer-motion";
import { Inter } from "next/font/google";
import { useEffect, useReducer, useRef, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { differenceWith, isEqual, unionBy } from "lodash";
import { Eye } from "lucide-react";
import { actionType, CardProps, Family } from "@/lib/types";

const inter = Inter({ subsets: ["latin"] });

const reducer = (
	state: CardProps,
	action: { type: actionType; payload?: any }
) => {
	const key = action.type.replace("+", "").replace("-", "");
	const value = state[key as keyof CardProps];
	switch (action.type) {
		case "bg":
		case "hColor":
		case "pColor":
			return { ...state, [key]: action.payload };

		case "hSize+":
		case "pSize+":
		case "hLS+":
		case "pLS+":
			return { ...state, [key]: (value as number) + 1 };

		case "hSize-":
		case "pSize-":
		case "hLS-":
		case "pLS-":
			if ((value as number) - 1 > 0) {
				return { ...state, [key]: (value as number) - 1 };
			}
			return state;

		case "hWeight+":
		case "pWeight+":
			if ((value as number) + 100 <= 900) {
				return { ...state, [key]: (value as number) + 100 };
			}
			return state;
		case "hWeight-":
		case "pWeight-":
			if ((value as number) - 100 >= 100) {
				return { ...state, [key]: (value as number) - 100 };
			}
			return state;

		case "hLH+":
		case "pLH+":
			return { ...state, [key]: (value as number) + 0.1 };

		case "hLH-":
		case "pLH-":
			if ((value as number) - 0.1 > 0) {
				return { ...state, [key]: (value as number) - 0.1 };
			}
			return state;

		default:
			throw new Error("Unknown action type");
	}
};

const initialState = {
	hSize: 32,
	bg: "#ffffff",
	heading: "I honestly couldn't come up with a title",
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

	const [families, setFamilies] = useState<Array<Family>>([]);
	const [selectedFamilies, setSelectedFamilies] = useState<Array<Family>>([]);

	const [loadedFonts, setLoadedFonts] = useState<Array<Family>>([]);
	const [hoveredFont, setHoveredFont] = useState<Family | null>(null);

	const [query, setQuery] = useState("");
	const [searchResults, setResults] = useState<Array<Family> | null>(null);

	const [shown, show] = useState(false);
	const [clearMode, setClearMode] = useState(false);
	const [showResults, setShowResults] = useState(false);
	const [isHovering, setIsHovering] = useState(false);
	let hoverTimeoutId: any = null;

	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.toLowerCase();
		if (value) {
			setShowResults(true);
			setQuery(value);
			setResults(
				families.filter((item) => item.family.toLowerCase().includes(value))
			);
		} else {
			setShowResults(false);
			setQuery("");
		}
	};

	const checkIsLoaded = (font: Family) => {
		return loadedFonts.find((item: Family) => item.family === font.family)!!;
	};

	const previewFont = (font: Family) => {
		if (!isHovering) {
			setIsHovering(true);
			const exists = checkIsLoaded(font);
			if (!exists) {
				hoverTimeoutId = window.setTimeout(async () => {
					const fontLoader = require("webfontloader");
					await fontLoader.load({
						google: {
							families: [font.family + ":" + font.variants.join(",")],
						},
					});
					setLoadedFonts((prev) => [...prev, font]);
					setHoveredFont(font);
				}, 2000);
			} else {
				setHoveredFont(font);
			}
		}
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
				alert("Error fetching Google fonts, please refresh");
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
					onMouseEnter={() => previewFont(data[index])}
					onMouseLeave={() => {
						setIsHovering(false);
						setHoveredFont(null);
						window.clearTimeout(hoverTimeoutId);
					}}
				/>
			</li>
		);
	};
	return (
		<>
			{showResults && (
				<div
					className="absolute top-0 left-0 bottom-0 right-0 z-[100]"
					onClick={() => {
						setShowResults(false);
						setIsHovering(false);
					}}></div>
			)}
			<motion.main
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="text-center md:hidden">
				<h1 className="text-7xl font-bold px-4">
					The simplest font testing app
				</h1>
				<p className="mt-5 text-lg">
					We all know there’s too many fonts out there,
					<br /> so here’s an app that might make your life a bit easier <br />
					that unfortunately only works on desktops <i>(for now)</i>
				</p>
			</motion.main>
			<main className="flex-col hidden md:flex">
				<LayoutGroup>
					<AnimatePresence>
						{shown && selectedFamilies.length > 0 && (
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
					</AnimatePresence>
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
												placeholder="Search Google fonts"
												className="search z-[200] w-full text-center border-black bg-transparent"
												value={query}
												onChange={onSearch}
												autoComplete="off"
												autoFocus
											/>
											{hoveredFont && isHovering && (
												<motion.div
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													exit={{ opacity: 0 }}
													className="absolute top-0 w-fit -right-full p-4 rounded-md shadow-md z-[300] bg-[#faf9f6]">
													<p
														style={{
															fontFamily: hoveredFont?.family || "Inter",
															whiteSpace: "nowrap",
														}}>
														The quick brown fox jumps over the lazy dog
													</p>
												</motion.div>
											)}
											{searchResults && query && showResults && (
												<motion.ul
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													exit={{ opacity: 0 }}
													className="w-full shadow-md rounded-md bg-[#faf9f6] p-3 z-[200] border-black border-[1px] mt-2 relative">
													{searchResults.length > 0 ? (
														<List
															className="w-full max-h-[200px] min-h-[100px]"
															height={searchResults.length * 10}
															width="auto"
															itemData={searchResults}
															itemCount={searchResults.length}
															itemSize={40}>
															{Row}
														</List>
													) : (
														<p>No fonts found</p>
													)}
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
										className="fixed top-1/2 left-2 -translate-y-1/2">
										<motion.div className="control-center border-[2px] border-black p-5 bg-white rounded-xl shadow-lg scale-75">
											<ControlCenter dispatch={dispatch} state={state} />
										</motion.div>
									</motion.div>
								)}
								{shown && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className="flex items-center flex-col my-5 -z-1">
										<span>Background Color</span>
										<Input
											type="color"
											className="w-[100px]"
											onChange={(e) =>
												dispatch({ type: "bg", payload: e.target.value })
											}
											value={state.bg}
										/>
									</motion.div>
								)}
							</motion.div>
						)}
					</AnimatePresence>

					<motion.ul
						layout="position"
						className="list w-full gap-5 justify-center items-center place-content-center place-items-center mt-10 px-10 grid"
						style={{
							gridTemplateColumns: "repeat(auto-fit, minmax(500px,500px))",
						}}>
						<AnimatePresence>
							{selectedFamilies.map((font, i) =>
								shown ? (
									<motion.div
										className="flex justify-center mx-auto w-full"
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
		</>
	);
}
