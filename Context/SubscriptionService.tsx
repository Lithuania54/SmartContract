'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import Web3Modal from 'web3modal';
import { ethers, parseEther } from 'ethers';
import { SUBSCRIPTION_SERVICE_ABI, SUBSCRIPTION_SERVICE_ADDRESS } from './Constants';

interface SubscriptionServiceContextProps {
  currentAccount: string | null;
  connectWallet: () => Promise<void>;
  subscribe: (tier: 'Basic' | 'Premium') => Promise<void>;
  renewSubscription: () => Promise<void>;
  purchaseComic: (comicId: number, price: string) => Promise<void>;
  canAccessComic: (comicId: number) => Promise<boolean>;
  upgradeToPremium: () => Promise<void>;
  error: string | null;
}

const defaultValue: SubscriptionServiceContextProps = {
  currentAccount: null,
  connectWallet: async () => {
    console.log('Default connectWallet called');
  },
  subscribe: async () => {
    console.log('Default subscribe called');
  },
  renewSubscription: async () => {
    console.log('Default renewSubscription called');
  },
  purchaseComic: async () => {
    console.log('Default purchaseComic called');
  },
  canAccessComic: async () => false,
  upgradeToPremium: async () => {
    console.log('Default upgradeToPremium called');
  },
  error: null,
};


export const SubscriptionServiceContext = createContext<SubscriptionServiceContextProps>(defaultValue);

interface ProviderProps {
  children: ReactNode;
}

export const SubscriptionServiceProvider = ({ children }: ProviderProps) => {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchContract = (signerOrProvider: ethers.JsonRpcSigner | ethers.BrowserProvider): ethers.Contract => {
    return new ethers.Contract(SUBSCRIPTION_SERVICE_ADDRESS, SUBSCRIPTION_SERVICE_ABI, signerOrProvider);
  };  

  const connectWallet = async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      setError('Ethereum wallet not detected. Please install MetaMask.');
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);
      setError(null);
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError('Failed to connect wallet. Please try again.');
    }
  };

  const subscribe = async (tier: 'Basic' | 'Premium') => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(connection);
      const signer = await provider.getSigner();
      const contract = fetchContract(signer);
  
      const fee = tier === 'Basic' ? parseEther('0.00001') : parseEther('0.00005');
      const tx = await contract.subscribe(tier === 'Basic' ? 0 : 1, { value: fee });
      await tx.wait();
      console.log('Subscription successful:', tx);
    } catch (err) {
      console.error('Subscription error:', err);
      setError('Subscription failed. Please try again.');
    }
  };
  
  const renewSubscription = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(connection);
      const signer = await provider.getSigner();
      const contract = fetchContract(signer);
  
      const tx = await contract.renewSubscription({ value: parseEther('0.00001') });
      await tx.wait();
      console.log('Renewal successful:', tx);
    } catch (err) {
      console.error('Renewal error:', err);
      setError('Renewal failed. Please try again.');
    }
  };
  
  const purchaseComic = async (comicId: number, price: string) => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(connection);
      const signer = await provider.getSigner();
      const contract = fetchContract(signer);

      const tx = await contract.purchaseComic(comicId, { value: parseEther(price) });
      await tx.wait();
      console.log(`Comic ${comicId} purchased successfully:`, tx);
    } catch (err) {
      console.error('Purchase error:', err);
      setError('Purchase failed. Please try again.');
    }
  };

  const canAccessComic = async (comicId: number): Promise<boolean> => {
    if (!currentAccount) {
      setError('Wallet not connected. Please connect your wallet.');
      return false;
    }
  
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(connection);
      const signer = await provider.getSigner();
      const contract = fetchContract(signer);
  
      const result = await contract.canAccessComic(currentAccount, comicId);
      console.log('Access result:', result);
      return result; // Contract logic handles all access checks
    } catch (err) {
      console.error('Error checking access:', err);
      setError('Could not verify access. Please try again.');
      return false;
    }
  };

  const upgradeToPremium = async () => {
    if (!currentAccount) {
      setError('Wallet not connected. Please connect your wallet.');
      return;
    }
  
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(connection);
      const signer = await provider.getSigner();
      const contract = fetchContract(signer);
  
      const upgradeFee = parseEther('0.00004'); // Difference between Premium and Basic fees
      const tx = await contract.upgradeToPremium({ value: upgradeFee });
      await tx.wait();
  
      console.log('Upgrade to Premium successful:', tx);
      alert('Upgraded to Premium plan successfully!');
    } catch (err) {
      console.error('Upgrade error:', err);
      setError('Upgrade to Premium failed. Please try again.');
    }
  };
  
  

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setCurrentAccount(accounts[0]);
          }
        } catch (err) {
          console.error('Error checking wallet connection:', err);
        }
      }
    };

    checkWalletConnection();
  }, []);

  return (
    <SubscriptionServiceContext.Provider
  value={{
    currentAccount,
    connectWallet,
    subscribe,
    renewSubscription,
    purchaseComic,
    canAccessComic,
    upgradeToPremium,
    error,
  }}
>
  {children}
</SubscriptionServiceContext.Provider>

  );
};
