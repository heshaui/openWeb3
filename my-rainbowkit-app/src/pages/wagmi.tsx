import type { NextPage } from 'next';
import ReadContract from '../components/ReadContract';
import MultiReadContract from '../components/MultiReadContract';
import Signer from '../components/Signer';

const Wagmi: NextPage = () => {
    return (
        <div>
            <ReadContract />
            <MultiReadContract />
            <Signer />
        </div>
    )
}

export default Wagmi;