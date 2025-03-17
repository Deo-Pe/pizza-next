import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Header } from "@/components/shared/header"
import "./globals.css";

const geistSans = Nunito({
	subsets: ["cyrillic"],
	variable: "--font-nunito",
	weight: ["400", "500", "600", "700", "800", "900"],
});

const geistMono = Nunito({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

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
		<html lang="en">
			<body
				className={geistSans.variable}
			>
				<main className="min-h-screen">
					<Header />
					{children}
				</main>
			</body>
		</html>
	);
}
