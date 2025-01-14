'use client';
import { ASSET_METADATA_DECIMALS } from '@/src/config';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { ethers } from 'ethers';
import React, { useCallback, useEffect } from 'react';
import styles from './styles.module.css';
import { extractHours } from '@/src/utils/format';

interface Props {
  stakingBalance: bigint;
  isOpen: boolean;
  coolDownTime: bigint;
  onOpenChange: (isOpen: boolean) => void;
  withdrawFn: (amount: bigint) => Promise<void>;
  withdrawAllFn: () => Promise<void>;
}

const percentages = [25, 50, 75, 100];

export const RedeemModal = ({
  stakingBalance,
  isOpen,
  coolDownTime,
  onOpenChange,
  withdrawFn,
  withdrawAllFn,
}: Props) => {
  const [amount, setAmount] = React.useState('');

  const handleSetAmount = useCallback(
    (value: string) => {
      try {
        const innerValue = value.replace(/,/g, '.'); // 3.1415
        if (innerValue === '') {
          setAmount('');
          return;
        }
        const parsedValue = ethers.parseUnits(
          innerValue,
          parseInt(ASSET_METADATA_DECIMALS),
        );
        if (parsedValue <= stakingBalance) {
          setAmount(innerValue);
        } else {
          setAmount(
            ethers.formatUnits(
              stakingBalance,
              parseInt(ASSET_METADATA_DECIMALS),
            ),
          );
        }
      } catch (error) {
        console.warn(error);
      }
    },
    [stakingBalance],
  );

  const setPercentage = useCallback(
    (percentage: bigint) => {
      const parsedValue = (stakingBalance * percentage) / 100n;
      setAmount(
        ethers.formatUnits(parsedValue, parseInt(ASSET_METADATA_DECIMALS)),
      );
    },
    [stakingBalance],
  );

  const handleRedeem = useCallback(
    (onClose: () => void) => async () => {
      const bnAmount = ethers.parseUnits(
        amount,
        parseInt(ASSET_METADATA_DECIMALS),
      );
      if (bnAmount === stakingBalance) {
        withdrawAllFn();
      } else {
        withdrawFn(bnAmount);
      }
      onClose();
    },
    [amount],
  );

  useEffect(() => {
    if (isOpen) {
      setAmount('');
    }
  }, [isOpen]);

  const isInvalid = false;

  const canUnstake =
    amount !== '' &&
    ethers.parseUnits(amount, parseInt(ASSET_METADATA_DECIMALS)) > 0n;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="modal"
      size="xl"
    >
      <ModalContent>
        {(onClose) => (
          <div className={styles.layout}>
            <div className={styles.title}>Unstake</div>

            <div className={styles.subtitle}>
              {`After you unstake you won’t able to withdraw until after the cooldown period. However, any token you unstake no longer counts towards earning rewards.`}
            </div>

            <div className={styles.bottom}>
              <div className={styles.amount}>
                <div className={styles.label}>Amount to Unstake</div>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => handleSetAmount(e.target.value)}
                  className={styles.input}
                  height={48}
                />

                <div className={styles.buttons}>
                  {percentages.map((percentage) => (
                    <Button
                      fullWidth
                      size="sm"
                      key={percentage}
                      color="primary"
                      variant={
                        amount ===
                        ethers.formatUnits(
                          (stakingBalance * BigInt(percentage)) / 100n,
                          parseInt(ASSET_METADATA_DECIMALS),
                        )
                          ? undefined
                          : 'light'
                      }
                      onPress={() => setPercentage(BigInt(percentage))}
                    >
                      {percentage}%
                    </Button>
                  ))}
                </div>
              </div>

              <div className={styles.amount}>
                <div className={styles.label}>Cooldown period</div>

                <input
                  type="text"
                  value={`${extractHours(parseInt(coolDownTime.toString()))} hours`}
                  className={styles.input}
                  height={48}
                  style={{
                    cursor: 'normal',

                    color: 'var(--text-color-muted)',
                  }}
                  disabled
                />
              </div>
            </div>
            <Button
              fullWidth
              disabled={!canUnstake}
              color={canUnstake ? 'primary' : 'default'}
              onPress={canUnstake ? handleRedeem(onClose) : undefined}
              style={{
                height: '48px',
              }}
            >
              Unstake
            </Button>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};
