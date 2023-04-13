"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSession } from "next-auth/react";
import { useAccount } from "wagmi";

export default function ConnectWallet() {
	const { address } = useAccount();
	const { status } = useSession();
	return (
		<>
			<div className="text-lg justify-center mx-auto">
				<ConnectButton />
			</div>
			<div className="grow justify-center">
				{address !== undefined && (
					<div className="w-full text-center">
						{address !== undefined && <>Connected address: {address}</>}
					</div>
				)}
				{status !== undefined && <div className="w-full text-center">{status}</div>}
			</div>
		</>
	);
}
