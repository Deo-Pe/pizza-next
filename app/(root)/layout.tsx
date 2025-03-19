import type { Metadata } from "next";
import { Header } from "@/components/shared/header"

export const metadata: Metadata = {
	title: "next-pizza | главная",
	description: "magazin pizza",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="min-h-screen">
			<Header />
			{children}
		</main>
	);
}
