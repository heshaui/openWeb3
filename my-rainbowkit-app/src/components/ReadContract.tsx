import { useReadContract, useAccount } from 'wagmi';
import { ERC20Abi } from '../abi';
import { formatEther } from 'viem';

const ReadContract = () => {
    // 单个读取合约
    const addressWETH = '0x7b79995e5f793a07bc00c21412e50ecae098e7f9'
    const { address } = useAccount();
    const { data, isLoading, isError } = useReadContract({
        address: addressWETH,
        abi: ERC20Abi,
        functionName: 'balanceOf',
        args: [address]
    });

    // 批量读取合约
    return (
        <div>
            <h3>📦 Token Balance</h3>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error fetching balance</p>}
            {data && <p>{formatEther(data)} wei</p>}
        </div>
    )
}

export default ReadContract;