import { useAccount, useBalance } from 'wagmi'
import { formatUnits, parseUnits } from "viem"

const Wallet = () => {
    const { address } = useAccount();
    const { data, error } = useBalance({ address })
    const { data: rccTokenData } = useBalance({ address, token: '0x6FCE5Dd421c88B7df4552E037362Bcea35Ae0AcB' })
    return (
        <div>
            <div>address: { address }</div>
            {
                data && <div>ETH Balance: {data?.formatted} ------- formatted{formatUnits(data?.value, 18)}</div>
            }
            <div>RCCBalance: {rccTokenData?.formatted}</div>
        </div>
    )
}

export default Wallet;