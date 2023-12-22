import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
	const { systemTheme } = useTheme();

	console.log(systemTheme);
	return (
		<motion.button>
			<AnimatePresence>
				{}
				{}
			</AnimatePresence>
		</motion.button>
	);
};

export default ThemeToggle;
