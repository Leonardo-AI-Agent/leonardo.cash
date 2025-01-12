'use client';
import React from 'react';
import Providers from './providers';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="layout">
        <header>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src={'/logo.webp'}
              alt="Logo LeonardoAI"
              width={80}
              height={80}
            />
            <span
              style={{
                color: '#FFFFFF',
                fontFamily: 'Bebas Neue',
                fontSize: '41.329px',
                fontStyle: 'italic',
                fontWeight: '700',
                lineHeight: '42.939px',
                letterSpacing: '-0.072px',
                textTransform: 'uppercase',
              }}
            >
              LEONARDO
            </span>
            <span
              style={{
                color: '#803BF1',
                fontFamily: 'Bebas Neue',
                fontSize: '41.329px',
                fontStyle: 'italic',
                fontWeight: '700',
                lineHeight: '42.939px',
                letterSpacing: '-0.072px',
                textTransform: 'uppercase',
              }}
            >
              AI
            </span>
          </div>

          <ConnectButton />
        </header>
        {children}
        <footer>{/* <Blocknumber /> */}</footer>
      </div>
    </Providers>
  );
}