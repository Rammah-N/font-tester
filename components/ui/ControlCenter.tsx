"use client";
import { Button } from "@/components/ui/button";
import {
	Tooltip as ShadTooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

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

const ControlCenter = () => {
	return (
		<aside className="border-[2px] border-black p-5 rounded-xl  absolute top-1/2 right-5 -translate-y-1/2 shadow-lg">
			<div className="text-center">
				<h1 className="mb-3">
					<strong>{`<h1 />`}</strong>
				</h1>
				<div className="flex flex-col gap-3">
					<Tooltip note="Edit heading font size">
						<Button>Size</Button>
					</Tooltip>
					<Tooltip note="Edit heading background color">
						<Button className="border-[1px] border-black bg-white text-black hover:bg-white">
							BG
						</Button>
					</Tooltip>
					<Tooltip note="Edit heading line-height">
						<Button className="border-[1px] border-black bg-white text-black hover:bg-white">
							L-H
						</Button>
					</Tooltip>
					<Tooltip note="Edit heading letter-spacing">
						<Button className="border-[1px] border-black bg-white text-black hover:bg-white">
							L-S
						</Button>
					</Tooltip>
				</div>
			</div>
			<div className="text-center mt-5">
				<h1 className="mb-3">
					<strong>{`<p />`}</strong>
				</h1>
				<div className="flex flex-col gap-3">
					<Tooltip note="Edit paragraph font size">
						<Button>Size</Button>
					</Tooltip>
					<Tooltip note="Edit paragraph background color">
						<Button className="border-[1px] border-black bg-white text-black hover:bg-white">
							BG
						</Button>
					</Tooltip>
					<Tooltip note="Edit paragraph line-height">
						<Button className="border-[1px] border-black bg-white text-black hover:bg-white">
							L-H
						</Button>
					</Tooltip>
					<Tooltip note="Edit paragraph letter-spacing">
						<Button className="border-[1px] border-black bg-white text-black hover:bg-white">
							L-S
						</Button>
					</Tooltip>
				</div>
			</div>
		</aside>
	);
};

export default ControlCenter;
