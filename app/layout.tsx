import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Font Tester",
	description: "An app to test different fonts",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={cn(
					"min-h-screen flex flex-col justify-between",
					inter.className
				)}>
				{children}
				<footer className="flex justify-center py-5 gap-5">
					<Link href="https://github.com/Rammah-N" target="_blank">
						<Github />
					</Link>
					<Link href="https://linkedin.com/in/rammah-mohammed" target="_blank">
						<Linkedin />
					</Link>
				</footer>
			</body>
		</html>
	);
}
