"use client";
import { Button } from "@/components/ui/button";
import {
	Tooltip as ShadTooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { Dispatch, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useLongPress } from "use-long-press";
import { Input } from "./ui/input";
import { CardProps, actionType } from "@/lib/types";

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
		const [pressed, press] = useState(false);
		const [dispatching, setStartDispatching] = useState(false);
		const [type, setType] = useState<actionType | null>(null);
		const intervalIdRef = useRef<any>(null);

		const plusBind = useLongPress(
			() => {
				setType(plusType);
			},
			{
				onStart: () => {
					setType(plusType);
					setStartDispatching(true);
				},
				onFinish: () => {
					setType(null);
					setStartDispatching(false);
				},
				threshold: 20,
			}
		);
		const minusBind = useLongPress(
			() => {
				setType(minusType);
			},
			{
				onStart: () => {
					setType(minusType);
					setStartDispatching(true);
				},
				onFinish: () => {
					setType(null);
					setStartDispatching(false);
				},
				threshold: 20,
			}
		);
		useEffect(() => {
			if (dispatching && type) {
				intervalIdRef.current = window.setInterval(() => {
					dispatch({ type: type as actionType });
				}, 80);
			}
			return () => clearInterval(intervalIdRef.current);
		}, [dispatching, type]);

		return (
			<div>
				<span className="text-sm">{title}</span>
				<div
					className="border-[1px] rounded-lg border-black bg-white text-black hover:bg-white flex items-center justify-between"
					ref={ref}>
					<Button
						className="bg-transparent hover:bg-transparent text-black px-2"
						{...minusBind("minus")}>
						<Minus size={15} />
					</Button>
					<span>{text}</span>
					<Button
						className="bg-transparent hover:bg-transparent text-black px-2"
						{...plusBind("plus")}>
						<Plus size={15} />
					</Button>
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
	return (
		<>
			<div className="text-center">
				<h1 className="mb-3">
					<strong>{`<h1 />`}</strong>
				</h1>
				<div className="flex flex-col gap-3">
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
			<div className="text-center mt-5">
				<h1 className="mb-3">
					<strong>{`<p />`}</strong>
				</h1>
				<div className="flex flex-col gap-3">
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
};

export default ControlCenter;
