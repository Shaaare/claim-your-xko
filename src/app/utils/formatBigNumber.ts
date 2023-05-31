import { BigNumber } from "ethers"
import { formatEther } from "ethers/lib/utils"

export function formatBigNumber(value: BigNumber): string {
	return Math.floor(parseFloat(formatEther(value))).toLocaleString()
}
