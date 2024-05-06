import "@fortawesome/fontawesome-svg-core/styles.css"
import "./globals.css"

import { config } from "@fortawesome/fontawesome-svg-core"
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
config.autoAddCss = false

export const metadata = {
	title: "Claim Your XKO | Smartness SAS",
	description: "Claim your XKO tokens from your vesting contract.",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const currentYear = new Date().getFullYear()
	return (
		<html lang="en">
			<body>
				<main className="min-h-screen max-w-screen container bg-white mx-auto relative">
					<section className="min-h-screen flex flex-col">
						<div className="h-full flex grow flex-col justify-center items-center">
							{children}
						</div>

						<footer className="mt-auto flex justify-center items-center pb-6 flex-col md:flex-row">
							<p className="text-grey text-sm"><a href="https://shaaa.re" target="_blank">Shaaare: Be the King of Brand Content!</a></p>
							<span className="mx-2 hidden md:flex text-grey text-sm">|</span>
							<p className="text-grey text-sm"><a href="https://smartness.co" target="_blank">Smartness SAS © {currentYear}</a></p>
						</footer>
					</section>
				</main>
			</body>
		</html>
	)
}
