import { ethers } from "ethers"

interface Props {
	provider: ethers.providers.Web3Provider | null
	handleConnected: (address: string) => void
}

export function Connect({ provider, handleConnected }: Props) {
	const handleConnect = async () => {
		if (!provider) return alert("Please install Metamask extension!")

		const { chainId } = await provider.getNetwork()

		if (chainId !== 137) throw new Error("Wrong network")

		provider
			.send("eth_requestAccounts", [])
			.then(async (accounts: string[]) => {
				if (accounts.length) {
					handleConnected(accounts[0])
				}
			})
	}

	return (
		<>
			<h1 className="text-5xl md:text-7xl mx-auto text-center">
				You'd like to{" "}
				<span className="md:none">
					<br></br>
				</span>{" "}
				<span className="text-danger">tip</span> more ?
			</h1>
			<p className="text-dark-grey text-center mt-8 w-9/12">
				Your friends deserve more XKOs.<br></br>Tip them today thanks to
				your early investment!
			</p>
			<button
				className="mt-10 bg-gradient-to-r from-danger to-primary h-9 px-4 rounded-full text-white text-sm"
				onClick={handleConnect}
			>
				Connect my wallet
			</button>
			<p className="text-dark-grey text-xs w-9/12 md:w-4/12 text-center mt-4">
				Your investment is private for safety reasons, Please connect
				your wallet to access your personal investor dashboard.
			</p>
		</>
	)
}
