"use client";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import {
	GetSiweMessageOptions,
	RainbowKitSiweNextAuthProvider,
} from "@rainbow-me/rainbowkit-siwe-next-auth";
import "@rainbow-me/rainbowkit/styles.css";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider, webSocketProvider } = configureChains([goerli], [publicProvider()]);

const { connectors } = getDefaultWallets({
	appName: "My App for connecting Gnosis Safe",
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
	statement: "Sign in to test your Safe connection!",
});

export default function AuthenticationWrapper({ children }: { children: ReactNode }) {
	return (
		<WagmiConfig client={wagmiClient}>
			<SessionProvider>
				<RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}>
					<RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
				</RainbowKitSiweNextAuthProvider>
			</SessionProvider>
		</WagmiConfig>
	);
}
