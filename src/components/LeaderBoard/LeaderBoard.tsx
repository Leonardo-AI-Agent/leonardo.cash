'use client';
import { ASSET_METADATA_DECIMALS, NODE_ENV } from '@/src/config';
import { ponderRequest } from '@/src/gql/client';
import { GetStakers } from '@/src/gql/documents/staking';
import React, { useCallback } from 'react';
import { useBlockNumber } from 'wagmi';
import { base, sepolia as Sepolia } from 'wagmi/chains';
import styles from './styles.module.css';

import { Staker } from '@/src/gql/types/graphql';
import { prettyAmount, truncateAddress } from '@/src/utils/format';
import { ethers } from 'ethers';
import { SecondCrown } from '../icons/SecondCrown';
import { ThirdCrown } from '../icons/ThirdCrown';
import { DefaultCrown } from '../icons/DefaultCrown';
import { Chip } from '@nextui-org/react';
import { FirstCrown } from '../icons/FirstCrown';

export const LeaderBoard = ({ n }: { n: number }) => {
  const blockNumber = useBlockNumber({ cacheTime: 1000 });

  const [topStakers, setTopStakers] = React.useState([]);
  const [processedBlockNumber, setProcessedBlockNumber] = React.useState(0n);

  const fetchTopStakers = useCallback(async () => {
    // Fetch top stakers
    if (blockNumber.data && processedBlockNumber < blockNumber.data) {
      const variables = {
        where: {
          chainId: NODE_ENV === 'production' ? base.id : Sepolia.id,
        },
        limit: n,
        orderBy: 'balance',
        orderDirection: 'desc',
      };
      const { stakers } = await ponderRequest(GetStakers, variables);
      setTopStakers(stakers.items);
      setProcessedBlockNumber(BigInt(blockNumber.data));
    }
  }, [n, blockNumber.data]);

  React.useEffect(() => {
    const interval = setInterval(fetchTopStakers, 1000);
    return () => clearInterval(interval);
  }, [fetchTopStakers]);

  const renderRankingIcon = (index: number) => {
    switch (index) {
      case 0:
        return (
          <div
            style={{
              filter:
                'drop-shadow(0px 0px 9.611px #90FFFC) drop-shadow(0px 0px 20.893px #90FFFC)',
            }}
          >
            <FirstCrown />
          </div>
        );
      case 1:
        return <SecondCrown />;
      case 2:
        return <ThirdCrown />;
      default:
        return <DefaultCrown />;
    }
  };

  const chipColors = {
    0: '#2E7D7B',
    1: '#636363',
    2: '#4A402F',
  } as Record<number, string>;

  const renderRanking = (index: number, address: string) => {
    return (
      <div className="flex items-center gap-2">
        <div>
          {renderRankingIcon(index)}
          <Chip
            style={{
              backgroundColor: chipColors[index] || '#421E7C',
              color: 'white',
              fontSize: '12px',
              padding: '2px 6px',
            }}
          >
            #{index + 1}
          </Chip>
        </div>
        <div
          style={{
            color: 'rgba(255, 255, 255, 0.45)',
          }}
        >
          {truncateAddress(address)}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div>Top {n} Stakers</div>
      <table>
        <thead>
          <tr>
            <th>RANK</th>
            <th>{'TOTAL STAKED ($LEONAI)'}</th>
          </tr>
        </thead>
        <tbody>
          {topStakers.map((staker: Staker, index: number) => (
            <tr key={staker.address}>
              <td>{renderRanking(index, staker.address)}</td>
              <td>
                {prettyAmount(
                  parseFloat(
                    ethers.formatUnits(
                      staker.balance.toString(),
                      parseInt(ASSET_METADATA_DECIMALS),
                    ),
                  ),
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
