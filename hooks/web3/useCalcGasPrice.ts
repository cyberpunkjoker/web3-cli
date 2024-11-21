import {
  useEstimateGas,
} from "wagmi"

const useCalcGasPrice = () => {
  const { data: gasEstimate } = useEstimateGas()

  let price = 0

  if (gasEstimate) {
    price = Number(gasEstimate) / 10 ** 18;
  }

  return {
    price: price
  }

}

export default useCalcGasPrice