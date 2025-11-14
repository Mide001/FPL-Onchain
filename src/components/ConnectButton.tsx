'use client'

import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { useDisconnect } from 'wagmi';

export const ConnectButton = () => {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { disconnect } = useDisconnect();

  const formatAddress = (addr: string | undefined) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleClick = () => {
    if (isConnected) {
      // Show account menu or disconnect
      open({ view: 'Account' });
    } else {
      // Open connect modal
      open();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
    >
      {isConnected && address ? formatAddress(address) : 'Login'}
    </button>
  );
};
