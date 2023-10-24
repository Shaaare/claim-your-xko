import { ButtonWithGradient } from "@/app/atoms"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ethers } from "ethers"
import { useState } from "react"

interface Props {
	provider: ethers.providers.Web3Provider | null
	handleConnected: (address: string) => void
}

type VestingContract = {
	wallet: string
	amount: number
	start: number
	duration: number
	contractAddress: string
}

const contracts: VestingContract[] = require("../assets/json/vesting-contracts.json")

export function Connect({ provider, handleConnected }: Props) {
	const [unknownAddress, setUnknownAddress] = useState<boolean>(false)
	const [maticRpcAdded, setMaticRpcAdded] = useState<boolean>(false)
	const [xkoTokenAdded, setXkoTokenAdded] = useState<boolean>(false)

	const handleConnect = async () => {
		if (!provider) return alert("Please install Metamask extension!")

		const { chainId } = await provider.getNetwork()

		if (chainId !== 137) throw new Error("Wrong network")

		provider
			.send("eth_requestAccounts", [])
			.then(async (accounts: string[]) => {
				if (accounts.length) {
					const contract = contracts.find(
						(contract) =>
							contract.wallet.toLowerCase() ===
							accounts[0].toLowerCase()
					)

					if (!contract) return setUnknownAddress(true)

					handleConnected(accounts[0])
				}
			})
	}

	const handleAddMaticRpc = async () => {
		if (!provider) return alert("Please install Metamask extension!")

		provider
			.send("wallet_addEthereumChain", [
				{
					chainId: "0x89",
					chainName: "Polygon Mainnet",
					nativeCurrency: {
						name: "MATIC",
						symbol: "MATIC",
						decimals: 18,
					},
					rpcUrls: ["https://polygon.llamarpc.com"],
					blockExplorerUrls: ["https://polygonscan.com/"],
				},
			])
			.then((result) => {
				setMaticRpcAdded(true)
			})
			.catch((error: any) => {
				console.error(error)
			})
	}

	const handleAddXkoToken = async () => {
		if (!provider) return alert("Please install Metamask extension!")
		window.ethereum
			.request({
				method: "wallet_watchAsset",
				params: {
					type: "ERC20",
					options: {
						address: "0x4FBaDBC05C4680e7756165D73194Ae373E18e15f",
						symbol: "XKO",
						decimals: 18,
					},
				},
			})
			.then(() => {
				setXkoTokenAdded(true)
			})
			.catch((error: any) => {
				console.error(error)
			})
	}

	const handleInstallMetaMask = () => {
		window.open("https://metamask.io/download/", "_blank")
	}

	return (
		<>
			<h1 className="text-5xl md:text-7xl mx-auto text-center mt-8">
				{/*  */}
				You'd like to{" "}
				<span className="md:none">
					<br></br>
				</span>{" "}
				<span className="text-danger">tip</span> more?
			</h1>
			<p className="text-dark-grey text-center mt-8 w-9/12">
				Your friends deserve more XKOs.<br></br>Tip them today thanks to
				your early investment!
			</p>
			<div className="mt-10 mx-auto">
				{unknownAddress ? (
					<p className="text-danger text-center">
						Your address is not associated with any vesting
						contract.
					</p>
				) : null}
				<div className="flex md:flex-row flex-col justify-center items-center">
					<ButtonWithGradient
						onClick={handleInstallMetaMask}
						className="mt-4"
					>
						1. Install MetaMask extension
					</ButtonWithGradient>
					<ButtonWithGradient
						disabled={maticRpcAdded}
						className={`mt-4 flex-row items-center md:mx-4`}
						onClick={handleAddMaticRpc}
					>
						{maticRpcAdded ? (
							<FontAwesomeIcon
								icon={faCheck}
								color="#4EF500"
								className="mr-1"
							/>
						) : null}
						2. Add Polygon RPC
					</ButtonWithGradient>
					<ButtonWithGradient
						disabled={xkoTokenAdded}
						className={`flex-row items-center mt-4`}
						onClick={handleAddXkoToken}
					>
						{xkoTokenAdded ? (
							<FontAwesomeIcon
								icon={faCheck}
								color="#4EF500"
								className="mr-1"
							/>
						) : null}
						3. Add XKO token
					</ButtonWithGradient>
					<ButtonWithGradient
						className={`md:ml-4 mt-4`}
						onClick={handleConnect}
					>
						4. Connect my wallet
					</ButtonWithGradient>
				</div>
			</div>

			<p className="text-dark-grey text-xs w-9/12 md:w-4/12 text-center mt-4 mb-8">
				Please set your network to Polygon Mainnet.
				<br></br><br></br>
				Your investment is private for safety reasons, please connect your wallet to access your personal investor dashboard.
			</p>
		</>
	)
}
