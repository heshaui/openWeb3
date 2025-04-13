import { useAccount, useBalance } from 'wagmi';
import styles from '../styles/Wallet.module.css';

const Wallet = () => {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  if (!isConnected) {
    return (
      <div className={styles.container}>
        <div className={styles.notConnected}>
          请先连接钱包
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.walletInfo}>
        <div className={styles.infoCard}>
          <div className={styles.cardIcon}>👛</div>
          <h3>钱包地址</h3>
          <p>{address}</p>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.cardIcon}>💰</div>
          <h3>余额</h3>
          <p>{balance?.formatted} {balance?.symbol}</p>
        </div>
      </div>
    </div>
  );
};

export default Wallet;