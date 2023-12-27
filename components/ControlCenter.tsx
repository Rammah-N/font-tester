"use client";
import React, { Dispatch } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { CardProps, actionType } from "@/lib/types";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "./ui/input";
import ActionButton from "./ActionButton";
import { useWindowSize } from "@uidotdev/usehooks";

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

	const ccClasses = isMobile
		? "fixed w-screen dark:text-primary bg-white dark:bg-background bottom-0 flex items-center justify-between control-center border-t-[1px] border-primary p-5 dark:text-black bg-primary shadow-lg rounded-t-xl"
		: "fixed bg-primary dark:text-primary bg-white dark:bg-background top-1/2 left-2 -translate-y-1/2 control-center border-[2px] border-primary p-5 dark:text-black bg rounded-xl shadow-lg scale-75";

	const renderDesktopControls = () => (
		<>
			<div className="text-center text-primary">
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
			<div className=" text-center md:mt-5 text-primary">
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
	);

	const renderMobileControls = () => (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						className="px-10 border-primary">{`<h1 />`}</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="px-4 pb-2 border-primary">
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
						className="px-10 border-primary">{`<p />`}</Button>
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
	);

	if (!windowSize.width) {
		return null;
	}

	return ReactDOM.createPortal(
		<motion.aside
			initial={initial}
			animate={animate}
			exit={initial}
			className={ccClasses}>
			{isMobile ? renderMobileControls() : renderDesktopControls()}
		</motion.aside>,
		ccRoot
	);
};

export default ControlCenter;
