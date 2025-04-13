import { useReadContracts, useAccount } from 'wagmi';
import { ERC20Abi } from '../abi';
import { formatEther } from 'viem';
import { sepolia } from 'wagmi/chains'

type Token = {
    symbol: string;
    address: `0x${string}`;
  };
  

const ReadContract = () => {
    const { address } = useAccount();
    const tokenAddresses: Token[] = [
        {
        symbol: 'DAI',
        address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
        },
        {
        symbol: 'USDC',
        address: '0x65aFADD39029741B3b8f0756952C74678c9cEC93',
        },
        {
        symbol: 'LINK',
        address: '0x779877A7B0D9E8603169DdbD7836e478b4624789',
        },
    ]

    const { data, isPending, error } = useReadContracts({
            contracts: tokenAddresses.map((token) => ({
                address: token.address,
                abi: ERC20Abi,
                functionName: 'balanceOf',
                args: [address],
                chainId: sepolia.id, // ✅ 指定测试网
            }))
    });
    
      if (isPending) return <div>Loading...</div>;
      if (error) return <div>读取失败：{error.message}</div>;
      return (
        <div>
          <h3>Token Balances</h3>
          <ul>
            {tokenAddresses.map((token, idx) => {
              const item = data?.[idx];
              return (
                <li key={token.symbol}>
                  {token.symbol}:{' '}
                  {item?.status === 'success'
                    ? formatEther(item.result)
                    : '读取失败'}
                </li>
              );
            })}
          </ul>
        </div>
      );
}

export default ReadContract;