import { useSwitchChain, useAccount } from 'wagmi'

function SwitchChain() {
const { chain, chainId, isConnected } = useAccount()
  const { chains, switchChain } = useSwitchChain()

  return (
    <div>
        <div>Current ChainId: {chainId}</div>
        <div>Current Chain name: {chain?.name}</div>
      {chains.map((chain) => (
        <button key={chain.id} onClick={() => switchChain({ chainId: chain.id })}>
          {chain.name}
        </button>
      ))}
    </div>
  )
}

export default SwitchChain;