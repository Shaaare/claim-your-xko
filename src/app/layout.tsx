import "@fortawesome/fontawesome-svg-core/styles.css"
import { Inter } from "next/font/google"
import "./globals.css"

import { config } from "@fortawesome/fontawesome-svg-core"
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
config.autoAddCss = false

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
	title: "Claim Your XKO | Smartness SAS",
	description:
		"Claim your XKO tokens from your Smartness SAS vesting contract.",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const currentYear = new Date().getFullYear()
	return (
		<html lang="en">
			<body className={inter.className}>
				<main className="min-h-screen max-w-screen container bg-white mx-auto relative">
					<section className="min-h-screen flex flex-col">
						<div className="h-full flex grow flex-col justify-center items-center">
							{children}
						</div>

						<footer className="mt-auto flex justify-center items-center pb-6 flex-col md:flex-row">
							<button className="h-9 flex justify-center items-center rounded-full">
								<FontAwesomeIcon
									icon={faInfoCircle}
									color={"#008BFF"}
									className="mr-1 h-5 w-5"
								/>
								<p className="text-info text-sm font-semibold">
									Help
								</p>
							</button>
							<span className="mx-2 hidden md:flex text-grey text-sm">
								|
							</span>
							<p className="text-grey text-sm">
								{currentYear} Smartness SAS - kopain ©
							</p>
						</footer>
					</section>
				</main>
			</body>
		</html>
	)
}
