import type { Metadata } from "next";
import { Header } from "@/shared/components/shared/header"

export const metadata: Metadata = {
	title: "next-pizza | главная",
	description: "magazin pizza",
};

export default function HomeLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<main className="min-h-screen">
			<Header />
			{children}
			{modal}
		</main>
	);
}
