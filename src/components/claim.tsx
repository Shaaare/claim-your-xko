import { TokenRow } from "@/app/atoms"
import { faClock, faWallet } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Contract, ethers } from "ethers"
import { useState } from "react"

interface Props {
	provider: ethers.providers.Web3Provider
	address: string
}

const TOKEN_ADDRESS: string = "0x4FBaDBC05C4680e7756165D73194Ae373E18e15f"

export function Claim({ provider, address }: Props) {
	const [vesting, setVesting] = useState<any>(null)

	const handleGetVesting = async () => {
		try {
			await provider.send("eth_requestAccounts", [])

			const signer = provider.getSigner()

			// Initilise the contract
			const vesting = new Contract(
				address,
				require("../assets/json/vesting-abi.json").abi,
				signer
			)

			const vestingBeneficiary = await vesting.beneficiary()
			const vestingStart = await vesting.start()
			const vestingDuration = await vesting.duration()
			const vestingEnd = vestingStart.add(vestingDuration)
			const vestingTotalVestingAmount = await vesting[
				"vestedAmount(address,uint64)"
			](address, vestingEnd)
			const vestingReleasable = await vesting["releasable(address)"](
				address
			)
			const vestingReleased = await vesting["released(address)"](address)

			console.log(
				vestingEnd,
				vestingTotalVestingAmount,
				vestingReleasable,
				vestingReleased
			)
		} catch (error) {
			console.error(error)
		}
	}

	if (!vesting) {
		handleGetVesting()
	}

	return (
		<>
			<div className="absolute mx-auto top-10 shadow shadow-primary/20 px-4 py-2 rounded-xl flex-row items-center justify-center hidden md:flex">
				<FontAwesomeIcon icon={faWallet} color={"#AA00FF"} />
				<p className="ml-3 text-primary">{address}</p>
			</div>
			<h1
				id="connected-title"
				className="text-5xl md:text-7xl mx-auto text-center bg-clip-text bg-gradient-to-r from-danger to-primary"
			>
				Open, Sesame!
			</h1>
			<div className="w-10/12 md:w-6/12 flex flex-col mt-10">
				<p className="ml-auto text-grey text-xs mb-1.5">
					<FontAwesomeIcon
						icon={faClock}
						color="#B5AEB8"
						className="mr-1"
					/>
					Sep 2, 2024
				</p>
				<div className="w-full  h-4 bg-info-light rounded-full relative">
					<div className="h-full w-full overflow-hidden">
						<div className="w-1/2 h-full bg-gradient-to-r from-danger to-primary rounded-full"></div>
					</div>
					<div className="w-1/2 h-full flex relative">
						<p className="text-black absolute right-[-12px] text-xs mt-2">
							30%
						</p>
					</div>
				</div>
				<div className="mt-12 shadow-lg shadow-danger/20 rounded-3xl md:p-8 p-4 lg:w-10/12 md:w-full w-full mx-auto">
					<TokenRow first title="Total" amount="10 000 000" />
					<TokenRow
						title="Already claimed"
						amount="1 000 000"
						percent={10}
					/>
					<TokenRow
						title="Locked"
						hint="(71 days remaining)"
						amount="7 000 000"
						percent={70}
					/>
					<TokenRow
						title="🎉 You are now able to claim"
						amount="2 000 000"
						percent={10}
					/>
				</div>
				<button className="mt-12 bg-gradient-to-r from-danger to-primary text-white rounded-full py-2 px-4 lg:w-6/12 md:6/12  mx-auto">
					🎉 Claim my 2 000 000 XKO
				</button>
			</div>
		</>
	)
}
