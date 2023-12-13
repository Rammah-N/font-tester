"use client";
import { Button } from "@/components/ui/button";
import {
	Tooltip as ShadTooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { Dispatch } from "react";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { actionType } from "@/app/page";
import { CardProps } from "./Card";

const Tooltip = ({
	note,
	children,
}: {
	note: string;
	children: React.ReactNode;
}) => {
	return (
		<TooltipProvider>
			<ShadTooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent>
					<p>{note}</p>
				</TooltipContent>
			</ShadTooltip>
		</TooltipProvider>
	);
};

const ActionButton = ({
	text,
	plusType,
	minusType,
	dispatch,
}: {
	text: string;
	plusType: actionType;
	minusType: actionType;
	dispatch: Dispatch<{ type: actionType; payload?: any }>;
}) => {
	return (
		<div className="border-[1px] rounded-lg border-black bg-white text-black hover:bg-white flex items-center">
			<Button
				className="bg-transparent hover:bg-transparent text-black px-2"
				onClick={() => dispatch({ type: minusType })}>
				<Minus />
			</Button>
			<span className="text-sm font-medium">{text}</span>
			<Button
				className="bg-transparent hover:bg-transparent text-black px-2"
				onClick={() => dispatch({ type: plusType })}
				onMouseDown={() => dispatch({ type: plusType })}>
				<Plus />
			</Button>
		</div>
	);
};

const ControlCenter = ({
	dispatch,
	state,
}: {
	dispatch: Dispatch<{ type: actionType; payload?: any }>;
	state: CardProps;
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, right: -50 }}
			transition={{ duration: 500, ease: "easeInOut" }}
			className="control-center absolute top-1/2 right-5 -translate-y-1/2 border-[2px] border-black p-5 bg-white rounded-xl shadow-lg">
			<div className="text-center">
				<h1 className="mb-3">
					<strong>{`<h1 />`}</strong>
				</h1>
				<div className="flex flex-col gap-3">
					<Tooltip note="Edit heading font size">
						<ActionButton
							text="Size"
							plusType="hSize+"
							minusType="hSize-"
							dispatch={dispatch}
						/>
					</Tooltip>

					<Tooltip note="Edit heading background color">
						<Button className="border-[1px] border-black bg-white text-black hover:bg-white">
							BG
						</Button>
					</Tooltip>

					<Tooltip note="Edit heading line-height">
						<ActionButton
							text="L-H"
							plusType="hLH+"
							minusType="hLH-"
							dispatch={dispatch}
						/>
					</Tooltip>

					<Tooltip note="Edit heading letter-spacing">
						<ActionButton
							text="L-H"
							plusType="hLS+"
							minusType="hLS-"
							dispatch={dispatch}
						/>
					</Tooltip>
				</div>
			</div>
			<div className="text-center mt-5">
				<h1 className="mb-3">
					<strong>{`<p />`}</strong>
				</h1>
				<div className="flex flex-col gap-3">
					<Tooltip note="Edit paragraph font size">
						<ActionButton
							text="Size"
							plusType="pSize+"
							minusType="pSize-"
							dispatch={dispatch}
						/>
					</Tooltip>

					<Tooltip note="Edit paragraph background color">
						<Button className="border-[1px] border-black bg-white text-black hover:bg-white">
							BG
						</Button>
					</Tooltip>

					<Tooltip note="Edit paragraph line-height">
						<ActionButton
							text="L-H"
							plusType="pLH+"
							minusType="pLH-"
							dispatch={dispatch}
						/>
					</Tooltip>

					<Tooltip note="Edit paragraph letter-spacing">
						<ActionButton
							text="L-S"
							plusType="pLS+"
							minusType="pLS-"
							dispatch={dispatch}
						/>
					</Tooltip>
				</div>
			</div>
		</motion.div>
	);
};

export default ControlCenter;
