import { BigNumber } from "ethers"
import { formatEther } from "ethers/lib/utils"
import { memo } from "react"
import { formatBigNumber } from "../utils"
import { Numbers } from "./Numbers"

interface Props {
	first?: boolean
	animated?: boolean
	title: string
	hint?: string
	amount: BigNumber
	percent?: string
}

function TokenRowToMemo({
	title,
	hint,
	animated,
	amount,
	percent,
	first,
}: Props) {
	return (
		<>
			<div
				className={`flex lg:flex-row lg:justify-between flex-col justify-center items-center ${
					first ? "" : "mt-4"
				}`}
			>
				<p className="text-sm md:text-base">
					{title}
					<span className="text-dark-grey">{hint}</span>:
				</p>
				{animated ? (
					<div className="flex items-center">
						<Numbers
							animateToNumber={Math.floor(
								parseFloat(formatEther(amount))
							)}
						/>
						&nbsp;XKO
						{percent ? (
							<span className="text-dark-grey text-sm">
								&nbsp;({percent}%)
							</span>
						) : null}
					</div>
				) : (
					<p className="text-base flex items-center">
						<span className="font-semibold">
							{formatBigNumber(amount)}
						</span>
						&nbsp;XKO
						{percent ? (
							<span className="text-dark-grey text-sm">
								&nbsp;({percent}%)
							</span>
						) : null}
					</p>
				)}
			</div>
		</>
	)
}

export const TokenRow = memo(TokenRowToMemo)
