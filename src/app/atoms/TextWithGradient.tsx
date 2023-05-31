interface Props {
	content: string
	className?: string
}

export const TextWithGradient = ({ content, className }: Props) => {
	return (
		<p
			id="text-with-gradient"
			className={`bg-clip-text bg-gradient-to-r from-danger to-primary ${className}`}
		>
			{content}
		</p>
	)
}
