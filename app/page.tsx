"use client";
import Card from "@/components/Card";
import ControlCenter from "@/components/ControlCenter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, useAnimate } from "framer-motion";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
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
		<main className="flex flex-col lg:container" ref={scope}>
			<div className="text-center mt-60">
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
								className="search  z-20 w-full text-center border-black"
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
					<ControlCenter />
				</AnimatePresence>
			</div>

			<ul
				className="list grid w-full gap-5 justify-center mt-10 px-10"
				style={{
					gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr)",
				}}>
				<AnimatePresence>
					{[1, 2, 3].map((a, i) =>
						!shown ? (
							<motion.li
								className="w-fit"
								key={i}
								initial={{ opacity: 0, y: 100 }}
								animate={{ opacity: 1, y: 0 }}>
								<Card />
							</motion.li>
						) : null
					)}
				</AnimatePresence>
			</ul>
			
		</main>
	);
}
