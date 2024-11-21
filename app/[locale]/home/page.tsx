"use client"
import { FC } from "react";
import { Button } from "@nextui-org/react";
import { ethAbi } from "@/abi/ethAbi"
import useTransaction from "@/hooks/web3/useTransation";

const Home: FC = () => {

  const { handleTrade } = useTransaction(ethAbi)

  return (
    <div>
      <h1>Welcome to Web3 CLI</h1>

      <Button onClick={() => handleTrade(1, 100)}>合约测试</Button>
    </div>
  )
}

export default Home;