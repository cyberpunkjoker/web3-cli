"use client";

import { FC } from "react";
import {
  useConnect,
  useDisconnect,
  useSignMessage,
  useAccount,
  useBalance,
  useSwitchChain
} from 'wagmi';
import { metaMask } from 'wagmi/connectors';
import { Button } from "@nextui-org/react";
import { WagmiConnectionStatus } from "@/enums/web3";
import { toHideAddress } from "@/utils/common";
import { useSelector, useDispatch } from 'react-redux'

const LoginButton: FC = () => {
  const { connectAsync, status } = useConnect()
  const { disconnect } = useDisconnect()
  const { signMessageAsync } = useSignMessage()
  const { switchChain } = useSwitchChain()

  const account = useAccount()
  const BalanceRes = useBalance({
    address: account?.address,
  })


  const openWallet = async () => {
    if (status === WagmiConnectionStatus.success) return
    await connectAsync({ connector: metaMask() })
    await signMessageAsync({
      message: 'this is a test message to sign with your wallet'
    })
  }

  const notLoggedIn = () => {
    return (
      <Button onClick={openWallet}>
        connect wallet
      </Button>
    )
  }

  const loggedIn = () => {
    return (
      <div>
        {/* 登录基本信息 */}
        {toHideAddress(account.address)}
        <div>余额: {BalanceRes.data?.symbol} {BalanceRes.data?.formatted}</div>

        <Button onClick={() => switchChain({ chainId: 11155111 })}>切换到以太主测试网 sepolia</Button>

        <Button onClick={() => disconnect()}>
          disconnect wallet
        </Button>
      </div>
    )
  }

  const renderInfo = () => {
    switch (status) {
      case WagmiConnectionStatus.success:
        return loggedIn()

      case WagmiConnectionStatus.error:
      case WagmiConnectionStatus.idle:
        return notLoggedIn()
    }
  }

  return (
    <div>
      {renderInfo()}
    </div>
  )
}

export default LoginButton;