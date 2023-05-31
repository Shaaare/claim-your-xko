import { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { TextWithGradient } from "./TextWithGradient"

interface Props {
	emoji: string
	content: string
	icon?: IconDefinition
	onClick?: () => void
}

export const OutlinedButton = ({ emoji, content, icon, onClick }: Props) => {
	return (
		<button
			id="outlined-button"
			disabled={!onClick}
			onClick={onClick}
			className="rounded-full bg-gradient-to-r from-danger to-primary mx-auto"
		>
			<div className="flex items-center justify-center bg-white rounded-full px-4 py-2">
				<p>{emoji}</p>
				&nbsp;
				<TextWithGradient
					className="text-sm md:text-base"
					content={content}
				/>
				&nbsp;
				{icon ? <FontAwesomeIcon icon={icon} color="#AA00FF" /> : null}
			</div>
		</button>
	)
}
