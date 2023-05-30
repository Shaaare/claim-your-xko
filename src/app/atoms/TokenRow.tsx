interface Props {
	first?: boolean
	title: string
	hint?: string
	amount: number
	percent?: number
}

export function TokenRow({ title, hint, amount, percent, first }: Props) {
	return (
		<>
			<div
				className={`flex lg:flex-row lg:justify-between flex-col justify-center items-center ${
					first ? "" : "mt-4"
				}`}
			>
				<p className="text-sm md:text-base">
					{title} <span className="text-dark-grey">{hint}</span>:
				</p>
				<p className="text-base">
					<span className="font-semibold">{amount}</span> XKO
					<span className="text-dark-grey text-sm">
						{" "}
						({percent}%)
					</span>
				</p>
			</div>
		</>
	)
}
