import type { NextPage } from 'next';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from '../styles/PageHeader.module.css';
import Link from 'next/link';

const PageHeader: NextPage = () => {
    return (
        <div className={styles.pageHeader}>
            <h3>Dapp Demo</h3>
            <div className={styles.nav}>
                <Link href="/">
                    <span className={styles.navItem}>Home</span>
                </Link>
                <Link href="/wagmi">
                    <span className={styles.navItem}>Wagmi</span>
                </Link>
                <Link href="/ethers">
                    <span className={styles.navItem}>Ethers</span>
                </Link>
            </div>
            <ConnectButton showBalance={true}/>
        </div>
    )
}

export default PageHeader;