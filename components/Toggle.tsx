import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { CloudSun, Moon, Sparkles, Sun } from "lucide-react";


import { Switch } from "./ui/switch";

const ThemeToggle = () => {
	const { setTheme, theme } = useTheme();
	const [isChecked, setC] = useState(false);
	const [showAnimation, setShowAnimation] = useState(false);
	let timeoutId: NodeJS.Timeout;
	useEffect(() => {
		if (showAnimation) {
			timeoutId = setTimeout(() => {
				setShowAnimation(false);
			}, 400);
		}

		return () => clearTimeout(timeoutId);
	}, [showAnimation]);

	return (
		<div className="bg-background relative">
			<Sun className="absolute top-[3px] left-[2px] text-[#fb8500]" size={18} />
			<Moon
				className="absolute top-[3px] right-[2px] text-[#8ecae6]"
				size={18}
			/>
			<Switch
				className="w-[60px]"
				onCheckedChange={() => {
					setTheme(theme === "dark" ? "light" : "dark");
					setShowAnimation(true);
					setC((prev) => !prev);
				}}
				checked={!isChecked}
			/>
			<AnimatePresence>
				{theme === "dark" && showAnimation && (
					<>
						<motion.div
							className="absolute"
							initial={{ top: 0, right: 0 }}
							animate={{ top: -5, right: -5 }}>
							<Sparkles size={12} className="text-white" />
						</motion.div>
						<motion.div
							className="absolute"
							initial={{ bottom: 0, right: 0 }}
							animate={{ bottom: -5, right: -5 }}>
							<Sparkles size={12} className="text-white" />
						</motion.div>
					</>
				)}
				{theme === "light" && showAnimation && (
					<>
						<motion.div
							className="absolute"
							initial={{ top: 0, left: 0 }}
							animate={{ top: -5, left: -15 }}>
							<CloudSun size={12} className="text-[#fb8500]" />
						</motion.div>
						<motion.div
							className="absolute"
							initial={{ bottom: 0, left: 0 }}
							animate={{ bottom: -5, left: -15 }}>
							<CloudSun size={12} className="text-[#fb8500]" />
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
};

export default ThemeToggle;
