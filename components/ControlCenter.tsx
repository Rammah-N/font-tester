"use client";
import { Button } from "@/components/ui/button";

import React, { Dispatch, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { Input } from "./ui/input";
import { CardProps, actionType } from "@/lib/types";
import ReactDOM from "react-dom";
import { cn } from "@/lib/utils";
import { useLongPress, useWindowSize } from "@uidotdev/usehooks";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ActionButton = React.forwardRef(
	(
		{
			text,
			plusType,
			minusType,
			dispatch,
			title,
		}: {
			text: string | number;
			plusType: actionType;
			minusType: actionType;
			dispatch: Dispatch<{ type: actionType; payload?: any }>;
			title?: string;
		},
		ref: React.Ref<HTMLDivElement>
	) => {
		const [dispatching, setStartDispatching] = useState(false);
		const [type, setType] = useState<actionType | null>(null);
		const intervalIdRef = useRef<any>(null);
		const windowSize = useWindowSize();

		const plusBind = useLongPress(
			(e) => {
				setType(plusType);
			},
			{
				onStart: (e) => {
					setType(plusType);
					setStartDispatching(true);
				},
				onFinish: (e) => {
					setType(null);
					setStartDispatching(false);
				},
				onCancel(e) {
					clearInterval(intervalIdRef.current);
					dispatch({ type: type as actionType });
					setType(null);
					setStartDispatching(false);
				},

				threshold: 100,
			}
		);
		const minusBind = useLongPress(
			(e) => {
				setType(minusType);
			},
			{
				onStart: (e) => {
					setType(minusType);
					setStartDispatching(true);
				},
				onFinish: (e) => {
					setType(null);
					setStartDispatching(false);
				},
				onCancel(e) {
					clearInterval(intervalIdRef.current);
					dispatch({ type: type as actionType });
					setType(null);
					setStartDispatching(false);
				},

				threshold: 100,
			}
		);
		useEffect(() => {
			if (dispatching && type) {
				intervalIdRef.current = window.setInterval(() => {
					dispatch({ type: type as actionType });
				}, 100);
			}
			return () => clearInterval(intervalIdRef.current);
		}, [dispatching, type]);

		return (
			<div className="text-center">
				<span className="text-sm">{title}</span>
				<div
					className="border-[1px] rounded-lg border-black bg-white text-black hover:bg-white flex items-center justify-between"
					ref={ref}>
					{(windowSize.width as number) > 768 ? (
						<Button
							className="bg-transparent hover:bg-transparent text-black px-2"
							{...minusBind}>
							<Minus size={15} />
						</Button>
					) : (
						<Button
							className="bg-transparent hover:bg-transparent text-black px-2"
							onTouchStart={minusBind.onTouchStart}
							onTouchEnd={minusBind.onTouchEnd}>
							<Minus size={15} />
						</Button>
					)}
					<span className="w-full text-center">{text}</span>
					{(windowSize.width as number) > 768 ? (
						<Button
							className="bg-transparent hover:bg-transparent text-black px-2"
							{...plusBind}>
							<Plus size={15} />
						</Button>
					) : (
						<Button
							className="bg-transparent hover:bg-transparent text-black px-2"
							onTouchStart={plusBind.onTouchStart}
							onTouchEnd={plusBind.onTouchEnd}>
							<Plus size={15} />
						</Button>
					)}
				</div>
			</div>
		);
	}
);

const ControlCenter = ({
	dispatch,
	state,
}: {
	dispatch: Dispatch<{ type: actionType; payload?: any }>;
	state: CardProps;
}) => {
	const ccRoot = document.getElementById("control-center");

	if (!ccRoot) {
		return null;
	}
	const windowSize = useWindowSize();
	const isMobile = windowSize.width ? windowSize?.width <= 768 : null;
	const initial = isMobile
		? {
				bottom: -20,
				opacity: 0,
		  }
		: { opacity: 0, left: -50 };
	const animate = isMobile
		? {
				bottom: 0,
				opacity: 1,
		  }
		: {
				opacity: 1,
				left: 5,
		  };

	const mobileClasses =
		"fixed w-screen bottom-0 flex items-center justify-between control-center border-t-[1px] border-black p-5 dark:text-black bg-white shadow-lg rounded-t-xl";
	const desktopClasses =
		"fixed top-1/2 left-2 -translate-y-1/2 control-center border-[2px] border-black p-5 dark:text-black bg-white rounded-xl shadow-lg scale-75";

	if (!windowSize.width) {
		return null;
	}

	return ReactDOM.createPortal(
		<motion.aside
			initial={initial}
			animate={animate}
			exit={initial}
			className={isMobile ? mobileClasses : desktopClasses}>
			{!isMobile ? (
				<>
					<div className="text-center">
						<h1 className="mb-3">
							<strong>{`<h1 />`}</strong>
						</h1>
						<div className="hidden md:flex flex-col gap-3">
							<ActionButton
								text={`${state.hSize}px`}
								plusType="hSize+"
								minusType="hSize-"
								dispatch={dispatch}
								title="font size"
							/>
							<ActionButton
								text={`${state.hWeight}`}
								plusType="hWeight+"
								minusType="hWeight-"
								dispatch={dispatch}
								title="font weight"
							/>
							<div className="flex flex-col">
								<span className="text-sm">color</span>
								<Input
									type="color"
									onChange={(e) =>
										dispatch({ type: "hColor", payload: e.target.value })
									}
								/>
							</div>
							<ActionButton
								text={state.hLH.toFixed(1)}
								plusType="hLH+"
								minusType="hLH-"
								dispatch={dispatch}
								title="line height"
							/>
							<ActionButton
								text={state.hLS + "px"}
								plusType="hLS+"
								minusType="hLS-"
								dispatch={dispatch}
								title="letter spacing"
							/>
						</div>
					</div>
					<div className=" text-center md:mt-5">
						<h1 className="md:mb-3">
							<strong>{`<p />`}</strong>
						</h1>
						<div className="hidden md:flex flex-col gap-3">
							<ActionButton
								text={`${state.pSize}px`}
								plusType="pSize+"
								minusType="pSize-"
								dispatch={dispatch}
								title="font size"
							/>
							<ActionButton
								text={`${state.pWeight}`}
								plusType="pWeight+"
								minusType="pWeight-"
								dispatch={dispatch}
								title="font weight"
							/>
							<div className="flex flex-col">
								<span className="text-sm">color</span>
								<Input
									type="color"
									onChange={(e) =>
										dispatch({ type: "pColor", payload: e.target.value })
									}
								/>
							</div>

							<ActionButton
								text={state.pLH.toFixed(1)}
								plusType="pLH+"
								minusType="pLH-"
								dispatch={dispatch}
								title="line height"
							/>

							<ActionButton
								text={state.pLS + "px"}
								plusType="pLS+"
								minusType="pLS-"
								dispatch={dispatch}
								title="letter spacing"
							/>
						</div>
					</div>
				</>
			) : (
				<>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								className="px-10 border-black">{`<h1 />`}</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="px-4 pb-2">
							<DropdownMenuLabel>Heading styles</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<div className="flex flex-col gap-2">
								<ActionButton
									text={`${state.hSize}px`}
									plusType="hSize+"
									minusType="hSize-"
									dispatch={dispatch}
									title="font size"
								/>
								<ActionButton
									text={`${state.hWeight}`}
									plusType="hWeight+"
									minusType="hWeight-"
									dispatch={dispatch}
									title="font weight"
								/>
								<div className="flex flex-col text-center">
									<span className="text-sm">color</span>
									<Input
										type="color"
										onChange={(e) =>
											dispatch({ type: "hColor", payload: e.target.value })
										}
									/>
								</div>
								<ActionButton
									text={state.hLH.toFixed(1)}
									plusType="hLH+"
									minusType="hLH-"
									dispatch={dispatch}
									title="line height"
								/>
								<ActionButton
									text={state.hLS + "px"}
									plusType="hLS+"
									minusType="hLS-"
									dispatch={dispatch}
									title="letter spacing"
								/>
							</div>
						</DropdownMenuContent>
					</DropdownMenu>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								className="px-10 border-black">{`<p />`}</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="px-4 pb-2">
							<DropdownMenuLabel>Paragraph styles</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<div className="flex flex-col gap-2">
								<ActionButton
									text={`${state.pSize}px`}
									plusType="pSize+"
									minusType="pSize-"
									dispatch={dispatch}
									title="font size"
								/>
								<ActionButton
									text={`${state.pWeight}`}
									plusType="pWeight+"
									minusType="pWeight-"
									dispatch={dispatch}
									title="font weight"
								/>
								<div className="flex flex-col">
									<span className="text-sm">color</span>
									<Input
										type="color"
										onChange={(e) =>
											dispatch({ type: "pColor", payload: e.target.value })
										}
									/>
								</div>

								<ActionButton
									text={state.pLH.toFixed(1)}
									plusType="pLH+"
									minusType="pLH-"
									dispatch={dispatch}
									title="line height"
								/>

								<ActionButton
									text={state.pLS + "px"}
									plusType="pLS+"
									minusType="pLS-"
									dispatch={dispatch}
									title="letter spacing"
								/>
							</div>
						</DropdownMenuContent>
					</DropdownMenu>
				</>
			)}
		</motion.aside>,
		ccRoot
	);
};

export default ControlCenter;
