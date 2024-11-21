// 1. 判断是否连接到钱包
// 2. 连接到钱包
// 3. 判断当前网络是否为合约网络
// 4. 切换并添加网络
// 5. 发送交易
import { useEffect } from 'react';
import {
  useConnect,
  useDisconnect,
  useSignMessage,
  useChainId,
  useAccount,
  useBalance,
  useSwitchChain,
  useWriteContract,

} from 'wagmi';
import { WagmiConnectionStatus } from "@/enums/web3";
import { metaMask } from 'wagmi/connectors';
import useCalcGasPrice from './useCalcGasPrice';

interface TransactionProps {
  to: string;
  value: number;
  currentChainId: number;
  abi: any[];
}

const useTransaction = (abi: any) => {
  const { address } = useAccount()
  const { connectAsync, status } = useConnect();
  const { signMessageAsync } = useSignMessage()
  const { switchChain } = useSwitchChain()
  const { writeContractAsync } = useWriteContract()
  const BalanceRes = useBalance({
    address: address,
  })
  const { price: gasPrice } = useCalcGasPrice()

  const chainId = useChainId()

  const handleTrade = async (targetChainId: number, value: number) => {
    if (status !== WagmiConnectionStatus.success) {
      await connectAsync({ connector: metaMask() });
      await signMessageAsync({
        message: 'this is a test message to sign with your wallet'
      })
    }

    if (chainId !== targetChainId) {
      switchChain({ chainId: targetChainId })
    }

    if (!address) return

    // 获取当前 账号货币
    if (Number(BalanceRes.data?.formatted) < (gasPrice + value || 0)) {
      alert('余额不足')
      return
    }

    try {
      const res = await writeContractAsync({
        abi,
        address: '0x6b175474e89094c44da98b954eedeac495271d0f',
        functionName: 'approve',
        args: [
          address,
          111111111111222222
        ],
      })

      console.log('sssss', res);

    } catch (error) {
      console.log('yahahahah', error);

    }


  }

  return { handleTrade }
}

export default useTransaction;