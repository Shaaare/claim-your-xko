import { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
	className?: string
	disabled?: boolean
	onClick: () => void
}

export const ButtonWithGradient = ({
	children,
	className,
	disabled,
	onClick,
}: Props) => {
	return (
		<button
			disabled={disabled}
			className={`bg-gradient-to-r from-danger to-primary h-9 px-4 rounded-full text-white text-sm flex flex-row items-center ${className}`}
			onClick={onClick}
		>
			{children}
		</button>
	)
}
