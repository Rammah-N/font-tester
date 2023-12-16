import type { Metadata } from "next";
import "./globals.css";
import { Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

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
			<head>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
			</head>
			<body className={cn("min-h-screen flex flex-col ")}>
				<header className="flex justify-center py-4">
					<Image
						src={logo}
						width={100}
						height={100}
						alt="A logo of letter F with different pattern designs embedded in the letter"
					/>
				</header>
				{children}
				<footer className="flex justify-center py-5 gap-5 mt-auto">
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
