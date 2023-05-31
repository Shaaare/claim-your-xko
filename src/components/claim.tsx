import {
	ClaimButton,
	OutlinedButton,
	TextWithGradient,
	TokenRow,
} from "@/app/atoms"
import {
	faArrowUpRightFromSquare,
	faClock,
	faWallet,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { BigNumber, Contract, ethers } from "ethers"
import { formatEther } from "ethers/lib/utils"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

type VestingContract = {
	wallet: string
	amount: number
	start: number
	duration: number
	contractAddress: string
}

type VestingContractData = {
	total: BigNumber
	claimed: BigNumber
	locked: BigNumber
	releasable: BigNumber
}

interface Props {
	provider: ethers.providers.Web3Provider
	address: string
}

const TOKEN_ADDRESS: string = "0x4FBaDBC05C4680e7756165D73194Ae373E18e15f"
const contracts: VestingContract[] = require("../assets/json/vesting-contracts.json")
const abi = require("../assets/json/vesting-abi.json").abi

export function Claim({ provider, address }: Props) {
	const fetchInterval = useRef<any>(null)
	const [vesting, setVesting] = useState<any>(null)
	const [end, setEnd] = useState<number>(0)
	const [amounts, setAmounts] = useState<VestingContractData>({
		total: BigNumber.from(0),
		claimed: BigNumber.from(0),
		locked: BigNumber.from(0),
		releasable: BigNumber.from(0),
	})
	const [hash, setHash] = useState<string>("")
	const [claiming, setClaiming] = useState<boolean>(false)

	const formattedEnd = useMemo(() => {
		return new Date(end * 1000).toLocaleString("en-US", {
			day: "numeric",
			month: "long",
			year: "numeric",
		})
	}, [end])

	const remainingDays = useMemo(() => {
		return Math.ceil(
			(new Date(end * 1000).getTime() - new Date().getTime()) /
				(1000 * 3600 * 24)
		)
	}, [end])

	const getPercentOfTotal = (amount: BigNumber) => {
		const total = Math.floor(parseFloat(formatEther(amounts.total)))
		const value = Math.floor(parseFloat(formatEther(amount)))
		const percent = (value / total) * 100
		return isNaN(percent) ? "0" : percent.toFixed(2)
	}

	const handleGetVesting = async () => {
		try {
			await provider.send("eth_requestAccounts", [])

			const signer = provider.getSigner()
			const contract = contracts.find(
				({ wallet }) => wallet.toLowerCase() === address.toLowerCase()
			)

			if (!contract) throw new Error("No contract found for this address")

			const vesting = new Contract(contract.contractAddress, abi, signer)
			const vestingStart = await vesting.start()
			const vestingDuration = await vesting.duration()
			const vestingEnd = vestingStart.add(vestingDuration)
			setEnd(vestingEnd.toNumber())
			setVesting(vesting)
		} catch (error) {
			console.error(error)
		}
	}

	const handleGetVestingData = useCallback(async () => {
		try {
			const [vestedAmount, releasable, released] = await Promise.all([
				vesting["vestedAmount(address,uint64)"](TOKEN_ADDRESS, end),
				vesting["releasable(address)"](TOKEN_ADDRESS),
				vesting["released(address)"](TOKEN_ADDRESS),
			])
			setAmounts({
				total: vestedAmount,
				claimed: released,
				locked: vestedAmount.sub(released),
				releasable,
			})
		} catch (error) {
			console.error(error)
		}
	}, [vesting, end])

	const handleClaim = async () => {
		try {
			setClaiming(true)
			clearInterval(fetchInterval.current)
			const tx = await vesting["release(address)"](TOKEN_ADDRESS)
			const { transactionHash } = await tx.wait()
			setHash(transactionHash)
			handleGetVestingData()
			handleLaunchFetchInterval()
		} catch (error) {
			console.error(error)
		} finally {
			setClaiming(false)
		}
	}

	const handleExploreTransaction = () => {
		window.open(`https://polygonscan.com/tx/${hash}`)
	}

	const handleLaunchFetchInterval = useCallback(() => {
		fetchInterval.current = setInterval(() => {
			handleGetVestingData()
		}, 30000)
	}, [handleGetVestingData])

	useEffect(() => {
		if (vesting) {
			handleGetVestingData()
			handleLaunchFetchInterval()
		}
	}, [vesting, handleGetVestingData, handleLaunchFetchInterval])

	useEffect(() => {
		return () => {
			clearInterval(fetchInterval.current)
		}
	}, [])

	if (!vesting) {
		handleGetVesting()
	}

	return (
		<>
			<div className="absolute mx-auto top-10 shadow shadow-primary/20 px-4 py-2 rounded-xl flex-row items-center justify-center hidden md:flex">
				<FontAwesomeIcon icon={faWallet} color={"#AA00FF"} />
				<p className="ml-3 text-primary">{address}</p>
			</div>
			<TextWithGradient
				content="Open, Sesame"
				className="text-5xl md:text-7xl mx-auto text-center"
			/>
			<div className="w-10/12 md:w-6/12 flex flex-col mt-10">
				<p className="ml-auto text-grey text-xs mb-1.5">
					<FontAwesomeIcon
						icon={faClock}
						color="#B5AEB8"
						className="mr-1"
					/>
					{formattedEnd}
				</p>
				<div className="w-full  h-4 bg-info-light rounded-full relative">
					<div className="h-full w-full overflow-hidden">
						<div
							style={{
								width: `${getPercentOfTotal(amounts.claimed)}%`,
							}}
							className="h-full bg-gradient-to-r from-danger to-primary rounded-full"
						></div>
					</div>
					<div
						style={{
							width: `${getPercentOfTotal(amounts.claimed)}%`,
						}}
						className="h-full flex relative"
					>
						<p className="text-black absolute right-[-12px] text-xs mt-2">
							{getPercentOfTotal(amounts.claimed)}%
						</p>
					</div>
				</div>
				<div className="mt-12 shadow-lg shadow-danger/20 rounded-3xl md:p-8 p-4 lg:w-10/12 md:w-full w-full mx-auto flex flex-col">
					{hash ? (
						<OutlinedButton
							emoji="🎉 "
							content="Your XKO have been claimed"
							icon={faArrowUpRightFromSquare}
							onClick={handleExploreTransaction}
						/>
					) : null}
					<TokenRow
						first={!hash}
						title="Total"
						amount={amounts.total}
					/>
					<TokenRow
						title="Already claimed"
						amount={amounts.claimed}
						percent={getPercentOfTotal(amounts.claimed)}
					/>
					<TokenRow
						title="Locked"
						hint={`(${remainingDays.toLocaleString()} day${
							remainingDays > 1 ? "s" : ""
						} remaining)`}
						amount={amounts.locked}
						percent={getPercentOfTotal(amounts.locked)}
					/>
					<TokenRow
						title="🎉 You are now able to claim"
						amount={amounts.releasable}
						percent={getPercentOfTotal(amounts.releasable)}
						animated
					/>
				</div>
				{amounts.total && amounts.total === amounts.claimed ? (
					<OutlinedButton
						emoji="🎉"
						content="You have claimed all your XKO"
					/>
				) : (
					<>
						<ClaimButton
							loading={claiming}
							releasable={amounts.releasable}
							onClick={handleClaim}
						/>
						<p className="mx-auto text-xs text-grey mt-2">
							Refreshed every 30 sec.
						</p>
					</>
				)}
			</div>
		</>
	)
}
