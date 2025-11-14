'use client'

import { useAppKit, useAppKitAccount } from '@reown/appkit/react';

export const ConnectButton = () => {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  const formatAddress = (addr: string | undefined) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleClick = () => {
    if (isConnected) {
      // Show account menu
      open({ view: 'Account' });
    } else {
      // Open connect modal
      open();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-5 py-2.5 bg-black text-white font-medium rounded-lg hover:bg-gray-900 transition-all duration-200 border border-black text-sm tracking-tight"
    >
      {isConnected && address ? formatAddress(address) : 'Login'}
    </button>
  );
};
