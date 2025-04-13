import { useSwitchChain, useAccount } from 'wagmi'
import styles from '../styles/SwitchChains.module.css'

function SwitchChain() {
  const { chain, chainId, isConnected } = useAccount()
  const { chains, switchChain } = useSwitchChain()

  if (!isConnected) return null;

  return (
    <div className={styles.container}>
      <div className={styles.currentChain}>
        <h3>当前网络</h3>
        <div className={styles.chainInfo}>
          <span>Chain ID: {chainId}</span>
          <span>网络名称: {chain?.name}</span>
        </div>
      </div>
      <div className={styles.chainList}>
        <h3>可用网络</h3>
        <div className={styles.buttonGroup}>
          {chains.map((chain) => (
            <button
              key={chain.id}
              onClick={() => switchChain({ chainId: chain.id })}
              className={styles.chainButton}
            >
              {chain.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SwitchChain;