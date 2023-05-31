import { BigNumber } from "ethers"
import { formatBigNumber } from "../utils"

interface Props {
	loading: boolean
	releasable: BigNumber
	onClick: () => void
}

export const ClaimButton = ({ loading, releasable, onClick }: Props) => {
	return (
		<button
			className="mt-12 bg-gradient-to-r from-danger to-primary text-white rounded-full py-2 px-4 lg:w-6/12 md:6/12 mx-auto justify-center items-center flex"
			onClick={onClick}
			disabled={loading}
		>
			{loading ? (
				<svg
					className="animate-spin"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					height={16}
					width={16}
					fill="#fff"
				>
					<path d="M457 372c11.5 6.6 26.3 2.7 31.8-9.3C503.7 330.2 512 294.1 512 256C512 122.7 410.1 13.2 280 1.1C266.8-.1 256 10.7 256 24v0c0 13.3 10.8 23.9 24 25.4C383.5 61.2 464 149.2 464 256c0 29.3-6.1 57.3-17 82.6c-5.3 12.2-1.5 26.8 10 33.5v0z" />
				</svg>
			) : (
				`🎉 Claim my ${formatBigNumber(releasable)} XKO`
			)}
		</button>
	)
}
