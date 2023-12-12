import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col justify-center">
			<div className="text-center">
				<h1 className="text-6xl font-bold ">The coolest font testing app</h1>
				<p className="mt-3 text-lg">
					We all know there’s too many fonts out there,
					<br /> so here’s an app that might make your life a bit easier
				</p>
				<Button className="mt-5" name="start-button">
					Enter the danger zone
				</Button>
			</div>
		</main>
	);
}
