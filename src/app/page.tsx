"use client"

import { Claim, Connect } from "@/components"
import { ethers } from "ethers"
import { useEffect, useState } from "react"

export default function Home() {
	const [provider, setProvider] =
		useState<ethers.providers.Web3Provider | null>(null)
	const [connected, setConnected] = useState<boolean>(false)
	const [address, setAddress] = useState<string>("")

	useEffect(() => {
		if (window.ethereum) {
			window.ethereum.on("chainChanged", function (chainId: string) {
				window.location.reload()
			})

			window.ethereum.on(
				"accountsChanged",
				function (accounts: string[]) {
					if (address && accounts[0] !== address) {
						window.location.reload()
					}
				}
			)

			return () => {
				window.ethereum.removeAllListeners()
			}
		}
	}, [address])

	useEffect(() => {
		if (window.ethereum) {
			const provider = new ethers.providers.Web3Provider(window.ethereum)
			setProvider(provider)
		}
	}, [])

	const handleConnected = (address: string) => {
		setConnected(true)
		setAddress(address)
	}

	return connected && provider ? (
		<Claim provider={provider} address={address} />
	) : (
		<Connect provider={provider} handleConnected={handleConnected} />
	)
}
