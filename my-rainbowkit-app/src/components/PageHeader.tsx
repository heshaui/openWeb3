import type { NextPage } from 'next';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from '../styles/PageHeader.module.css';
const PageHeader: NextPage = () => {
    return (
        <div className={styles.pageHeader}>
            <h3>我的钱包</h3>
            <ConnectButton showBalance={true}/>
        </div>
    )
}

export default PageHeader;