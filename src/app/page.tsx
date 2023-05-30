"use client"

import { Claim, Connect } from "@/components"
import { ethers } from "ethers"
import { useEffect, useState } from "react"

export default function Home() {
	const [provider, setProvider] =
		useState<ethers.providers.Web3Provider | null>(
			window.ethereum
				? new ethers.providers.Web3Provider(window.ethereum)
				: null
		)
	const [connected, setConnected] = useState<boolean>(false)
	const [address, setAddress] = useState<string>("")

	useEffect(() => {
		window.ethereum.on("chainChanged", function (chainId: string) {
			window.location.reload()
		})

		window.ethereum.on("accountsChanged", function (accounts: string[]) {
			if (accounts[0] !== address) {
				window.location.reload()
			}
		})

		return () => {
			window.ethereum.removeAllListeners()
		}
	}, [address])

	const handleConnected = (address: string) => {
		setConnected(true)
		setAddress(address)
	}

	return connected ? (
		<Claim provider={provider} address={address} />
	) : (
		<Connect provider={provider} handleConnected={handleConnected} />
	)
}
