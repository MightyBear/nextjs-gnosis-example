import { ethers } from "ethers";
import { PROVIDER } from "./provider";
import { goerli } from "wagmi";
import { getSignMessageLibDeployment } from "@safe-global/safe-deployments";

export default async function verifyGnosisSignature(walletAddress: string, message: string) {
	// check if exists on network first
	const byteCode = await PROVIDER.getCode(walletAddress);
	if (!byteCode || ethers.utils.hexStripZeros(byteCode) == "0x") {
		return false;
	}

	const gnosisSafeDeployment = getSignMessageLibDeployment({
		network: goerli.id.toString(),
	});

	if (!gnosisSafeDeployment) {
		return false;
	}

	const gnosisSafeContract = new ethers.Contract(
		walletAddress,
		gnosisSafeDeployment?.abi,
		PROVIDER
	);

	const messageHash = ethers.utils.hashMessage(message);
	// this is the message hash that would be emitted in the event SignMsg
	const gnosisMessageHash = await gnosisSafeContract.getMessageHash(messageHash);

	let timeout: NodeJS.Timeout;
	const waitForSignedEvent = new Promise<boolean>((resolve, reject) => {
		const onMultiSigSigned = () => {
			clearTimeout(timeout);
			resolve(true);
		};
		timeout = setTimeout(() => {
			gnosisSafeContract.removeListener("SignMsg", onMultiSigSigned);
			reject(false);
		}, 60000); // 60 seconds

		gnosisSafeContract.on("SignMsg", async msgHash => {
			if (msgHash == gnosisMessageHash) {
				onMultiSigSigned();
			}
		});
	});

	waitForSignedEvent
		.then(async value => {
			if (value) {
				return value;
			}
			return false;
		})
		.catch(err => {
			console.error(err);
			return false;
		});
	return await waitForSignedEvent;
}
