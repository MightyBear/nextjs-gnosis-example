import AuthenticationWrapper from "@/components/AuthenticationWrapper";
import "./globals.css";

export const metadata = {
	title: "Connecting Gnosis Safe",
	description:
		"Connecting Gnosis Safe to a NextJS 13 app, handle signatures, and handle transactions",
	viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<main className="grow flex flex-col">
					<AuthenticationWrapper>
						<div className="flex flex-col grow basis-0 min-h-0">{children}</div>
					</AuthenticationWrapper>
				</main>
			</body>
		</html>
	);
}
