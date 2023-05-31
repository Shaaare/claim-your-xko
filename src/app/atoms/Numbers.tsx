import dynamic from "next/dynamic"
const AnimatedNumbersProvider = dynamic(
	() => import("react-animated-numbers"),
	{
		ssr: false,
	}
)

interface Props {
	animateToNumber: number
}

export const Numbers = ({ animateToNumber }: Props) => {
	return (
		<AnimatedNumbersProvider
			includeComma
			animateToNumber={animateToNumber}
			configs={[{ mass: 1, tension: 220, friction: 100 }]}
			fontStyle={{ fontWeight: "bold" }}
		/>
	)
}
