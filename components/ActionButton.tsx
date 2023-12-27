"use client";
import React, { Dispatch, useEffect, useRef, useState } from "react";
import { useLongPress, useWindowSize } from "@uidotdev/usehooks";

import { actionType } from "@/lib/types";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

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

		const handleBind = (type: actionType | null, start: boolean) => {
			setType(type);
			setStartDispatching(start);
		};

		const plusBind = useLongPress(
			(e) => {
				setType(plusType);
			},
			{
				onStart: (e) => {
					handleBind(plusType, true);
				},
				onFinish: (e) => {
					handleBind(null, false);
				},
				onCancel(e) {
					clearInterval(intervalIdRef.current);
					dispatch({ type: type as actionType });
					handleBind(null, false);
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
					handleBind(minusType, true);
				},
				onFinish: (e) => {
					handleBind(null, false);
				},
				onCancel(e) {
					clearInterval(intervalIdRef.current);
					dispatch({ type: type as actionType });
					handleBind(null, false);
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
					className="border-[1px] rounded-lg border-primary bg-background text-primary flex items-center justify-between"
					ref={ref}>
					{(windowSize.width as number) > 768 ? (
						<Button
							className="bg-transparent hover:bg-transparent text-primary px-2"
							{...minusBind}>
							<Minus size={15} />
						</Button>
					) : (
						<Button
							className="bg-transparent hover:bg-transparent text-primary px-2"
							onTouchStart={minusBind.onTouchStart}
							onTouchEnd={minusBind.onTouchEnd}>
							<Minus size={15} />
						</Button>
					)}
					<span className="w-full text-center select-none">{text}</span>
					{(windowSize.width as number) > 768 ? (
						<Button
							className="bg-transparent hover:bg-transparent text-primary px-2"
							{...plusBind}>
							<Plus size={15} />
						</Button>
					) : (
						<Button
							className="bg-transparent hover:bg-transparent text-primary px-2"
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

export default ActionButton;
