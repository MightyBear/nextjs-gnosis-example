import { ethers } from "ethers";
import { goerli } from "@wagmi/chains";

export const PROVIDER = new ethers.providers.AlchemyProvider(
	goerli.id,
	process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
);
