import ConnectWallet from "@/components/ConnectWallet";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
	return (
		<div className="flex flex-col justify-center h-full">
			<div className="w-full text-center text-xl">
				Connect your Gnosis Safe using Rainbowkit!
			</div>
			<ConnectWallet />
		</div>
	);
}
