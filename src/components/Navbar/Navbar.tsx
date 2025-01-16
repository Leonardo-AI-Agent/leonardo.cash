import { Button } from '@nextui-org/react';
import { PageLogo } from '../PageLogo/PageLogo';
import { ConnectButton } from '@rainbow-me/rainbowkit';

import styles from './Navbar.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Balance } from '../Balance/Balance';

interface Props {
  isDApp: boolean;
}

export function Navbar({ isDApp }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbar}>
        <PageLogo />

        {isDApp ? (
          <div className={styles.right}>
            <Balance />
            <ConnectButton />
          </div>
        ) : (
          <Button
            isLoading={loading}
            onPressStart={() => {
              setLoading(true);
              router.push('/staking');
              setLoading(false);
            }}
            color="primary"
          >
            Launch App
          </Button>
        )}
      </div>
    </div>
  );
}